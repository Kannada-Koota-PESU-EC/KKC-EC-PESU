import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '../features/home/pages/IndexPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { heroSlides } from '../features/home/data/heroSlides';

const renderHome = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Index />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Homepage', () => {
  it('shows the hero title, buttons and the About section', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kannada KootaEC PESU');
    expect(screen.getByRole('button', { name: 'About us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('heading', { level: 2, name: 'About Kannada Koota' })).toBeInTheDocument();
    expect(screen.getByText('Poetry & Literature')).toBeInTheDocument();
  });

  it('counts the stats up to their final values', async () => {
    renderHome();

    expect(await screen.findByText('160+', {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
  });

  it('jumps to a photo when its dash is clicked and shows its caption', async () => {
    renderHome();
    const last = heroSlides[heroSlides.length - 1];

    fireEvent.click(screen.getByRole('button', { name: new RegExp(last.caption.en) }));

    // Crossfades after decoding and a short Ken Burns lead-in
    expect(await screen.findByText(last.caption.en, { selector: '[aria-live]' })).toBeInTheDocument();
  });

  it('crossfades: the old photo stays visible underneath until the new one has faded in', async () => {
    const { container } = renderHome();
    const slides = () => Array.from(container.querySelectorAll('.hero-slide'));
    const last = heroSlides.length - 1;

    // Every slide is always rendered
    expect(slides()).toHaveLength(heroSlides.length);
    expect(slides()[0]).toHaveClass('is-active');

    fireEvent.click(screen.getByRole('button', { name: new RegExp(heroSlides[last].caption.en) }));

    await waitFor(() => expect(slides()[last]).toHaveClass('is-active'));
    expect(slides()[0]).toHaveClass('is-prev');
    await waitFor(() => expect(slides()[0]).not.toHaveClass('is-prev'), { timeout: 3000 });
  });
});
