import { useState, useEffect } from 'react';


interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

export const usePlaylistData = () => {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);

  useEffect(() => {
    // This fetches current song playing from API and mounts component
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist');
        const fetchedData: Song[] = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(fetchedData);

        if (fetchedData.length > 0) {
          setCurrentlyPlaying(fetchedData[0]);
          setLoading(true);
        } else {
          setLoading(false);
          setCurrentlyPlaying(null);
        }
      } catch (error) {
        console.error('Error fetching the playlist:', error);
          setLoading(false);
          setCurrentlyPlaying(null);
      }
    };

    fetchPlaylist();
  }, []);

  return { data, loading, currentlyPlaying };
};
