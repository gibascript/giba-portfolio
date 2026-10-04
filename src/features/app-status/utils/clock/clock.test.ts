import { describe, expect, it } from 'vitest';
import { formatClock } from './clock';

describe('formatClock', () => {
  it('shows the time in Brazil, whatever the visitor time zone', () => {
    expect(formatClock(new Date('2026-10-04T14:05:09Z'), 'pt')).toBe(
      '11:05:09',
    );
  });

  it('uses a 24-hour clock in English too', () => {
    expect(formatClock(new Date('2026-10-04T23:30:00Z'), 'en')).toBe(
      '20:30:00',
    );
  });

  it('wraps past midnight in Brazil', () => {
    expect(formatClock(new Date('2026-10-05T02:15:00Z'), 'pt')).toBe(
      '23:15:00',
    );
  });
});
