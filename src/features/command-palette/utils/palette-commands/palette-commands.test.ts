import { describe, expect, it, vi } from 'vitest';
import { links } from '@/constants/links';
import { paletteCommands } from './palette-commands';

function options() {
  return {
    locale: 'pt' as const,
    shortcutsEnabled: true,
    openFile: vi.fn(),
    toggleLocale: vi.fn(),
    toggleShortcuts: vi.fn(),
    copyText: vi.fn(),
    goHome: vi.fn(),
  };
}

describe('paletteCommands', () => {
  it('lists the sections, then the actions, then the links', () => {
    const commands = paletteCommands(options());

    expect(commands.map((command) => command.group)).toEqual([
      ...Array(8).fill('Seções'),
      ...Array(5).fill('Ações'),
      'Links',
      'Links',
    ]);
    expect(commands[0]).toMatchObject({ label: 'Sobre', hint: 'sobre.md' });
  });

  it('opens the section file and copies the e-mail', () => {
    const actions = options();
    const commands = paletteCommands(actions);

    commands.find((command) => command.label === 'Contato')?.run();
    commands.find((command) => command.id === 'copy-email')?.run();

    expect(actions.openFile).toHaveBeenCalledWith('contact');
    expect(actions.copyText).toHaveBeenCalledWith(links.email);
  });

  it('offers the other language in that language', () => {
    const english = paletteCommands({ ...options(), locale: 'en' });

    expect(
      english.find((command) => command.id === 'switch-locale'),
    ).toMatchObject({ label: 'Mudar para português', hint: 'PT-BR' });
  });

  it('shows the single-key shortcuts only while they are on', () => {
    const on = paletteCommands(options());
    const off = paletteCommands({ ...options(), shortcutsEnabled: false });

    expect(on.find((command) => command.label === 'Contato')?.shortcut).toBe(
      '8',
    );
    expect(on.find((command) => command.id === 'switch-locale')?.shortcut).toBe(
      'L',
    );
    expect(off.some((command) => command.shortcut)).toBe(false);
  });

  it('offers to turn the shortcuts off, or back on', () => {
    const actions = options();
    const on = paletteCommands(actions);
    const off = paletteCommands({ ...options(), shortcutsEnabled: false });

    const toggle = on.find((command) => command.id === 'toggle-shortcuts');
    toggle?.run();

    expect(toggle?.label).toBe('Desativar atalhos de uma tecla');
    expect(
      off.find((command) => command.id === 'toggle-shortcuts')?.label,
    ).toBe('Ativar atalhos de uma tecla');
    expect(actions.toggleShortcuts).toHaveBeenCalledOnce();
  });

  it('opens the profiles in a new tab', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);

    paletteCommands(options())
      .find((command) => command.id === 'github')
      ?.run();

    expect(open).toHaveBeenCalledWith(links.github.url, '_blank', 'noopener');
  });
});
