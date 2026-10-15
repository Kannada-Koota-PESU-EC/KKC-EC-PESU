import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import UpcomingEvent from '../features/home/components/UpcomingEvent';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';

const renderAt = (now: string) => {
  jest.useFakeTimers({ now: new Date(now) });
  return render(
    <LanguageProvider initialLanguage="en">
      <UpcomingEvent />
    </LanguageProvider>
  );
};

describe('Homepage upcoming event', () => {
  afterEach(() => jest.useRealTimers());

  it('renders nothing when there is no upcoming event', () => {
    const { container } = renderAt('2030-01-01T10:00:00');
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the nearest event with a live countdown', () => {
    // Nritya Lahari: 19 Aug 2026, 10:00 AM
    renderAt('2026-08-18T09:59:58');

    expect(screen.getByRole('heading', { name: 'Nritya Lahari' })).toBeInTheDocument();
    expect(screen.getByText('Upcoming event')).toBeInTheDocument();
    const timer = screen.getByRole('timer');
    expect(within(timer).getByText('Days').previousSibling).toHaveTextContent('01');
    expect(within(timer).getByText('Secs').previousSibling).toHaveTextContent('02');

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(within(timer).getByText('Secs').previousSibling).toHaveTextContent('01');
  });

  it('opens the event details modal', () => {
    renderAt('2026-08-18T09:00:00');
    fireEvent.click(screen.getByRole('button', { name: 'View details' }));
    expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'Nritya Lahari' })).toBeInTheDocument();
  });

  it('says "Happening now!" once the event has started', () => {
    renderAt('2026-08-19T11:00:00');
    expect(screen.getByText('Happening now!')).toBeInTheDocument();
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
  });
});
