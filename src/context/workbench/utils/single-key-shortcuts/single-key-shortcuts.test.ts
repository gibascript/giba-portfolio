import { describe, expect, it } from 'vitest';
import { shortcutAction } from './single-key-shortcuts';

function press(key: string, overrides = {}) {
  return {
    key,
    modified: false,
    inField: false,
    onControl: false,
    ...overrides,
  };
}

describe('shortcutAction', () => {
  it('switches the language and opens files from both stages', () => {
    expect(shortcutAction(press('L'), 'hero')).toEqual({
      type: 'toggle-locale',
    });
    expect(shortcutAction(press('l'), 'workbench')).toEqual({
      type: 'toggle-locale',
    });
    expect(shortcutAction(press('8'), 'hero')).toEqual({
      type: 'open-file',
      file: 'contact',
    });
    expect(shortcutAction(press('1'), 'workbench')).toEqual({
      type: 'open-file',
      file: 'about',
    });
  });

  it('ignores digits without a file', () => {
    expect(shortcutAction(press('9'), 'hero')).toBeNull();
    expect(shortcutAction(press('0'), 'workbench')).toBeNull();
  });

  it('opens the workbench with Enter, unless Enter hits a button or link', () => {
    expect(shortcutAction(press('Enter'), 'hero')).toEqual({
      type: 'open-workbench',
    });
    expect(
      shortcutAction(press('Enter', { onControl: true }), 'hero'),
    ).toBeNull();
  });

  it('steps through files and goes home only on the workbench', () => {
    expect(shortcutAction(press(']'), 'workbench')).toEqual({
      type: 'step-file',
      delta: 1,
    });
    expect(shortcutAction(press('['), 'workbench')).toEqual({
      type: 'step-file',
      delta: -1,
    });
    expect(shortcutAction(press('Escape'), 'workbench')).toEqual({
      type: 'go-home',
    });
    expect(shortcutAction(press(']'), 'hero')).toBeNull();
    expect(shortcutAction(press('Escape'), 'hero')).toBeNull();
  });

  it('leaves presses with a modifier or typed in a field alone', () => {
    expect(
      shortcutAction(press('l', { modified: true }), 'workbench'),
    ).toBeNull();
    expect(shortcutAction(press('3', { inField: true }), 'hero')).toBeNull();
  });
});
