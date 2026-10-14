import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../features/events/pages/EventsPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import type { Language } from '../shared/i18n/translations';

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
