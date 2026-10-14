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
