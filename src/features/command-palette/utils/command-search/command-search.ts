import type { PaletteCommand } from './command-search.types';

/**
 * Lowercases `text` and strips its accents, so a search for "experiencia"
 * finds "Experiência".
 *
 * @example
 * normalizeSearch('Certificações') // 'certificacoes'
 */
export function normalizeSearch(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

/**
 * The commands whose label, hint or group contain `query`, ignoring case,
 * accents and surrounding spaces. An empty query keeps them all.
 *
 * @example
 * filterCommands(commands, ' CONTATO ') // the "Contato" section command
 */
export function filterCommands(
  commands: readonly PaletteCommand[],
  query: string,
) {
  const search = normalizeSearch(query.trim());

  if (search === '') {
    return commands;
  }

  return commands.filter((command) =>
    normalizeSearch(
      `${command.label} ${command.hint} ${command.group}`,
    ).includes(search),
  );
}
