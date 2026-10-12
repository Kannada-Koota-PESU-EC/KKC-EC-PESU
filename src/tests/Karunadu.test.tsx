import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../features/karunadu/pages/HomePage';
import TeamPage from '../features/karunadu/pages/TeamPage';
import { JOURNEY } from '../features/karunadu/data/journey';

const renderInRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{ui}</MemoryRouter>);

describe('Karunadu redesign', () => {
  it('keeps the original home page text', () => {
    renderInRouter(<HomePage />);

    expect(screen.getByText('Learn More About Us')).toBeInTheDocument();
    expect(
      screen.getByText('Celebrating Kannada culture, language, and traditions at PES University Electronic City Campus')
    ).toBeInTheDocument();
    expect(screen.getByText('Active Members')).toBeInTheDocument();
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
  });

  it('lists every stop of the 3D journey and offers to open it', () => {
    renderInRouter(<HomePage />);

    JOURNEY.forEach((s) => {
      expect(screen.getAllByText(s.kn).length).toBeGreaterThan(0);
    });
    expect(screen.getByRole('button', { name: 'Fly across Karnataka in 3D' })).toBeInTheDocument();
  });

  it('team page keeps the original headings', () => {
    renderInRouter(<TeamPage />);

    expect(screen.getByText('Batch of:')).toBeInTheDocument();
    expect(screen.getByText('Club Heads')).toBeInTheDocument();
    expect(screen.getByText('Interested in Joining Our Team?')).toBeInTheDocument();
  });
});
