import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../shared/components/layout/Navbar';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';

const renderNavbar = (path = '/') =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter
        initialEntries={[path]}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Navbar', () => {
  it('marks the current page link as active', () => {
    renderNavbar('/team');

    expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Events' })).not.toHaveAttribute('aria-current');
  });

  it('opens the mobile panel and closes it when a link is tapped', () => {
    const { container } = renderNavbar();
    const panel = container.querySelector('#mobile-menu') as HTMLElement;
    const burger = screen.getByRole('button', { name: 'Toggle navigation menu' });

    expect(panel).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toHaveAttribute('aria-hidden', 'false');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(panel.querySelector('a[href="/events"]') as HTMLElement);
    expect(burger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes the mobile panel when tapping outside it', () => {
    const { container } = renderNavbar();
    const burger = screen.getByRole('button', { name: 'Toggle navigation menu' });

    fireEvent.click(burger);
    fireEvent.click(container.querySelector('.site-nav-backdrop') as HTMLElement);

    expect(burger).toHaveAttribute('aria-expanded', 'false');
  });
});
