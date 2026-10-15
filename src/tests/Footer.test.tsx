import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../shared/components/layout/Footer';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import site from '../data/site.json';

describe('Footer developer badge', () => {
  it('links to the developer LinkedIn in a new tab with a lazy photo', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Footer />
        </MemoryRouter>
      </LanguageProvider>
    );

    const link = screen.getByRole('link', { name: 'Sharath Gowda G R on LinkedIn' });
    expect(link).toHaveAttribute('href', site.developer.linkedin);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link.querySelector('img')).toHaveAttribute('loading', 'lazy');
    // No text credit, only the tooltip on the badge itself
    expect(screen.queryByText(/Designed & Developed/i)).not.toBeInTheDocument();
  });
});
