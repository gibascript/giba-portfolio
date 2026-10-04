import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * `tailwind-merge` taught the custom names of `src/styles/theme.css`, so that
 * e.g. `text-prose` is read as a font size, not as a text color, and survives
 * a later `text-body`. Keep it in sync with the theme.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      animate: ['reveal', 'reveal-fast', 'blink'],
      container: [
        'lead',
        'headline',
        'paragraph',
        'summary',
        'bullet',
        'empty',
        'palette',
        'editor',
      ],
      leading: ['code'],
      shadow: ['popup', 'lift', 'focus'],
      spacing: ['status-bar', 'tab-bar', 'title-bar', 'gutter', 'sidebar'],
      text: [
        'prose',
        'prose-lg',
        'numeral',
        'display-xs',
        'display-sm',
        'display-md',
        'display-lg',
        'display-xl',
        'display-hero',
      ],
      tracking: ['caps', 'display'],
    },
    classGroups: {
      'grid-cols': [{ 'grid-cols': ['cards', 'stack'] }],
    },
  },
});

/**
 * Joins class names, conditional ones included, and lets the last Tailwind
 * utility of each group win.
 *
 * @example
 * cn('text-prose text-body', isActive && 'text-strong') // 'text-prose text-strong'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
