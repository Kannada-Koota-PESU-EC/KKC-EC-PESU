import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageMeta from '../shared/seo/PageMeta';
import NotFound from '../app/pages/NotFoundPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import pagesData from '../data/pages.json';

const renderAt = (path: string) =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PageMeta />
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>
  );

const meta = (selector: string) => document.head.querySelector<HTMLMetaElement>(selector)?.content;

describe('Page titles and link previews', () => {
  it('sets title, description, canonical and Open Graph tags per page', () => {
    renderAt('/events');

    expect(document.title).toBe(pagesData.pages['/events'].title);
    expect(meta('meta[name="description"]')).toBe(pagesData.pages['/events'].description);
    expect(meta('meta[property="og:title"]')).toBe(pagesData.pages['/events'].title);
    expect(meta('meta[property="og:url"]')).toBe('https://kannadakootaecc.in/events');
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://kannadakootaecc.in/events');
  });

  it('marks unknown pages as not found and noindex, with a way back home', () => {
    renderAt('/no-such-page');

    expect(document.title).toBe(pagesData.pages['404'].title);
    expect(meta('meta[name="robots"]')).toBe('noindex');
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(screen.getByText("Oops! This page wasn't found")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  });
});
