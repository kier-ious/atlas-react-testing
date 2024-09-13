import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, expect, test, beforeEach } from "vitest";
import MusicPlayer from "../MusicPlayer";
import { usePlaylistData } from "../hooks/usePlaylistData";


vi.mock('../hooks/usePlaylistData', () => ({
  usePlaylistData: vi.fn(),
}));

beforeEach(() => {
  (vi.mocked(usePlaylistData)).mockReset();
});

describe('MusicPlayer component', () => {
  test('displays error when fetching fails', async () => {
    (vi.mocked(usePlaylistData)).mockReturnValueOnce({
      data: [],
      loading: false,
      error: 'Error fetching data!!!',
    });

    render(<MusicPlayer />);
    await waitFor(() => expect(screen.getByText(/Error fetching/i)).toBeInTheDocument());
  });

  test('fetch first track correctly', async () => {
    (vi.mocked(usePlaylistData) ).mockReturnValueOnce({
      data: [
        {
          "id": 1,
          "title": "Painted in Blue",
          "artist": "Soul Canvas",
          "genre": "Neo-Soul",
          "duration": "5:55",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn4.webp"
        },
        {
          "id": 2,
          "title": "Tidal Drift",
          "artist": "Echoes of the Sea",
          "genre": "Ambient",
          "duration": "8:02",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn6.webp"
        },
      ],
      loading: false,
      error: null,
    });

    render(<MusicPlayer />);
    await waitFor(() => expect(screen.getByText(/Painted in Blue/i)).toBeInTheDocument());
  });

  test('Updates song when new song is selected', async () => {
    (vi.mocked(usePlaylistData) ).mockReturnValueOnce({
      data: [
        {
          "id": 3,
          "title": "Fading Shadows",
          "artist": "The Emberlight",
          "genre": "Alternative Rock",
          "duration": "3:01",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn2.webp"
        },
        {
          "id": 4,
          "title": "Cosmic Drift",
          "artist": "Solar Flare",
          "genre": "Psychedelic Rock",
          "duration": "5:01",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn10.webp"
        },
      ],
      loading: false,
      error: null,
    });

    render(<MusicPlayer />);
    const trackElement = screen.getByText(/Fading Shadows/i);
    fireEvent.click(trackElement);
    await waitFor(() => expect(screen.getByText(/Fading Shadows/i)).toBeInTheDocument());
  });

  test('Plays next song when forward btn is clicked', async () => {
    (vi.mocked(usePlaylistData) ).mockReturnValueOnce({
      data: [
        {
          "id": 5,
          "title": "Urban Serenade",
          "artist": "Midnight Groove",
          "genre": "Jazz",
          "duration": "4:54",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn8.webp"
        },
        {
          "id": 6,
          "title": "Whispers in the Wind",
          "artist": "Rust & Ruin",
          "genre": "Folk",
          "duration": "6:13",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn3.webp"
        },
      ],
      loading: false,
      error: null,
    });

    render(<MusicPlayer />);
    const forwardBtn = screen.getByRole('button', { name: /Forward/i });
    fireEvent.click(forwardBtn);
    await waitFor(() => expect(screen.getByText(/Whispers in the Wind/i)).toBeInTheDocument());
  });

  test('Play/Pause toggles correctly', async () => {
    (vi.mocked(usePlaylistData) ).mockReturnValueOnce({
      data: [
        {
          "id": 7,
          "title": "Electric Fever",
          "artist": "Neon Jungle",
          "genre": "EDM",
          "duration": "8:41",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn5.webp"
        },
      ],
      loading: false,
      error: null,
    });

    render(<MusicPlayer />);
    const playBtn = screen.getByRole('button', { name: /Play/i });
    fireEvent.click(playBtn);
    await waitFor(() => expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument());
  });

  test('Shuffles correctly', async () => {
    (vi.mocked(usePlaylistData) ).mockReturnValueOnce({
      data: [
        {
          "id": 8,
          "title": "Edge of the Abyss",
          "artist": "Steel Horizon",
          "genre": "Metal",
          "duration": "2:27",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn9.webp"
        },
        {
          "id": 9,
          "title": "Golden Haze",
          "artist": "Velvet Waves",
          "genre": "Indie Pop",
          "duration": "3:15",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn7.webp"
        },
      ],
      loading: false,
      error: null,
    });

    render(<MusicPlayer />);
    const shuffleBtn = screen.getByRole('button', { name: /Shuffle/i});
    fireEvent.click(shuffleBtn);
    fireEvent.click(screen.getByRole('button', { name: /Forward/i }));
    await waitFor (() => expect(screen.queryByText(/Edge of the Abyss/i)).not.toBeInTheDocument());
  });
});
