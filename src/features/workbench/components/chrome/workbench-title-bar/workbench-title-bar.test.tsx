import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { links } from '@/constants/links';
import { WorkbenchTitleBar } from './workbench-title-bar';

describe('WorkbenchTitleBar', () => {
  it('toggles the explorer drawer it controls', async () => {
    const onToggleExplorer = vi.fn();
    render(
      <WorkbenchTitleBar
        locale="pt"
        fileName="sobre.md"
        explorerId="explorer"
        explorerOpen={false}
        onToggleExplorer={onToggleExplorer}
      />,
    );

    const toggle = screen.getByRole('button', { name: 'Explorer' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'explorer');

    await userEvent.click(toggle);

    expect(onToggleExplorer).toHaveBeenCalledOnce();
  });

  it('downloads the CV under its file name', () => {
    render(
      <WorkbenchTitleBar
        locale="en"
        fileName="about.md"
        explorerId="explorer"
        explorerOpen={false}
        onToggleExplorer={vi.fn()}
      />,
    );

    const download = screen.getByRole('link', { name: 'Download CV' });
    expect(download).toHaveAttribute('href', links.cv.url);
    expect(download).toHaveAttribute('download', 'gilberto-alves-cv.pdf');
  });
});
