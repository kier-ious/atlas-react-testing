import { render, screen, userEvent, waitFor } from '@testing-library/react';
import { test, beforeEach, beforeAll, afterEach, expect } from 'vitest';
import MusicPlayer from '../MusicPlayer';
import { PlayControls } from '../components/PlayControls';
import { server, get } from '../mocks/mock';


beforeEach(() => {
  render(<MusicPlayer />);
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.close();
});


test('Fetches and displays the first track correctly(PASSING)', async () => {
  render(<MusicPlayer />);
  await waitFor(() => {
    const trackElements = screen.getAllByText(/Painted in Blue/i);
    expect(trackElements.length).toBeGreaterThan(0);
  });
});



test('Plays next song when forward button is clicked', async () => {
  render(<MusicPlayer />);
  await waitFor(() => expect(screen.getByText(/Tidal Drift/i)).toBeInTheDocument());
  const forwardButton = screen.getByRole('button', { name: /Forward/i });
  await userEvent.click(forwardButton);
  await waitFor(() => expect(screen.getByText(/Different Song/i)).toBeInTheDocument());
});



  test('displays loading state', async () => {
    server.use(
      get('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist', (req, res, ctx) => {
        return res(ctx.delay(200), ctx.json([]));
      })
    );
    render(<MusicPlayer />);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  });



  test('displays error state', async () => {
    server.use(
      get('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Failed to load playlist' }));
      })
    );
    render(<MusicPlayer />);
    expect(await screen.findByText(/Failed to load playlist/i)).toBeInTheDocument();
  });
