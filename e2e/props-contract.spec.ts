/**
 * Props Contract E2E Tests
 *
 * Tests that verify the SPA receives and exposes props correctly.
 */

import { test, expect } from '@playwright/test';

test.describe('Props Contract', () => {
  test('should expose props globally on public page', async ({ page }) => {
    await page.goto('/');

    const props = await page.evaluate(() => {
      return (window as Window & { __HELLO_WORLD_PROPS__?: unknown }).__HELLO_WORLD_PROPS__;
    });

    expect(props).toBeDefined();
  });

  test('should have communityId prop', async ({ page }) => {
    await page.goto('/');

    const communityId = await page.evaluate(() => {
      return (window as Window & { __HELLO_WORLD_PROPS__?: { communityId: string } })
        .__HELLO_WORLD_PROPS__?.communityId;
    });

    expect(communityId).toBe('comm_dev_123');
  });

  test('should have user prop as null on public page', async ({ page }) => {
    await page.goto('/');

    const user = await page.evaluate(() => {
      return (window as Window & { __HELLO_WORLD_PROPS__?: { user: unknown } })
        .__HELLO_WORLD_PROPS__?.user;
    });

    expect(user).toBeNull();
  });

  test('should have user prop with structure on member page', async ({ page }) => {
    await page.goto('/member');

    const user = await page.evaluate(() => {
      return (window as Window & { __HELLO_WORLD_PROPS__?: { user: unknown } })
        .__HELLO_WORLD_PROPS__?.user;
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('role.name');
  });

  test('should have onNavigate callback', async ({ page }) => {
    await page.goto('/');

    const hasCallback = await page.evaluate(() => {
      return typeof (
        window as Window & { __HELLO_WORLD_PROPS__?: { onNavigate: unknown } }
      ).__HELLO_WORLD_PROPS__?.onNavigate === 'function';
    });

    expect(hasCallback).toBe(true);
  });

  test('should have theme prop', async ({ page }) => {
    await page.goto('/');

    const theme = await page.evaluate(() => {
      return (window as Window & { __HELLO_WORLD_PROPS__?: { theme: string } })
        .__HELLO_WORLD_PROPS__?.theme;
    });

    expect(['light', 'dark']).toContain(theme);
  });
});
