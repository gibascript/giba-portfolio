import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Certifications from './certifications';

describe('Certifications', () => {
  it('lists the certifications, with the issuer only where known', () => {
    renderWithProviders(<Certifications />, { locale: 'en' });

    const section = screen.getByRole('region', { name: 'Certifications' });
    const items = within(section).getAllByRole('listitem');
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent('Web Accessibility Specialist');
    expect(items[0]).toHaveTextContent('"issuer": "Wix"');
    expect(items[1]).not.toHaveTextContent('issuer');
  });
});
