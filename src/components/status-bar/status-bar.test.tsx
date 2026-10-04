import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  StatusBar,
  StatusBarButton,
  StatusBarGroup,
  StatusBarItem,
} from './status-bar';

describe('components/StatusBar', () => {
  it('is the page footer, with actions as buttons and status as text', () => {
    render(
      <StatusBar>
        <StatusBarGroup>
          <StatusBarItem>Pronto</StatusBarItem>
        </StatusBarGroup>
        <StatusBarGroup>
          <StatusBarButton>⌘K</StatusBarButton>
        </StatusBarGroup>
      </StatusBar>,
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toContainElement(screen.getByRole('button', { name: '⌘K' }));
    expect(
      screen.queryByRole('button', { name: 'Pronto' }),
    ).not.toBeInTheDocument();
  });
});
