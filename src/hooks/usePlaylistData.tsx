import { useState, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  genre: string;
}

export const usePlaylistData = () => {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist');
        const result = await response.json();

        setData(result);
        setCurrentlyPlaying(result[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load playlist');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, currentlyPlaying, error };
};
