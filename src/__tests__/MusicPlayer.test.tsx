// MusicPlayer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { test, afterAll, afterEach, beforeAll, expect, describe } from 'vitest';
import MusicPlayer from '../MusicPlayer';
import { server } from '../mocks/mock';
import { http } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('MusicPlayer component', () => {
  test('fetches and displays the first track correctly', async () => {
    render(<MusicPlayer />);
    expect(await screen.findByText(/Painted in Blue/i)).toBeInTheDocument();
  });

  test('plays next song when forward button is clicked', async () => {
    render(<MusicPlayer />);
    const forwardButton = screen.getByLabelText(/forward/i);

    fireEvent.click(forwardButton);

    expect(await screen.findByText(/Tidal Drift/i)).toBeInTheDocument();
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
});
function get(arg0: string, arg1: (req: any, res: any, ctx: any) => any): import("node_modules/msw/lib/core/HttpResponse-DE19n76Q").R<import("node_modules/msw/lib/core/HttpResponse-DE19n76Q").g, any, any, import("node_modules/msw/lib/core/HttpResponse-DE19n76Q").c> {
  throw new Error('Function not implemented.');
}
