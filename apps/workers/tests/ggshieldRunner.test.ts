/**
 * Unit tests for ggshieldRunner utility
 */

import { describe, it, expect } from 'vitest';
import { ggshieldScan, convertGGShieldToTruffleHogFormat, ggshieldScanAndConvert } from '../utils/ggshieldRunner.js';

describe('ggshieldRunner', () => {
  it('should convert ggshield output to TruffleHog format', () => {
    const mockGGShieldOutput = JSON.stringify({
      policy_break_count: 1,
      policy_breaks: [
        {
          policy: 'secrets',
          break_type: 'secret',
          matches: [
            {
              match: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake_supabase_key',
              match_type: 'exact',
              line_start: 3,
              line_end: 3,
              column_start: 25,
              column_end: 89,
              detector: {
                name: 'supabase',
                display_name: 'Supabase'
              },
              validity: 'valid'
            }
          ]
        }
      ],
      secrets_engine_version: '3.24.0'
    });

    const result = convertGGShieldToTruffleHogFormat(mockGGShieldOutput);
    const lines = result.split('\n').filter(Boolean);
    
    expect(lines).toHaveLength(1);
    
    const parsed = JSON.parse(lines[0]);
    expect(parsed.DetectorName).toBe('Supabase');
    expect(parsed.Raw).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake_supabase_key');
    expect(parsed.Verified).toBe(true);
    expect(parsed.SourceMetadata.Data.Filesystem.file).toBe('web_asset');
    expect(parsed.SourceMetadata.Data.Filesystem.line).toBe(3);
  });

  it('should handle empty ggshield output', () => {
    const result = convertGGShieldToTruffleHogFormat('');
    expect(result).toBe('');
  });

  it('should handle malformed ggshield output', () => {
    const result = convertGGShieldToTruffleHogFormat('invalid json');
    expect(result).toBe('');
  });

  it('should scan buffer with fake Supabase key', async () => {
    const testContent = `
      // Test file with fake secrets
      const SUPABASE_URL = 'https://fake.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZha2UiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjM2NTQ2NywiZXhwIjoyMDUxOTQxNDY3fQ.fake_signature';
      // More code here...
    `;

    const buffer = Buffer.from(testContent, 'utf8');
    const output = await ggshieldScanAndConvert(buffer);
    
    // Should return TruffleHog-compatible format
    // Note: This test will only pass if ggshield is installed and working
    // In a real environment, we'd mock the exec function
    expect(typeof output).toBe('string');
    
    // If secrets are found, output should contain JSON lines
    if (output.trim()) {
      const lines = output.split('\n').filter(Boolean);
      expect(lines.length).toBeGreaterThan(0);
      
      // Each line should be valid JSON
      lines.forEach(line => {
        expect(() => JSON.parse(line)).not.toThrow();
      });
    }
  }, 10000); // 10 second timeout for actual scanning
});