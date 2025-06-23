/**
 * Dynamic Browser E2E Tests
 * 
 * Real Chromium integration tests - only run when PUPPETEER_E2E=1
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { withPage, getBrowser, getBrowserMemoryStats } from '../util/dynamicBrowser.js';

// Skip E2E tests unless explicitly enabled
const isE2EEnabled = process.env.PUPPETEER_E2E === '1';

describe.skipIf(!isE2EEnabled)('Dynamic Browser E2E Tests', () => {
  beforeAll(() => {
    // Ensure Puppeteer is enabled for E2E tests
    process.env.ENABLE_PUPPETEER = '1';
  });

  afterAll(async () => {
    // Clean up browser instance
    try {
      const browser = await getBrowser();
      await browser.close();
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should launch real browser and navigate to page', async () => {
    const result = await withPage(async (page) => {
      await page.goto('data:text/html,<html><head><title>Test Page</title></head><body><h1>Hello World</h1></body></html>');
      const title = await page.title();
      const content = await page.$eval('h1', el => el.textContent);
      
      return { title, content };
    });

    expect(result.title).toBe('Test Page');
    expect(result.content).toBe('Hello World');
  }, 30000);

  it('should handle multiple concurrent pages', async () => {
    const promises = Array.from({ length: 3 }, (_, i) =>
      withPage(async (page) => {
        await page.goto(`data:text/html,<html><head><title>Page ${i}</title></head><body><p>Content ${i}</p></body></html>`);
        const title = await page.title();
        return { index: i, title };
      })
    );

    const results = await Promise.all(promises);
    
    expect(results).toHaveLength(3);
    results.forEach((result, index) => {
      expect(result.index).toBe(index);
      expect(result.title).toBe(`Page ${index}`);
    });
  }, 45000);

  it('should provide accurate memory statistics', async () => {
    const initialStats = getBrowserMemoryStats();
    
    await withPage(async (page) => {
      await page.goto('data:text/html,<html><body>Test</body></html>');
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    const finalStats = getBrowserMemoryStats();
    
    expect(initialStats.rss).toBeGreaterThan(0);
    expect(initialStats.heapUsed).toBeGreaterThan(0);
    expect(finalStats.activePagesCount).toBe(0); // Should be cleaned up
  }, 20000);

  it('should handle page errors gracefully', async () => {
    await expect(
      withPage(async (page) => {
        // Try to navigate to invalid URL
        await page.goto('http://invalid-domain-that-does-not-exist.local');
      })
    ).rejects.toThrow();
  }, 20000);

  it('should execute JavaScript in page context', async () => {
    const result = await withPage(async (page) => {
      await page.goto('data:text/html,<html><body><div id="test">Initial</div></body></html>');
      
      // Execute JavaScript in page context
      const value = await page.evaluate(() => {
        const div = document.getElementById('test');
        if (div) {
          div.textContent = 'Modified';
          return div.textContent;
        }
        return null;
      });
      
      return value;
    });

    expect(result).toBe('Modified');
  }, 15000);

  it('should handle request interception', async () => {
    const requests: string[] = [];
    
    await withPage(async (page) => {
      await page.setRequestInterception(true);
      
      page.on('request', (request) => {
        requests.push(request.url());
        request.continue();
      });
      
      await page.goto('data:text/html,<html><body><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></body></html>');
    });

    expect(requests.length).toBeGreaterThan(0);
    expect(requests[0]).toMatch(/^data:text\/html/);
  }, 15000);
});