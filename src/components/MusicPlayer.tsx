import { useState, useEffect } from 'react';
import { CurrentlyPlaying } from './CurrentlyPlaying';
import { Playlist } from './Playlist';
import { usePlaylistData } from '../hooks/usePlaylistData';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export default function MusicPlayer() {
  const { data = [], loading, currentlyPlaying: currentPlaying, error } = usePlaylistData();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);
  const [, setCurrentSongIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const playlist = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (currentPlaying) {
      setCurrentlyPlaying(currentPlaying);
      setCurrentSongIndex(playlist.findIndex(song => song.id === currentPlaying.id));
    }
  }, [currentPlaying, playlist]);

  const handleSongSelect = (title: string) => {
    const selectedSong = playlist.find(song => song.title === title) || null;
    if (selectedSong) {
      setCurrentlyPlaying(selectedSong);
      setCurrentSongIndex(playlist.indexOf(selectedSong));
    }
  };

  const handleBack = () => {
    setCurrentSongIndex(prevIndex => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setCurrentlyPlaying(playlist[newIndex] || null);
      return newIndex;
    });
  };

  const handleForward = () => {
    setCurrentSongIndex(prevIndex => {
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        setCurrentlyPlaying(playlist[randomIndex]);
        return randomIndex;
      } else {
        const newIndex = Math.min(prevIndex + 1, playlist.length - 1);
        setCurrentlyPlaying(playlist[newIndex] || null);
        return newIndex;
      }
    });
  };

  const handleSpeedChange = () => {
    setSpeed(prevSpeed => (prevSpeed === 3 ? 1 : prevSpeed + 1));
  };

  const handlePlayPause = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const handleShuffle = () => {
    setShuffle(prevShuffle => !prevShuffle);
  };

  if (loading) return <div className="font-primary text-2xl font-bold mb-4">Loading...</div>;
  if (error) return <div className="font-primary text-2xl font-bold mb-4 text-red-600">{error}</div>;
  if (playlist.length === 0) return <div className="font-primary text-2xl font-bold mb-4">No songs available</div>;
  if (!currentlyPlaying) return <div className="font-primary text-2xl font-bold mb-4">No song is currently playing</div>;

  return (
    <div className="bg-primary p-6 rounded-lg w-full max-w-screen-md mx-auto shadow-md border-gray-300 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-1/2">
        <CurrentlyPlaying
          currentSong={currentlyPlaying}
          onBack={handleBack}
          onForward={handleForward}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onShuffle={handleShuffle}
          shuffle={shuffle}
        />
      </div>
      <div className="w-full md:w-1/2">
        <Playlist
          currentlyPlaying={String(currentlyPlaying.id)}
          onSongSelect={handleSongSelect}
          playlist={playlist}
        />
      </div>
    </div>
  );
}
