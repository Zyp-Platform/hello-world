/**
 * Manifest Contract E2E Tests
 *
 * Tests that verify the SPA manifest matches the contract.
 */

import { test, expect } from '@playwright/test';
import manifest from '../src/manifest.json';

test.describe('Manifest Contract', () => {
  test('should have required id and name', () => {
    expect(manifest.id).toBe('hello-world');
    expect(manifest.name).toBeTruthy();
  });

  test('should have valid version', () => {
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('should have federation config', () => {
    expect(manifest.federation).toHaveProperty('remoteEntry');
    expect(manifest.federation).toHaveProperty('moduleName');
    expect(manifest.federation.moduleName).toBe('hello_world');
  });

  test('should have all three entry points', () => {
    expect(manifest.entryPoints).toHaveProperty('publicHome');
    expect(manifest.entryPoints).toHaveProperty('memberHome');
    expect(manifest.entryPoints).toHaveProperty('commissionerHome');
  });

  test('should have routes matching convention', () => {
    manifest.routes.forEach((route) => {
      expect(route.path).toMatch(/^\/core\/hello-world\/(public|member|commissioner)/);
    });
  });

  test('should have three routes for each role', () => {
    const roles = manifest.routes.map((r) => r.role);
    expect(roles).toContain('public');
    expect(roles).toContain('member');
    expect(roles).toContain('commissioner');
  });

  test('should define all required props', () => {
    expect(manifest.props).toHaveProperty('communityId');
    expect(manifest.props).toHaveProperty('user');
    expect(manifest.props).toHaveProperty('onNavigate');
    expect(manifest.props).toHaveProperty('theme');
  });

  test('should mark all props as required', () => {
    Object.values(manifest.props).forEach((prop) => {
      expect(prop.required).toBe(true);
    });
  });

  test('should have shared dependencies', () => {
    expect(manifest.sharedDeps).toContain('react');
    expect(manifest.sharedDeps).toContain('react-dom');
  });
});
