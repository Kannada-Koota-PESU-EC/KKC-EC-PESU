import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../features/events/pages/EventsPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import type { Language } from '../shared/i18n/translations';
import { splitEventDetails } from '../features/events/components/eventFormat';

const renderEvents = (language: Language) =>
  render(
    <LanguageProvider initialLanguage={language}>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Events />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Events Page', () => {
  it('renders upcoming and past event sections with cards', () => {
    renderEvents('en');

    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('Past Events')).toBeInTheDocument();
    expect(screen.getAllByTestId('event-card').length).toBeGreaterThan(0);
  });

  it('renders section headings and event titles in Kannada', () => {
    renderEvents('kn');

    expect(screen.getByText('ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು')).toBeInTheDocument();
    expect(screen.getByText('ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು')).toBeInTheDocument();
    expect(screen.getByText('ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆ 2024')).toBeInTheDocument();
    expect(screen.queryByText('Past Events')).not.toBeInTheDocument();
  });
});

describe('Event cards', () => {
  it('opens the full details in a modal and closes it again', () => {
    renderEvents('en');

    const card = screen
      .getAllByTestId('event-card')
      .find((element) => element.getAttribute('data-event-id') === 'Kalantaranga') as HTMLElement;
    fireEvent.click(card);

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'Kalantaranga' })).toBeInTheDocument();
    // "Venue / Time / Prize pool" are split onto their own lines
    expect(within(dialog).getByText('Seminar Hall 2')).toBeInTheDocument();
    expect(within(dialog).getByText('₹3000')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-modal-open');

    fireEvent.click(within(dialog).getAllByRole('button', { name: 'Close' })[0]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters past events by year and updates the count', () => {
    renderEvents('en');
    const total = screen.getAllByTestId('event-card').length;

    fireEvent.click(screen.getByRole('button', { name: '2024' }));

    const filtered = screen.getAllByTestId('event-card');
    expect(filtered.length).toBeLessThan(total);
    expect(screen.getByText('1 event')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByTestId('event-card')).toHaveLength(total);
  });
});

describe('splitEventDetails', () => {
  it('moves Venue / Time / Prize pool onto separate lines', () => {
    expect(splitEventDetails('Come shine ✨ Venue: Hall 2 Time: 2:30 PM Prize pool: ₹3000')).toEqual({
      body: 'Come shine ✨',
      details: [
        { label: 'Venue', value: 'Hall 2' },
        { label: 'Time', value: '2:30 PM' },
        { label: 'Prize pool', value: '₹3000' },
      ],
    });
    expect(splitEventDetails('Just text').details).toEqual([]);
  });
});

describe('Event card details', () => {
  const cardFor = (id: string) =>
    screen.getAllByTestId('event-card').find((element) => element.getAttribute('data-event-id') === id) as HTMLElement;

  it('shows venue/time chips, status tag and a gallery chip only for real galleries', () => {
    renderEvents('en');

    const kalantaranga = cardFor('Kalantaranga');
    expect(within(kalantaranga).getByText('Completed')).toBeInTheDocument();
    expect(within(kalantaranga).getByText('Seminar Hall 2')).toBeInTheDocument();
    expect(within(kalantaranga).getByText('2:30 PM – 4:30 PM')).toBeInTheDocument();
    // Its "gallery" is just the poster again
    expect(within(kalantaranga).queryByText(/Gallery ·/)).not.toBeInTheDocument();

    expect(within(cardFor('3')).getByText('Gallery · 3')).toBeInTheDocument();
  });

  it('opens the event from a shared /events#id link', () => {
    window.location.hash = '#blood-donation';
    renderEvents('en');

    expect(within(screen.getByRole('dialog')).getByRole('heading', { name: 'Raktha Spandana' })).toBeInTheDocument();
    window.location.hash = '';
  });
});

describe('Event modal accessibility', () => {
  it('moves focus into the modal, closes on Escape and returns focus to the opener', async () => {
    renderEvents('en');
    const opener = screen.getAllByRole('button', { name: /^Read More:/ })[0];
    opener.focus();
    fireEvent.click(opener);

    const dialog = screen.getByRole('dialog');
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.activeElement).toBe(opener);
  });
});
