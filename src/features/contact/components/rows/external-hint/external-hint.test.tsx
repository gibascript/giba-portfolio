import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExternalHint } from './external-hint';

describe('ExternalHint', () => {
  it('replaces the arrow with its label for screen readers', () => {
    render(
      <a href="https://www.linkedin.com/in/gilberto-developer">
        LinkedIn <ExternalHint label="(abre em nova aba)" />
      </a>,
    );

    expect(
      screen.getByRole('link', { name: 'LinkedIn (abre em nova aba)' }),
    ).toBeInTheDocument();
  });
});
