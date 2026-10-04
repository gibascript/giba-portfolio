import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tab, TabClose, Tabs, TabTrigger } from './tabs';

describe('components/Tabs', () => {
  it('closes a tab without selecting it', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      <Tabs>
        <Tab active>
          <TabTrigger onClick={onSelect}>sobre.md</TabTrigger>
          <TabClose aria-label="Fechar sobre.md" onClick={onClose} />
        </Tab>
      </Tabs>,
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Fechar sobre.md' }),
    );

    expect(onClose).toHaveBeenCalledOnce();
    expect(onSelect).not.toHaveBeenCalled();
  });
});
