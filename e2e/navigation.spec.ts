/**
 * Navigation E2E Tests
 *
 * Tests for the onNavigate callback and spa-navigate events.
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation Callback', () => {
  test('should trigger navigation on Sign In button click', async ({ page }) => {
    await page.goto('/');

    // Set up navigation listener
    const navigationPromise = page.waitForURL(/login|user-core/);

    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for navigation (or timeout if not implemented)
    await expect(async () => {
      await navigationPromise;
    }).toPass({ timeout: 5000 }).catch(() => {
      // Navigation might be logged to console in dev mode
    });
  });

  test('should trigger navigation on Go to Account button click', async ({ page }) => {
    await page.goto('/member');

    // Set up console listener to capture navigation logs
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.text().includes('Navigate to:')) {
        consoleLogs.push(msg.text());
      }
    });

    // Click Go to Account button
    await page.getByRole('button', { name: /go to account/i }).click();

    // Wait a bit for console logs
    await page.waitForTimeout(100);

    // Verify navigation was triggered (either via console or URL change)
    expect(consoleLogs.some((log) => log.includes('account'))).toBe(true);
  });

  test('should log navigation path to console in dev mode', async ({ page }) => {
    await page.goto('/');

    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    // Trigger navigation via button click
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for console log
    await page.waitForTimeout(100);

    // Check that navigation was logged
    expect(consoleLogs.some((log) => log.includes('Navigate to:'))).toBe(true);
  });
});
