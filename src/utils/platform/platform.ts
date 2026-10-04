/**
 * Whether `platform` (e.g. `navigator.platform`) is an Apple one, where
 * shortcuts use ⌘ instead of Ctrl.
 *
 * @example
 * isApplePlatform('MacIntel') // true
 * isApplePlatform('Win32') // false
 */
export function isApplePlatform(platform: string) {
  return /mac|iphone|ipad|ipod/i.test(platform);
}
