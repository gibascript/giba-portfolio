import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('components/Button', () => {
  it('does not submit the surrounding form', async () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <Button>Abrir workbench</Button>
      </form>,
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Abrir workbench' }),
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders a download link when rendered as an anchor', () => {
    render(
      <Button as="a" href="/cv.pdf" download>
        Baixar currículo
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Baixar currículo' });
    expect(link).toHaveAttribute('href', '/cv.pdf');
    expect(link).toHaveAttribute('download');
    expect(link).not.toHaveAttribute('type');
  });

  it('ignores clicks while disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Comandos
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Comandos' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
