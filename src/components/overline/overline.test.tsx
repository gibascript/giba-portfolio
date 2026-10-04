import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Overline } from './overline';

describe('components/Overline', () => {
  it('can name a panel as its heading', () => {
    render(
      <nav aria-labelledby="explorer">
        <Overline as="h2" id="explorer">
          Explorer
        </Overline>
      </nav>,
    );

    expect(
      screen.getByRole('navigation', { name: 'Explorer' }),
    ).toContainElement(
      screen.getByRole('heading', { level: 2, name: 'Explorer' }),
    );
  });
});
