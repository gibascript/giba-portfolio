import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Timeline,
  TimelineBody,
  TimelineItem,
  TimelinePeriod,
  TimelineTitle,
} from './timeline';

describe('components/Timeline', () => {
  it('lists the entries in order, each titled by a heading', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelinePeriod>mai 2024 — jun 2025</TimelinePeriod>
          <TimelineBody>
            <TimelineTitle>Universidade Católica de Brasília</TimelineTitle>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelinePeriod>jan 2022 — abr 2024</TimelinePeriod>
          <TimelineBody>
            <TimelineTitle>UDF Centro Universitário</TimelineTitle>
          </TimelineBody>
        </TimelineItem>
      </Timeline>,
    );

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(
      within(items[1]).getByRole('heading', {
        level: 3,
        name: 'UDF Centro Universitário',
      }),
    ).toBeInTheDocument();
  });
});
