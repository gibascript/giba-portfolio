import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Kbd } from './kbd';

describe('components/Kbd', () => {
  it('marks the key as keyboard input', () => {
    render(<Kbd>esc</Kbd>);

    expect(screen.getByText('esc').tagName).toBe('KBD');
  });
});
