import { describe, expect, it } from 'vitest';
import { fileFromHash, screenHash } from './file-hash';

describe('fileFromHash', () => {
  it('reads the file id after #/', () => {
    expect(fileFromHash('#/projects')).toBe('projects');
  });

  it('ignores no hash, other formats and unknown files', () => {
    expect(fileFromHash('')).toBeNull();
    expect(fileFromHash('#projects')).toBeNull();
    expect(fileFromHash('#/projetos')).toBeNull();
    expect(fileFromHash('#/')).toBeNull();
  });
});

describe('screenHash', () => {
  it('names the open file on the workbench and nothing on the hero', () => {
    expect(screenHash('workbench', 'contact')).toBe('#/contact');
    expect(screenHash('hero', 'contact')).toBe('');
  });
});
