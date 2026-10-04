import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { links } from '@/constants/links';
import { WorkbenchTitleBar } from './workbench-title-bar';

function renderTitleBar(
  props: Partial<ComponentProps<typeof WorkbenchTitleBar>> = {},
) {
  render(
    <WorkbenchTitleBar
      locale="pt"
      fileName="sobre.md"
      explorerId="explorer"
      explorerOpen={false}
      onToggleExplorer={vi.fn()}
      onHome={vi.fn()}
      onOpenPalette={vi.fn()}
      {...props}
    />,
  );
}

describe('WorkbenchTitleBar', () => {
  it('toggles the explorer drawer it controls', async () => {
    const onToggleExplorer = vi.fn();
    renderTitleBar({ onToggleExplorer });

    const toggle = screen.getByRole('button', { name: 'Explorer' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'explorer');

    await userEvent.click(toggle);

    expect(onToggleExplorer).toHaveBeenCalledOnce();
  });

  it('downloads the CV under its file name', () => {
    renderTitleBar({ locale: 'en', fileName: 'about.md' });

    const download = screen.getByRole('link', { name: 'Download CV' });
    expect(download).toHaveAttribute('href', links.cv.url);
    expect(download).toHaveAttribute('download', 'gilberto-alves-cv.pdf');
  });

  it('goes back home from the wordmark', async () => {
    const onHome = vi.fn();
    renderTitleBar({ onHome });

    await userEvent.click(
      screen.getByRole('button', { name: 'gilberto-alves. — Início' }),
    );

    expect(onHome).toHaveBeenCalledOnce();
  });

  it('opens the command palette, announcing its shortcut', async () => {
    const onOpenPalette = vi.fn();
    renderTitleBar({ onOpenPalette });

    const palette = screen.getByRole('button', { name: /Comandos/ });
    expect(palette).toHaveAttribute('aria-keyshortcuts');

    await userEvent.click(palette);

    expect(onOpenPalette).toHaveBeenCalledOnce();
  });
});
