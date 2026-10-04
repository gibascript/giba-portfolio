import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactRow } from './contact-row';

describe('ContactRow', () => {
  it('is named by the command, the value and the hint, word by word', () => {
    render(
      <ContactRow
        as="a"
        href="https://github.com/gibascript"
        command="$ open"
        trailing="(abre em nova aba)"
      >
        github.com/gibascript
      </ContactRow>,
    );

    expect(
      screen.getByRole('link', {
        name: '$ open github.com/gibascript (abre em nova aba)',
      }),
    ).toBeInTheDocument();
  });
});
