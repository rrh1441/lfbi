/**
 * Captcha Solver Tests
 * 
 * Tests for the 2captcha integration utility.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

// Mock logger
vi.mock('../core/logger.js', () => ({
  log: vi.fn()
}));

describe('Captcha Solver', () => {
  let originalEnv: Record<string, string | undefined>;

  beforeEach(() => {
    // Store original environment
    originalEnv = { ...process.env };
    
    vi.clearAllMocks();
    
    // Reset environment variables
    delete process.env.CAPTCHA_API_KEY;
    
    // Clear module cache to get fresh instances
    vi.resetModules();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    vi.resetModules();
  });

  describe('Configuration', () => {
    it('should be disabled when no API key is provided', async () => {
      const { isCaptchaSolverEnabled } = await import('../util/captchaSolver.js');
      expect(isCaptchaSolverEnabled()).toBe(false);
    });

    it('should be enabled when API key is provided', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const { isCaptchaSolverEnabled } = await import('../util/captchaSolver.js');
      expect(isCaptchaSolverEnabled()).toBe(true);
    });
  });

  describe('Balance Check', () => {
    it('should throw error when not configured', async () => {
      const { getCaptchaBalance } = await import('../util/captchaSolver.js');
      
      await expect(getCaptchaBalance()).rejects.toThrow('Captcha solver not configured');
    });

    it('should return balance when API key is set', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.get).mockResolvedValue({
        data: '10.50'
      });

      const { getCaptchaBalance } = await import('../util/captchaSolver.js');
      const balance = await getCaptchaBalance();
      expect(balance).toBe(10.50);
    });

    it('should handle API errors', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'ERROR_WRONG_USER_KEY'
      });

      const { getCaptchaBalance } = await import('../util/captchaSolver.js');
      await expect(getCaptchaBalance()).rejects.toThrow('2captcha API error: ERROR_WRONG_USER_KEY');
    });
  });

  describe('reCAPTCHA V2 Solving', () => {
    it('should return error when not configured', async () => {
      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('test-sitekey', 'https://example.com');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Captcha solver not configured');
    });

    it('should successfully solve reCAPTCHA', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      
      // Mock successful submission
      vi.mocked(axios.default.post).mockResolvedValue({
        data: 'OK|123456789'
      });
      
      // Mock successful result polling
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'OK|03AHJ_VueSample_Token_String'
      });

      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('6Le-wvkSVVABCPBMRTvw0Q4Muexq1bi0DJwx_mJ-', 'https://example.com');
      
      expect(result.success).toBe(true);
      expect(result.token).toBe('03AHJ_VueSample_Token_String');
      expect(result.taskId).toBe('123456789');
      expect(result.solveTime).toBeGreaterThan(0);
    });

    it('should handle submission errors', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.post).mockResolvedValue({
        data: 'ERROR_WRONG_GOOGLEKEY'
      });

      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('invalid-sitekey', 'https://example.com');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('2captcha submission error: ERROR_WRONG_GOOGLEKEY');
    });

    it('should handle polling timeout', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      
      // Mock successful submission
      vi.mocked(axios.default.post).mockResolvedValue({
        data: 'OK|123456789'
      });
      
      // Mock always not ready
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'CAPCHA_NOT_READY'
      });

      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('test-sitekey', 'https://example.com');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Maximum polling attempts exceeded');
    }, 10000); // 10 second timeout instead of default 30
  });

  describe('Image Captcha Solving', () => {
    it('should return error when not configured', async () => {
      const { solveImageCaptcha } = await import('../util/captchaSolver.js');
      const result = await solveImageCaptcha('base64-image-data');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Captcha solver not configured');
    });

    it('should require image data', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const { solveImageCaptcha } = await import('../util/captchaSolver.js');
      const result = await solveImageCaptcha('');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Either imageBase64 or imageUrl must be provided');
    });

    it('should successfully solve image captcha', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      
      // Mock successful submission
      vi.mocked(axios.default.post).mockResolvedValue({
        data: 'OK|987654321'
      });
      
      // Mock successful result polling
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'OK|HELLO'
      });

      const { solveImageCaptcha } = await import('../util/captchaSolver.js');
      const result = await solveImageCaptcha('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
      
      expect(result.success).toBe(true);
      expect(result.token).toBe('HELLO');
      expect(result.taskId).toBe('987654321');
    });
  });

  describe('Helper Methods', () => {
    it('should handle report good correctly', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'OK_REPORT_RECORDED'
      });

      const { captchaSolver } = await import('../util/captchaSolver.js');
      const result = await captchaSolver.reportGood('123456789');
      expect(result).toBe(true);
    });

    it('should handle report bad correctly', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.get).mockResolvedValue({
        data: 'OK_REPORT_RECORDED'
      });

      const { captchaSolver } = await import('../util/captchaSolver.js');
      const result = await captchaSolver.reportBad('123456789');
      expect(result).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle network errors gracefully', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.post).mockRejectedValue(new Error('Network error'));

      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('test-sitekey', 'https://example.com');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Network error');
    });

    it('should handle invalid responses', async () => {
      process.env.CAPTCHA_API_KEY = 'test-api-key';
      
      const axios = await import('axios');
      vi.mocked(axios.default.post).mockResolvedValue({
        data: 'INVALID_RESPONSE'
      });

      const { solveRecaptcha } = await import('../util/captchaSolver.js');
      const result = await solveRecaptcha('test-sitekey', 'https://example.com');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unexpected response');
    });
  });
});