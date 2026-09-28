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

  it('renders a single Apply Now call to action', () => {
    render(<Recruitment />);

    const applyButtons = screen.getAllByText('Apply Now');
    expect(applyButtons).toHaveLength(1);

    if (!isRecruitmentFormAvailable) {
      expect(screen.getByRole('button', { name: /apply now/i })).toBeDisabled();
    } else {
      expect(screen.getByRole('link', { name: /apply now/i })).toHaveAttribute('target', '_blank');
    }
  });
});
