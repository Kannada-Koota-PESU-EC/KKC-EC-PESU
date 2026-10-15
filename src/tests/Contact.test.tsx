import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../features/contact/pages/ContactPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { isValidEmail } from '../features/contact/data/contact';

const renderContact = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Contact />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Contact page', () => {
  it('shows contact tiles with mailto, Instagram and Maps links', () => {
    renderContact();

    expect(screen.getByRole('link', { name: /kannadakoota\.ecc@pes\.edu/ })).toHaveAttribute('href', 'mailto:kannadakoota.ecc@pes.edu');
    expect(screen.getByRole('link', { name: /@kannadakoota_ecc/ })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /Electronic City Campus/ })).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
    expect(screen.getByTitle('Map of PES University Electronic City Campus')).toHaveAttribute('loading', 'lazy');
  });

  it('shows friendly errors for missing or invalid fields', () => {
    renderContact();
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    expect(screen.getByText('Please write your message')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('sends a valid message (opens the email app when no endpoint is set)', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Asha' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'asha@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByText('Your email app has opened. Press Send there to deliver your message.')).toBeInTheDocument();
  });

  it('validates email addresses', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
  });
});
