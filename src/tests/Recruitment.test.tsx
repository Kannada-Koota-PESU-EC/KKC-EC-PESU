import React from 'react';
import { render, screen } from '@testing-library/react';
import Recruitment from '../features/Recruitment/Recruitment';
import {
  isRecruitmentFormAvailable,
  recruitmentDomains,
} from '../features/Recruitment/data/recruitment';

describe('Recruitment Page', () => {
  it('renders all 12 recruitment domains', () => {
    render(<Recruitment />);

    expect(recruitmentDomains).toHaveLength(12);
    expect(screen.getAllByTestId('recruitment-domain')).toHaveLength(12);
    recruitmentDomains.forEach((domain) => {
      expect(screen.getByRole('heading', { name: domain.name })).toBeInTheDocument();
    });
  });

  it('renders the Register Now buttons', () => {
    render(<Recruitment />);

    // One in the header (scrolls to the form section) and one in the form section
    expect(screen.getAllByText('Register Now')).toHaveLength(2);

    if (!isRecruitmentFormAvailable) {
      const disabled = screen
        .getAllByRole('button', { name: /register now/i })
        .filter((button) => (button as HTMLButtonElement).disabled);
      expect(disabled).toHaveLength(1);
    } else {
      expect(screen.getByRole('link', { name: /register now/i })).toHaveAttribute('target', '_blank');
    }
  });
});
