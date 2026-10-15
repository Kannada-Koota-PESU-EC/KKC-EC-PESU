import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from '../features/blogs/pages/BlogsPage';
import { LanguageProvider } from '../shared/i18n/LanguageProvider';
import { blogVideos, formatDuration } from '../features/blogs/data/blogs';

const renderBlogs = () =>
  render(
    <LanguageProvider initialLanguage="en">
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Blogs />
      </MemoryRouter>
    </LanguageProvider>
  );

describe('Blogs page', () => {
  beforeAll(() => {
    // jsdom has no media playback
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  });

  it('shows one card per video with no native controls', () => {
    const { container } = renderBlogs();

    expect(screen.getAllByRole('button', { name: /^Play:/ })).toHaveLength(blogVideos.length);
    container.querySelectorAll('video').forEach((video) => {
      expect(video).not.toHaveAttribute('controls');
      expect(video).toHaveAttribute('preload', 'metadata');
    });
  });

  it('opens the player and moves between videos', () => {
    renderBlogs();
    fireEvent.click(screen.getByRole('button', { name: `Play: ${blogVideos[0].title.en}` }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: blogVideos[0].title.en })).toBeInTheDocument();
    expect(dialog.querySelector('video')).not.toHaveAttribute('controls');
    expect(document.documentElement).toHaveAttribute('data-modal-open');

    fireEvent.click(within(dialog).getByRole('button', { name: 'Next video' }));
    expect(within(dialog).getByRole('heading', { name: blogVideos[1].title.en })).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('formats durations', () => {
    expect(formatDuration(5)).toBe('0:05');
    expect(formatDuration(72.4)).toBe('1:12');
  });
});
