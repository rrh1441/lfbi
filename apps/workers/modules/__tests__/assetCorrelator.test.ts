/*
 * =============================================================================
 * TEST: assetCorrelator.test.ts
 * =============================================================================
 * Unit tests for the asset correlation module
 * =============================================================================
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { runAssetCorrelator } from '../assetCorrelator';
import { pool, insertArtifact } from '../../core/artifactStore';

// Mock dependencies
jest.mock('../../core/artifactStore');
jest.mock('../../core/logger');
jest.mock('node:dns/promises');

// Mock DNS module
const mockDns = {
  lookup: jest.fn()
};
jest.mock('node:dns/promises', () => mockDns);

describe('assetCorrelator', () => {
  const mockScanId = 'test-scan-123';
  const mockDomain = 'example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Correlation Logic', () => {
    it('should correlate artifacts by IP address', async () => {
      // Mock artifacts with same IP
      const mockArtifacts = [
        {
          id: 1,
          type: 'shodan_service',
          val_text: 'nginx/1.21.0',
          severity: 'INFO',
          ip: '192.168.1.1',
          port: '443',
          product: 'nginx',
          meta: { scan_id: mockScanId }
        },
        {
          id: 2,
          type: 'vuln',
          val_text: 'CVE-2021-41773 - Apache Path Traversal',
          severity: 'HIGH',
          ip: '192.168.1.1',
          port: '443',
          cve: 'CVE-2021-41773',
          cvss: '9.8',
          meta: { scan_id: mockScanId }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);
      (insertArtifact as jest.Mock).mockResolvedValue({ id: 100 });

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      // Verify correlation artifact was created
      expect(insertArtifact).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'correlated_asset_summary',
          severity: 'HIGH', // Due to HIGH vuln
          meta: expect.objectContaining({
            scan_id: mockScanId,
            scan_module: 'assetCorrelator',
            correlation_summary: expect.objectContaining({
              total_assets: 1,
              critical_assets: 0,
              assets: expect.arrayContaining([
                expect.objectContaining({
                  ip: '192.168.1.1',
                  port: 443,
                  severity: 'HIGH',
                  findings: expect.arrayContaining([
                    expect.objectContaining({
                      type: 'shodan_service',
                      artifact_id: 1
                    }),
                    expect.objectContaining({
                      type: 'vuln',
                      artifact_id: 2,
                      id: 'CVE-2021-41773',
                      cvss: 9.8
                    })
                  ])
                })
              ])
            })
          })
        })
      );
    });

    it('should separate services by port', async () => {
      // Mock artifacts with same IP but different ports
      const mockArtifacts = [
        {
          id: 1,
          type: 'shodan_service',
          val_text: 'HTTP service',
          severity: 'INFO',
          ip: '192.168.1.1',
          port: '80',
          meta: { scan_id: mockScanId }
        },
        {
          id: 2,
          type: 'shodan_service',
          val_text: 'MySQL service',
          severity: 'MEDIUM',
          ip: '192.168.1.1',
          port: '3306',
          meta: { scan_id: mockScanId }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);
      (insertArtifact as jest.Mock).mockResolvedValue({ id: 100 });

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      // Verify two separate assets were created
      const correlationCall = (insertArtifact as jest.Mock).mock.calls[0][0];
      expect(correlationCall.meta.correlation_summary.total_assets).toBe(2);
      expect(correlationCall.meta.correlation_summary.assets).toHaveLength(2);
    });

    it('should handle non-correlatable artifacts gracefully', async () => {
      // Mock artifacts without IPs
      const mockArtifacts = [
        {
          id: 1,
          type: 'spf_dmarc',
          val_text: 'SPF record missing',
          severity: 'MEDIUM',
          meta: { scan_id: mockScanId, domain: 'example.com' }
        },
        {
          id: 2,
          type: 'breach_data',
          val_text: 'Email found in breach',
          severity: 'HIGH',
          meta: { scan_id: mockScanId, email: 'test@example.com' }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      // Should not create correlation artifact for non-correlatable data
      expect(insertArtifact).not.toHaveBeenCalled();
    });
  });

  describe('DNS Resolution', () => {
    it('should batch resolve hostnames', async () => {
      const mockArtifacts = [
        {
          id: 1,
          type: 'hostname',
          val_text: 'www.example.com',
          severity: 'INFO',
          meta: { scan_id: mockScanId }
        },
        {
          id: 2,
          type: 'hostname',
          val_text: 'api.example.com',
          severity: 'INFO',
          meta: { scan_id: mockScanId }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);
      (insertArtifact as jest.Mock).mockResolvedValue({ id: 100 });

      // Mock DNS responses
      mockDns.lookup.mockImplementation((hostname) => {
        if (hostname === 'www.example.com') {
          return Promise.resolve([{ address: '192.168.1.1', family: 4 }]);
        } else if (hostname === 'api.example.com') {
          return Promise.resolve([{ address: '192.168.1.2', family: 4 }]);
        }
        return Promise.reject(new Error('Not found'));
      });

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      // Verify DNS was called for both hostnames
      expect(mockDns.lookup).toHaveBeenCalledWith('www.example.com', { all: true });
      expect(mockDns.lookup).toHaveBeenCalledWith('api.example.com', { all: true });

      // Verify assets were created with resolved IPs
      const correlationCall = (insertArtifact as jest.Mock).mock.calls[0][0];
      expect(correlationCall.meta.correlation_summary.total_assets).toBe(2);
    });

    it('should handle DNS timeouts gracefully', async () => {
      const mockArtifacts = [
        {
          id: 1,
          type: 'hostname',
          val_text: 'timeout.example.com',
          severity: 'INFO',
          meta: { scan_id: mockScanId }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);

      // Mock DNS timeout
      mockDns.lookup.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('DNS timeout')), 5000)
        )
      );

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      // Should complete without error
      expect(insertArtifact).not.toHaveBeenCalled(); // No correlatable data
    });
  });

  describe('Performance Guardrails', () => {
    it('should respect overall timeout', async () => {
      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            // Simulate slow processing
            setTimeout(() => {}, 40000);
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);

      // Should timeout and create error artifact
      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      expect(insertArtifact).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'scan_error',
          val_text: expect.stringContaining('timeout'),
          meta: expect.objectContaining({
            truncated: true
          })
        })
      );
    }, 35000); // Test timeout > module timeout
  });

  describe('Finding Deduplication', () => {
    it('should deduplicate findings by type and description', async () => {
      const mockArtifacts = [
        {
          id: 1,
          type: 'vuln',
          val_text: 'SQL Injection in login form',
          severity: 'HIGH',
          ip: '192.168.1.1',
          meta: { scan_id: mockScanId }
        },
        {
          id: 2,
          type: 'vuln',
          val_text: 'SQL Injection in login form', // Duplicate
          severity: 'HIGH',
          ip: '192.168.1.1',
          meta: { scan_id: mockScanId }
        }
      ];

      const mockStream = {
        on: jest.fn((event, handler) => {
          if (event === 'data') {
            mockArtifacts.forEach(handler);
          } else if (event === 'end') {
            handler();
          }
        })
      };

      (pool.query as jest.Mock).mockReturnValue(mockStream);
      (insertArtifact as jest.Mock).mockResolvedValue({ id: 100 });

      await runAssetCorrelator({ scanId: mockScanId, domain: mockDomain });

      const correlationCall = (insertArtifact as jest.Mock).mock.calls[0][0];
      const asset = correlationCall.meta.correlation_summary.assets[0];
      
      // Should only have one finding, not two
      expect(asset.findings).toHaveLength(1);
      expect(asset.findings[0].artifact_id).toBe(1); // First one wins
    });
  });
});