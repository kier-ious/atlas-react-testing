import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, beforeEach, beforeAll, afterEach, expect } from 'vitest';
import MusicPlayer from '../components/MusicPlayer';
import { server } from '../mocks/mock';
import { describe } from 'node:test';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.restoreHandlers();
});

beforeEach(() => {
  render(<MusicPlayer />);
});

describe('MP component', () => {
  test('Fetches and displays the first track correctly (PASSING)', async () => {
    await waitFor(() => {
      const trackElements = screen.getAllByText(/Painted in Blue/i);
      expect(trackElements.length).toBeGreaterThan(0);
    });
  });



  test('Plays next song when forward button is clicked', async () => {
    await waitFor(() => expect(screen.getByText(/Tidal Drift/i)).toBeInTheDocument());
    const forwardButtons = screen.queryAllByTestId('forward-button');
    expect(forwardButtons.length).toBeGreaterThan(0);
    fireEvent.click(forwardButtons[0]);
    await waitFor(() => expect(screen.getByText((content) => content.includes('Different Song'))).toBeInTheDocument());
  });



  test('Displays loading state', async () => {
    server.use(
      get('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist', (req, res, ctx) => {
        return res(ctx.delay(200), ctx.json([]));
      })
    );
    render(<MusicPlayer />);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  });



  test('Displays error state', async () => {
    server.use(
      get('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Failed to load playlist' }));
      })
    );
    render(<MusicPlayer />);
    expect(await screen.findByText(/Failed to load playlist/i)).toBeInTheDocument();
  });
})
