import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FileIcon } from './file-icon';

describe('components/FileIcon', () => {
  it('stays out of the accessibility tree, next to the file name', () => {
    render(
      <span>
        <FileIcon type="markdown" />
        sobre.md
      </span>,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
