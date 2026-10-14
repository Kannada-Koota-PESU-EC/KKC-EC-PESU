import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import IntroSplash from '../features/intro/components/IntroSplash';
import { INTRO_SEEN_KEY, introTimings, logosText, tribute } from '../features/intro/data/intro';

// jsdom never loads images, so the intro starts after maxPreloadWait
const startIntro = async () => {
  await act(async () => {
    jest.advanceTimersByTime(introTimings.maxPreloadWait);
  });
};

const advance = (ms: number) =>
  act(() => {
    jest.advanceTimersByTime(ms);
  });

describe('IntroSplash', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('plays tribute, then logos, then removes itself and unlocks scrolling', async () => {
    render(<IntroSplash />);
    expect(document.body.style.overflow).toBe('hidden');

    await startIntro();
    expect(screen.getByText(tribute.name)).toBeInTheDocument();
    expect(screen.getByText(tribute.messageKannada)).toBeInTheDocument();

    advance(introTimings.tribute);
    advance(introTimings.transition);
    expect(screen.queryByText(tribute.name)).not.toBeInTheDocument();
    expect(screen.getByAltText('PES University')).toBeInTheDocument();
    expect(screen.getByText(logosText.line1)).toBeInTheDocument();
    expect(screen.getByText(logosText.line2)).toBeInTheDocument();
    expect(screen.queryByText('PESU KKC EC')).not.toBeInTheDocument();

    advance(introTimings.logos);
    advance(introTimings.reveal);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(window.sessionStorage.getItem(INTRO_SEEN_KEY)).toBe('1');
  });

  it('skip button ends the intro', async () => {
    render(<IntroSplash />);
    await startIntro();

    fireEvent.click(screen.getByRole('button', { name: 'Skip' }));
    advance(introTimings.reveal);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('does not play again in the same session', () => {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    render(<IntroSplash />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
