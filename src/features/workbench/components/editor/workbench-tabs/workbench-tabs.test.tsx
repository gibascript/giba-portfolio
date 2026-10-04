import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WorkbenchTabs } from './workbench-tabs';

describe('WorkbenchTabs', () => {
  it('selects and closes tabs by file name', async () => {
    const onOpenFile = vi.fn();
    const onCloseTab = vi.fn();
    render(
      <WorkbenchTabs
        locale="pt"
        tabs={['about', 'stack']}
        activeFile="about"
        onOpenFile={onOpenFile}
        onCloseTab={onCloseTab}
      />,
    );

    expect(screen.getByRole('button', { name: 'sobre.md' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    await userEvent.click(screen.getByRole('button', { name: 'stack.yaml' }));
    await userEvent.click(
      screen.getByRole('button', { name: 'Fechar sobre.md' }),
    );

    expect(onOpenFile).toHaveBeenCalledWith('stack');
    expect(onCloseTab).toHaveBeenCalledWith('about');
  });
});
