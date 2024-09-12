import React from 'react';
import { PlayListItem } from './PlayListItem';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

interface PlayListProps {
  currentlyPlaying: string | null;
  onSongSelect: (title: string) => void;
  playlist: Song[];
}

export const Playlist: React.FC<PlayListProps> = ({ currentlyPlaying, onSongSelect, playlist }) => {
  return (
    <div className="bg-secondary w-full p-6 mx-auto max-w-screen-md rounded-lg shadow-md border border-accent">
      <h1 className="font-primary text-2xl font-bold mb-4">Playlist</h1>
        <ul className="bg-secondary space-y-0">
            {playlist.map((song) => (
              <PlayListItem
                key={song.id}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                isPlaying={song.id === parseInt(currentlyPlaying || '0', 10)}

                bgColor={song.id === parseInt(currentlyPlaying || '0', 10) ? "bgColor" : ""}
                onClick={() => onSongSelect(song.title)}
              />
            ))}
        </ul>
    </div>
  );
};
