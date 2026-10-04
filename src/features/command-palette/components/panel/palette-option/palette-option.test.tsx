import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PaletteOption } from './palette-option';

const command = {
  id: 'file-contact',
  group: 'Seções',
  label: 'Contato',
  hint: 'contato.sh',
  run: () => {},
};

describe('PaletteOption', () => {
  it('selects on hover and runs on click', async () => {
    const onSelect = vi.fn();
    const onRun = vi.fn();
    render(
      <div role="listbox">
        <PaletteOption
          id="option"
          command={command}
          selected={false}
          onSelect={onSelect}
          onRun={onRun}
        />
      </div>,
    );

    const option = screen.getByRole('option', { name: /Contato/ });
    expect(option).toHaveAttribute('aria-selected', 'false');

    await userEvent.hover(option);
    await userEvent.click(option);

    expect(onSelect).toHaveBeenCalled();
    expect(onRun).toHaveBeenCalledOnce();
  });
});
