import { useState, useEffect } from 'react';
import { CurrentlyPlaying } from './components/CurrentlyPlaying';
import { Playlist } from './components/Playlist';
import { usePlaylistData } from './hooks/usePlaylistData';


interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export default function MusicPlayer() {
  const { data: playlist, loading } = usePlaylistData();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (playlist.length > 0) {
      setCurrentlyPlaying({...playlist[0], duration: ''});
    }
  }, [playlist]);

  const handleSongSelect = (title: string) => {
    const selectedSong = playlist.find(song => song.title === title) || null;
    setCurrentlyPlaying(selectedSong);
    setCurrentSongIndex(playlist.indexOf(selectedSong as Song));
  };

  const handleBack = () => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
      setCurrentlyPlaying(playlist[newIndex] || null);
      return newIndex;
    });
  };

  const handleForward = () => {
    setCurrentSongIndex((prevIndex) => {
      if (shuffle) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        setCurrentlyPlaying(playlist[randomIndex]);
        return randomIndex;
      } else {
        const newIndex = prevIndex < playlist.length - 1 ? prevIndex + 1 : playlist.length - 1;
        setCurrentlyPlaying(playlist[newIndex] || null);
        return newIndex;
      }
    });
  };

  const handleSpeedChange = () => {
    setSpeed(prevSpeed => (prevSpeed === 1 ? 2 : prevSpeed === 2 ? 3 : 1));
  };

  const handlePlayPause = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const handleShuffle = () => {
    setShuffle(prevShuffle => !prevShuffle);
  };

  if (!currentlyPlaying) {
    return <div className="font-primary text-2xl font-bold mb-4">Loading...</div>;
  }


  return (
    <div className="bg-primary p-6 rounded-lg w-full max-w-screen-md mx-auto shadow-md
                    border-gray-300 flex flex-col md:flex-row items-center
                    md:items-start space-y-6 md:space-y-0 md:space-x-6">
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
          currentlyPlaying={String(currentlyPlaying?.id || 0)}
          onSongSelect={handleSongSelect}
          playlist={playlist}
        />
      </div>

    </div>
  );
};
