import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../features/events/pages/EventsPage';

describe('Events Page', () => {
  it('renders upcoming and past event sections with cards', () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Events />
      </MemoryRouter>
    );

    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('Past Events')).toBeInTheDocument();
    expect(screen.getAllByTestId('event-card').length).toBeGreaterThan(0);
  });
});
