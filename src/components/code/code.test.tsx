import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Code, CodeToken } from './code';

describe('components/Code', () => {
  it('reads its colored tokens as one line of text', () => {
    render(
      <Code data-testid="line">
        <CodeToken kind="keyword">$ mail</CodeToken>{' '}
        <CodeToken kind="string">"alvesgilberto84@gmail.com"</CodeToken>
      </Code>,
    );

    expect(screen.getByTestId('line')).toHaveTextContent(
      '$ mail "alvesgilberto84@gmail.com"',
    );
  });
});
