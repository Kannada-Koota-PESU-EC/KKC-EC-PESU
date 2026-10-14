import React from 'react';
import { act, render, screen } from '@testing-library/react';
import FloatingInstagram from '../shared/components/layout/FloatingInstagram';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { INTRO_REVEAL_EVENT } from '../features/intro/data/intro';
import { INSTAGRAM_URL } from '../shared/lib/social';

const renderButton = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <FloatingInstagram />
    </LanguageProvider>
  );

describe('FloatingInstagram', () => {
  afterEach(() => {
    delete document.documentElement.dataset.introPlaying;
  });

  it('links to the club Instagram in a new tab', () => {
    renderButton();
    const link = screen.getByRole('link', { name: 'Follow us on Instagram' });

    expect(link).toHaveAttribute('href', INSTAGRAM_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('stays hidden while the intro is playing', () => {
    document.documentElement.dataset.introPlaying = 'true';
    renderButton();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
    });
    expect(screen.getByRole('link', { name: 'Follow us on Instagram' })).toBeInTheDocument();
  });
});
