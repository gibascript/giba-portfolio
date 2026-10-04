import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroShortcutHint } from './hero-shortcut-hint';

describe('HeroShortcutHint', () => {
  it('offers Enter while the single-key shortcuts are on', () => {
    render(<HeroShortcutHint locale="pt" shortcutsEnabled />);

    expect(screen.getByText('↵')).toBeInTheDocument();
    expect(screen.getByText('para navegar')).toBeInTheDocument();
  });

  it('keeps only the palette shortcut once they are off', () => {
    render(<HeroShortcutHint locale="en" shortcutsEnabled={false} />);

    expect(screen.queryByText('↵')).not.toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
    expect(screen.getByText('to navigate')).toBeInTheDocument();
  });
});
