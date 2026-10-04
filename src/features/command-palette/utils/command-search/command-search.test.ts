import { describe, expect, it } from 'vitest';
import { filterCommands, normalizeSearch } from './command-search';
import type { PaletteCommand } from './command-search.types';

function command(label: string, hint: string, group: string): PaletteCommand {
  return { id: label, label, hint, group, run: () => {} };
}

const commands = [
  command('Experiência', 'experiencia.ts', 'Seções'),
  command('Certificações', 'certificacoes.json', 'Seções'),
  command('Copiar e-mail', 'alvesgilberto84@gmail.com', 'Ações'),
  command('GitHub', 'github.com/gibascript', 'Links'),
];

describe('normalizeSearch', () => {
  it('drops accents and case', () => {
    expect(normalizeSearch('Ações ÇÃO')).toBe('acoes cao');
  });
});

describe('filterCommands', () => {
  it('keeps every command for a blank query', () => {
    expect(filterCommands(commands, '   ')).toEqual(commands);
  });

  it('matches without accents or case', () => {
    expect(
      filterCommands(commands, 'CERTIFICACOES').map((c) => c.label),
    ).toEqual(['Certificações']);
  });

  it('matches the hint and the group too', () => {
    expect(filterCommands(commands, 'gmail').map((c) => c.label)).toEqual([
      'Copiar e-mail',
    ]);
    expect(filterCommands(commands, 'links').map((c) => c.label)).toEqual([
      'GitHub',
    ]);
  });

  it('finds nothing for an unrelated query', () => {
    expect(filterCommands(commands, 'kubernetes')).toEqual([]);
  });
});
