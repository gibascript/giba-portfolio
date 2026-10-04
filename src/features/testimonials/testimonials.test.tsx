import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Testimonials from './testimonials';

describe('Testimonials', () => {
  it('signs each quote with its author', () => {
    renderWithProviders(<Testimonials />);

    const testimonial = screen.getByRole('figure');
    expect(testimonial).toContainElement(screen.getByRole('blockquote'));
    expect(testimonial).toHaveTextContent('— Nome Sobrenome, Cargo @ Empresa');
  });
});
