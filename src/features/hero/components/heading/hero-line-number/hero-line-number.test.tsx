import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroLineNumber } from './hero-line-number';

describe('HeroLineNumber', () => {
  it('is hidden from screen readers', () => {
    render(
      <p>
        <HeroLineNumber>3</HeroLineNumber>Gilberto
      </p>,
    );

    expect(screen.getByText('3')).toHaveAttribute('aria-hidden', 'true');
  });
});
