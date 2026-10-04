import { describe, expect, it } from 'vitest';
import { cyclicStep } from './cyclic-step';

const files = ['about', 'experience', 'projects', 'contact'];

describe('cyclicStep', () => {
  it('moves forward and back inside the list', () => {
    expect(cyclicStep(files, 'experience', 1)).toBe('projects');
    expect(cyclicStep(files, 'experience', -1)).toBe('about');
  });

  it('wraps from the last item to the first and back', () => {
    expect(cyclicStep(files, 'contact', 1)).toBe('about');
    expect(cyclicStep(files, 'about', -1)).toBe('contact');
  });

  it('wraps steps longer than the list', () => {
    expect(cyclicStep(files, 'about', -6)).toBe('projects');
  });

  it('steps from the first item when the current one is unknown', () => {
    expect(cyclicStep(files, 'missing', 1)).toBe('experience');
  });
});
