import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ListItem } from './list-item';

describe('components/ListItem', () => {
  it('is a button named after its label, ignoring icon and chevron', async () => {
    const onClick = vi.fn();
    render(
      <ListItem icon="markdown" chevron="closed" onClick={onClick}>
        sobre.md
      </ListItem>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'sobre.md' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
