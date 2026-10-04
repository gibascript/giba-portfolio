import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section, SectionTitle } from './section';

describe('components/Section', () => {
  it('is a region named after its title', () => {
    render(
      <>
        <Section>
          <SectionTitle>Projetos</SectionTitle>
        </Section>
        <Section>
          <SectionTitle>Contato</SectionTitle>
        </Section>
      </>,
    );

    expect(
      screen.getByRole('region', { name: 'Projetos' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Contato' })).toBeInTheDocument();
  });
});
