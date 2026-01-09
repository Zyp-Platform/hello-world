/**
 * Hello World Dashboards E2E Tests
 *
 * Tests for dashboard rendering and basic functionality.
 */

import { test, expect } from '@playwright/test';

test.describe('Hello World Dashboards', () => {
  test.describe('PublicHome', () => {
    test('should render welcome message', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('dashboard-container')).toBeVisible();
      await expect(page.getByRole('heading')).toContainText('gregs world!');
    });

    test('should display sign-in button', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    });

    test('should have community-id data attribute', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('dashboard-container')).toHaveAttribute(
        'data-community-id',
        'comm_dev_123'
      );
    });

    test('should display community ID in footer', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByText(/community:/i)).toBeVisible();
    });
  });

  test.describe('MemberHome', () => {
    test('should render personalized greeting', async ({ page }) => {
      await page.goto('/member');
      await expect(page.getByRole('heading')).toContainText('Hello');
    });

    test('should display user role indicator', async ({ page }) => {
      await page.goto('/member');
      await expect(page.getByTestId('user-role-indicator')).toContainText('member');
    });

    test('should have Go to Account button', async ({ page }) => {
      await page.goto('/member');
      await expect(page.getByRole('button', { name: /go to account/i })).toBeVisible();
    });

    test('should have dashboard container with community id', async ({ page }) => {
      await page.goto('/member');
      await expect(page.getByTestId('dashboard-container')).toHaveAttribute(
        'data-community-id',
        'comm_dev_123'
      );
    });
  });

  test.describe('CommissionerHome', () => {
    test('should render admin dashboard', async ({ page }) => {
      await page.goto('/commissioner');
      await expect(page.getByRole('heading')).toContainText('Go get it!');
    });

    test('should display commissioner role', async ({ page }) => {
      await page.goto('/commissioner');
      await expect(page.getByTestId('user-role-indicator')).toContainText('commissioner');
    });

    test('should have Manage Users button', async ({ page }) => {
      await page.goto('/commissioner');
      await expect(page.getByRole('button', { name: /manage users/i })).toBeVisible();
    });

    test('should display community stats section', async ({ page }) => {
      await page.goto('/commissioner');
      await expect(page.getByText(/community stats/i)).toBeVisible();
    });
  });
});
