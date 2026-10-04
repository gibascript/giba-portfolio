import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Experience from './experience';

describe('Experience', () => {
  it('lists the jobs latest first, flagging only the current one', () => {
    renderWithProviders(<Experience />);

    const jobs = within(
      screen.getByRole('region', { name: 'Experiência' }),
    ).getAllByRole('heading', { level: 3 });
    expect(jobs[0]).toHaveTextContent('Engenheiro de Software Sênior @ Valid');
    expect(jobs.at(-1)).toHaveTextContent('Desenvolvedor Web @ Freelancer');
    expect(screen.getAllByText('Atual')).toHaveLength(1);
  });
});
