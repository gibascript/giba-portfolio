import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExplorerLink } from './explorer-link';

describe('ExplorerLink', () => {
  it('warns screen readers that the link opens a new tab, without the glyph', () => {
    render(
      <ExplorerLink
        href="https://github.com/gibascript"
        target="_blank"
        glyph="↗"
        hint="(abre em nova aba)"
      >
        GitHub
      </ExplorerLink>,
    );

    expect(
      screen.getByRole('link', { name: 'GitHub (abre em nova aba)' }),
    ).toBeInTheDocument();
  });
});
