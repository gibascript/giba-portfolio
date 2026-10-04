import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('keeps a custom font size next to a text color', () => {
    expect(cn('text-display-lg', 'text-strong')).toBe(
      'text-display-lg text-strong',
    );
  });

  it('lets the last text color win over the previous one', () => {
    expect(cn('text-prose text-body', 'text-strong')).toBe(
      'text-prose text-strong',
    );
  });

  it('lets the last custom font size win over a default-scale one', () => {
    expect(cn('text-lg', 'text-prose-lg')).toBe('text-prose-lg');
  });

  it('reads custom shadows, measures and chrome sizes as their own groups', () => {
    expect(cn('shadow-popup bg-surface', 'shadow-lift')).toBe(
      'bg-surface shadow-lift',
    );
    expect(cn('max-w-paragraph', 'max-w-headline')).toBe('max-w-headline');
    expect(cn('h-tab-bar', 'h-title-bar')).toBe('h-title-bar');
  });

  it('drops falsy conditional classes', () => {
    expect(cn('flex', false, undefined, null, 'gap-2')).toBe('flex gap-2');
  });
});
