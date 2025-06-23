/**
 * TechStack Scan Regression Tests
 * 
 * Ensures that the refactored techStackScan with shared browser produces
 * expected behavior with Puppeteer enabled/disabled.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { runTechStackScan } from '../modules/techStackScan.js';

// Mock external dependencies
vi.mock('../core/artifactStore.js', () => ({
  insertArtifact: vi.fn().mockResolvedValue(123),
  insertFinding: vi.fn().mockResolvedValue(456),
  pool: {
    query: vi.fn()
  }
}));

vi.mock('../core/logger.js', () => ({
  log: vi.fn()
}));

// Mock dynamic browser
vi.mock('../util/dynamicBrowser.js', () => ({
  withPage: vi.fn()
}));

// Mock child_process for exec calls
vi.mock('node:child_process', () => ({
  execFile: vi.fn()
}));

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('TechStack Scan Regression Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset environment variables
    delete process.env.ENABLE_PUPPETEER;
  });

  describe('Third-party Discovery Integration', () => {
    it('should handle Puppeteer enabled scenario', async () => {
      process.env.ENABLE_PUPPETEER = '1';
      
      const { withPage } = await import('../util/dynamicBrowser.js');
      const { insertArtifact } = await import('../core/artifactStore.js');
      
      // Mock withPage to simulate third-party discovery
      vi.mocked(withPage).mockImplementation(async (fn) => {
        const mockPage = {
          setRequestInterception: vi.fn(),
          on: vi.fn(),
          goto: vi.fn().mockResolvedValue({ status: () => 200 })
        };
        return fn(mockPage as any);
      });

      // Mock Wappalyzer execution
      const { execFile } = await import('node:child_process');
      vi.mocked(execFile).mockImplementation((cmd, args, options, callback) => {
        if (typeof options === 'function') {
          callback = options;
        }
        
        if (cmd === 'wappalyzer') {
          const mockResult = {
            technologies: [
              {
                name: 'React',
                version: '18.0.0',
                categories: [{ id: 12, name: 'JavaScript frameworks' }]
              }
            ],
            urls: {}
          };
          (callback as any)(null, { stdout: JSON.stringify(mockResult), stderr: '' });
        } else {
          (callback as any)(null, { stdout: '', stderr: '' });
        }
        return {} as any;
      });

      const result = await runTechStackScan({
        domain: 'example.com',
        scanId: 'test-scan-123'
      });

      expect(result).toBeGreaterThanOrEqual(0);
      expect(withPage).toHaveBeenCalled();
      expect(insertArtifact).toHaveBeenCalled();
    });

    it('should handle Puppeteer disabled scenario', async () => {
      process.env.ENABLE_PUPPETEER = '0';
      
      const { withPage } = await import('../util/dynamicBrowser.js');
      const { insertArtifact } = await import('../core/artifactStore.js');
      
      // Mock Wappalyzer execution
      const { execFile } = await import('node:child_process');
      vi.mocked(execFile).mockImplementation((cmd, args, options, callback) => {
        if (typeof options === 'function') {
          callback = options;
        }
        
        if (cmd === 'wappalyzer') {
          const mockResult = {
            technologies: [
              {
                name: 'Nginx',
                version: '1.20.0',
                categories: [{ id: 22, name: 'Web servers' }]
              }
            ],
            urls: {}
          };
          (callback as any)(null, { stdout: JSON.stringify(mockResult), stderr: '' });
        } else {
          (callback as any)(null, { stdout: '', stderr: '' });
        }
        return {} as any;
      });

      const result = await runTechStackScan({
        domain: 'example.com',
        scanId: 'test-scan-456'
      });

      expect(result).toBeGreaterThanOrEqual(0);
      expect(withPage).not.toHaveBeenCalled();
      expect(insertArtifact).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle browser errors gracefully', async () => {
      process.env.ENABLE_PUPPETEER = '1';
      
      const { withPage } = await import('../util/dynamicBrowser.js');
      const { insertArtifact } = await import('../core/artifactStore.js');
      
      // Mock withPage to throw an error
      vi.mocked(withPage).mockRejectedValue(new Error('Browser crashed'));

      // Mock Wappalyzer execution
      const { execFile } = await import('node:child_process');
      vi.mocked(execFile).mockImplementation((cmd, args, options, callback) => {
        if (typeof options === 'function') {
          callback = options;
        }
        
        if (cmd === 'wappalyzer') {
          const mockResult = { technologies: [], urls: {} };
          (callback as any)(null, { stdout: JSON.stringify(mockResult), stderr: '' });
        } else {
          (callback as any)(null, { stdout: '', stderr: '' });
        }
        return {} as any;
      });

      const result = await runTechStackScan({
        domain: 'error-test.com',
        scanId: 'error-test'
      });

      // Should still complete successfully
      expect(result).toBeGreaterThanOrEqual(0);
      expect(insertArtifact).toHaveBeenCalled();
    });
  });

  describe('Basic Integration', () => {
    it('should complete scan successfully with minimal setup', async () => {
      const { insertArtifact } = await import('../core/artifactStore.js');
      const { execFile } = await import('node:child_process');
      
      // Mock Wappalyzer with basic response
      vi.mocked(execFile).mockImplementation((cmd, args, options, callback) => {
        if (typeof options === 'function') {
          callback = options;
        }
        
        if (cmd === 'wappalyzer') {
          const mockResult = { technologies: [], urls: {} };
          (callback as any)(null, { stdout: JSON.stringify(mockResult), stderr: '' });
        } else {
          (callback as any)(null, { stdout: '', stderr: '' });
        }
        return {} as any;
      });

      const result = await runTechStackScan({
        domain: 'basic-test.com',
        scanId: 'basic-test'
      });

      expect(result).toBeGreaterThanOrEqual(0);
      expect(insertArtifact).toHaveBeenCalled();
    });
  });
});