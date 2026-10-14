import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../shared/components/layout/Navbar';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { splitBilingual, translations } from '../shared/i18n/translations';

const renderNavbar = () =>
  render(
    <LanguageProvider>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Language toggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to Kannada', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: 'ಮುಖಪುಟ' })).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe('kn');
  });

  it('switches to English and remembers the choice', () => {
    const { unmount } = renderNavbar();

    fireEvent.click(screen.getByRole('button', { name: 'English' }));

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.queryByText('ಮುಖಪುಟ')).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');

    unmount();
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});

describe('translations', () => {
  it('has non-empty Kannada and English text for every key', () => {
    // about.heading* intentionally leave one side empty to wrap the club name
    const allowedEmpty = new Set(['about.headingBefore', 'about.headingAfter']);
    for (const [key, value] of Object.entries(translations)) {
      if (allowedEmpty.has(key)) continue;
      expect([key, value.kn.trim().length > 0]).toEqual([key, true]);
      expect([key, value.en.trim().length > 0]).toEqual([key, true]);
    }
  });

  it('splits "ಕನ್ನಡ / English" team data', () => {
    expect(splitBilingual('ಮಂಜುನಾಥ್ ವಿ / Manjunath V')).toEqual({ kn: 'ಮಂಜುನಾಥ್ ವಿ', en: 'Manjunath V' });
    expect(splitBilingual('ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ/ Design and Video Editing')).toEqual({
      kn: 'ವಿನ್ಯಾಸ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪಾದನೆ',
      en: 'Design and Video Editing',
    });
    expect(splitBilingual('Only one')).toEqual({ kn: 'Only one', en: 'Only one' });
  });
});
