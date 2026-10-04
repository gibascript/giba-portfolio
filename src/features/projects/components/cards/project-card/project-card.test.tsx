import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  it('is an article named after the project, with its tags as a list', () => {
    render(
      <ProjectCard
        number="02"
        project={{
          name: 'Plataforma de interoperabilidade',
          context: 'Valid · Governo',
          description: 'Plataforma que gera APIs a partir de uma base SQL.',
          tags: ['SQL', 'APIs'],
        }}
      />,
    );

    const card = screen.getByRole('article', {
      name: 'Plataforma de interoperabilidade',
    });
    expect(
      within(card)
        .getAllByRole('listitem')
        .map((tag) => tag.textContent),
    ).toEqual(['SQL', 'APIs']);
    expect(card).not.toHaveAccessibleName(/02/);
  });
});
