import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockMatchMedia } from '@/test/match-media';
import { HeroTypedRole } from './hero-typed-role';

describe('HeroTypedRole', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads as the first role, not the letters being typed', () => {
    mockMatchMedia(false);
    render(
      <h2>
        <HeroTypedRole roles={['engenheiro de software sênior', 'front-end']} />
      </h2>,
    );

    expect(
      screen.getByRole('heading', { name: 'engenheiro de software sênior' }),
    ).toBeInTheDocument();
  });

  it('shows the first role whole with reduced motion', () => {
    mockMatchMedia(true);
    render(<HeroTypedRole roles={['acessibilidade digital', 'front-end']} />);

    expect(screen.getAllByText('acessibilidade digital')).toHaveLength(2);
  });
});
