import { useState, useEffect } from 'react';
import { Song } from '../components/MusicPlayer';


export function usePlaylistData(): {
  data: Song[];
  loading: boolean;
  currentlyPlaying: Song | null;
  error: string | null;
} {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentlyPlaying] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const songs: Song[] = await res.json();
        setData(songs);
      } catch (error) {
        setError('Failed to load playlist');
        console.error('Failed to load playlist', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, currentlyPlaying, error };
};
