import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Team from '../features/team/pages/TeamPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { getInitials, respectedMembers } from '../features/team/data/respectedMembers';

const renderTeam = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Team />
      </MemoryRouter>
    </LanguageProvider>
  );

const respectedNames = () =>
  within(screen.getByRole('region', { name: 'ನಮ್ಮ ಗೌರವಾನ್ವಿತರು' }))
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent);

describe('Respected Members', () => {
  it('shows all five in order above the year selector', () => {
    renderTeam();

    expect(respectedNames()).toEqual(respectedMembers.map((member) => member.name));
    expect(screen.getByText('ಸವಿ ನೆನಪು')).toBeInTheDocument();

    const block = screen.getByRole('region', { name: 'ನಮ್ಮ ಗೌರವಾನ್ವಿತರು' });
    const yearLabel = screen.getByText('Batch of:');
    expect(block.compareDocumentPosition(yearLabel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('stays the same when the selected year changes', () => {
    renderTeam();
    const before = respectedNames();

    fireEvent.click(screen.getByRole('button', { name: '2025' }));

    expect(respectedNames()).toEqual(before);
  });

  it('builds initials for the placeholder', () => {
    expect(getInitials('Dr. M. R. Doreswamy')).toBe('MD');
    expect(getInitials('Lakshmi Satya Vani Narayanam')).toBe('LN');
  });
});

describe('Developer team card', () => {
  it('marks only the developer card, with a portfolio chip and screen-reader note', () => {
    const { container } = renderTeam();
    fireEvent.click(screen.getByRole('button', { name: '2025' }));

    const devCards = container.querySelectorAll('.team-card-dev');
    expect(devCards).toHaveLength(1);

    const chip = within(devCards[0] as HTMLElement).getByRole('link', { name: "View Sharath Gowda G R's portfolio" });
    expect(chip).toHaveAttribute('href', 'https://sharath-gr.vercel.app/');
    expect(chip).toHaveAttribute('target', '_blank');
    expect(chip).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(devCards[0] as HTMLElement).getByRole('heading', { level: 3 })).toHaveTextContent('(Website developer)');
    // Social links still there
    expect(within(devCards[0] as HTMLElement).getAllByRole('link').length).toBeGreaterThan(1);
  });
});
