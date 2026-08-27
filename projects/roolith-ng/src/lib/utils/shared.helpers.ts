/**
 * Generate a unique ID
 *
 * @returns string
 */
export function uniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Check if the current environment is localhost by examining the window location hostname.
 *
 * @returns boolean
 */
export function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '::1'
  );
}
