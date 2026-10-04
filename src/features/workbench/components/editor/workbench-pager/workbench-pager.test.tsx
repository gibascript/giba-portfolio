import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WorkbenchPager } from './workbench-pager';

describe('WorkbenchPager', () => {
  it('names the neighbor files, wrapping from the first file to the last', async () => {
    const onStep = vi.fn();
    render(<WorkbenchPager locale="pt" activeFile="about" onStep={onStep} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Arquivo anterior: contato.sh' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Próximo arquivo: experiencia.ts' }),
    );

    expect(onStep.mock.calls).toEqual([[-1], [1]]);
  });
});
