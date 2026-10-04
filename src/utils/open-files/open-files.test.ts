import { describe, expect, it } from 'vitest';
import { closeTab, openFile } from './open-files';

describe('openFile', () => {
  it('adds a tab at the end for a file not open yet', () => {
    expect(openFile({ active: 'about', tabs: ['about'] }, 'contact')).toEqual({
      active: 'contact',
      tabs: ['about', 'contact'],
    });
  });

  it('only activates a file that already has a tab', () => {
    expect(
      openFile({ active: 'contact', tabs: ['about', 'contact'] }, 'about'),
    ).toEqual({ active: 'about', tabs: ['about', 'contact'] });
  });
});

describe('closeTab', () => {
  it('keeps the active file when closing another tab', () => {
    expect(
      closeTab({ active: 'stack', tabs: ['about', 'stack'] }, 'about', 'about'),
    ).toEqual({ active: 'stack', tabs: ['stack'] });
  });

  it('activates the last tab left when closing the active one', () => {
    expect(
      closeTab(
        { active: 'about', tabs: ['about', 'stack', 'contact'] },
        'about',
        'about',
      ),
    ).toEqual({ active: 'contact', tabs: ['stack', 'contact'] });
  });

  it('reopens the fallback when closing the only tab', () => {
    expect(
      closeTab({ active: 'contact', tabs: ['contact'] }, 'contact', 'about'),
    ).toEqual({ active: 'about', tabs: ['about'] });
  });
});
