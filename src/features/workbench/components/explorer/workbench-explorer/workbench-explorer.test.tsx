import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WorkbenchExplorer } from './workbench-explorer';

describe('WorkbenchExplorer', () => {
  it('lists every file in the locale, marking the open one', () => {
    render(
      <WorkbenchExplorer
        id="explorer"
        locale="en"
        activeFile="projects"
        open={false}
        onOpenFile={vi.fn()}
      />,
    );

    const explorer = screen.getByRole('navigation', { name: 'Explorer' });
    const files = within(explorer)
      .getAllByRole('button')
      .map((button) => button.textContent);
    expect(files).toEqual([
      'about.md',
      'experience.ts',
      'projects.tsx',
      'certifications.json',
      'stack.yaml',
      'education.md',
      'testimonials.md',
      'contact.sh',
    ]);
    expect(
      within(explorer).getByRole('button', { name: 'projects.tsx' }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('opens the clicked file', async () => {
    const onOpenFile = vi.fn();
    render(
      <WorkbenchExplorer
        id="explorer"
        locale="pt"
        activeFile="about"
        open
        onOpenFile={onOpenFile}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'contato.sh' }));

    expect(onOpenFile).toHaveBeenCalledWith('contact');
  });
});
