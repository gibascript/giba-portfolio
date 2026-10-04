import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WorkbenchEditor } from './workbench-editor';

describe('WorkbenchEditor', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the file as main content, with line numbers hidden from screen readers', () => {
    render(
      <WorkbenchEditor>
        <h2>Sobre</h2>
      </WorkbenchEditor>,
    );

    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { name: 'Sobre' }),
    );
    expect(screen.getByText('40').closest('[aria-hidden]')).not.toBeNull();
  });
});
