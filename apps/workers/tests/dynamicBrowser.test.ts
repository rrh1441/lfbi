/**
 * Dynamic Browser Unit Tests
 * 
 * Tests for the shared Puppeteer browser system including basic functionality.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getBrowserMemoryStats } from '../util/dynamicBrowser.js';

// Mock puppeteer
vi.mock('puppeteer', () => ({
  default: {
    launch: vi.fn()
  }
}));

// Mock os.cpus()
vi.mock('node:os', () => ({
  cpus: vi.fn().mockReturnValue([{}, {}, {}, {}]) // 4 CPUs
}));

// Mock logger
vi.mock('../core/logger.js', () => ({
  log: vi.fn()
}));

describe('Dynamic Browser System', () => {
  beforeEach(() => {
    // Reset environment variables
    delete process.env.PUPPETEER_MAX_PAGES;
    delete process.env.ENABLE_PUPPETEER;
    delete process.env.DEBUG_PUPPETEER;
    
    // Clear mocks
    vi.clearAllMocks();
  });

  describe('Environment Configuration', () => {
    it('should throw error when Puppeteer is disabled', async () => {
      process.env.ENABLE_PUPPETEER = '0';
      
      const { getBrowser, withPage } = await import('../util/dynamicBrowser.js');
      
      await expect(getBrowser()).rejects.toThrow('Puppeteer disabled');
      await expect(withPage(async () => 'test')).rejects.toThrow('Puppeteer disabled');
    });

    it('should respect PUPPETEER_MAX_PAGES environment variable', async () => {
      process.env.PUPPETEER_MAX_PAGES = '0';
      
      const { getBrowser } = await import('../util/dynamicBrowser.js');
      
      // Invalid values should be handled gracefully
      await expect(getBrowser()).rejects.toThrow('PUPPETEER_MAX_PAGES must be >= 1');
    });
  });

  describe('Memory Monitoring', () => {
    it('should provide browser memory statistics', () => {
      const stats = getBrowserMemoryStats();
      
      expect(stats).toHaveProperty('rss');
      expect(stats).toHaveProperty('heapUsed');
      expect(stats).toHaveProperty('activePagesCount');
      expect(stats).toHaveProperty('browserConnected');
      
      expect(typeof stats.rss).toBe('number');
      expect(typeof stats.heapUsed).toBe('number');
      expect(typeof stats.activePagesCount).toBe('number');
      expect(typeof stats.browserConnected).toBe('boolean');
    });
  });

  describe('Basic Module Loading', () => {
    it('should load browser module successfully', async () => {
      const { getBrowser, withPage, getBrowserMemoryStats } = await import('../util/dynamicBrowser.js');
      
      expect(getBrowser).toBeDefined();
      expect(withPage).toBeDefined();
      expect(getBrowserMemoryStats).toBeDefined();
    });
  });
});