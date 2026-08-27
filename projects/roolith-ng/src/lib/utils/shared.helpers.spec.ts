import { afterEach, describe, expect, it } from 'vitest';
import { isLocalhost, uniqueId } from './shared.helpers';

describe('shared helpers', () => {
  describe('uniqueId', () => {
    it('should return a non-empty string', () => {
      expect(typeof uniqueId()).toBe('string');
      expect(uniqueId().length).toBeGreaterThan(0);
    });

    it('should return unique values on successive calls', () => {
      const first = uniqueId();
      const second = uniqueId();

      expect(first).not.toBe(second);
    });
  });

  describe('isLocalhost', () => {
    const _originalLocation = window.location;
    const _originalWindow = globalThis.window;

    afterEach(() => {
      (globalThis as any).window = _originalWindow;
    });

    it('should return false when window is undefined', () => {
      (globalThis as any).window = undefined;

      expect(isLocalhost()).toBe(false);
    });

    it('should return true when hostname is "localhost"', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'localhost' },
        writable: true,
        configurable: true,
      });

      expect(isLocalhost()).toBe(true);
    });

    it('should return true when hostname is "127.0.0.1"', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '127.0.0.1' },
        writable: true,
        configurable: true,
      });

      expect(isLocalhost()).toBe(true);
    });

    it('should return true when hostname is "::1"', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: '::1' },
        writable: true,
        configurable: true,
      });

      expect(isLocalhost()).toBe(true);
    });

    it('should return false for a remote hostname', () => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'app.example.com' },
        writable: true,
        configurable: true,
      });

      expect(isLocalhost()).toBe(false);
    });
  });
});
