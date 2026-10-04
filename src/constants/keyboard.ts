import { isApplePlatform } from '@/utils/platform';

/** Modifier of the shortcuts on this device: ⌘ on Apple ones, Ctrl elsewhere. */
export const shortcutModifier = isApplePlatform(navigator.platform)
  ? '⌘'
  : 'Ctrl';

/** How the command palette shortcut reads on this device: `⌘K` or `Ctrl K`. */
export const paletteShortcut =
  shortcutModifier === '⌘' ? '⌘K' : `${shortcutModifier} K`;

/** `aria-keyshortcuts` value of the command palette shortcut on this device. */
export const paletteKeyShortcuts =
  shortcutModifier === '⌘' ? 'Meta+K' : 'Control+K';
