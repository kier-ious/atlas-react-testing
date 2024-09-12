import { FC, useState } from 'react';
import { CoverArt } from './CoverArt';
import { PlayControls } from './PlayControls';
import { VolumeControl } from './VolumeControl';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface CurrentlyPlayingProps {
  currentSong: Song | null;
  onBack: () => void;
  onForward: () => void;
  speed: number;
  onSpeedChange: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onShuffle?: () => void;
  shuffle: boolean;
}

  export const CurrentlyPlaying: FC<CurrentlyPlayingProps> = ({
    currentSong,
    onBack,
    onForward,
    speed,
    onSpeedChange,
    isPlaying,
    onPlayPause,
    onShuffle,
    shuffle
  }) => {
    const [volume, setVolume] = useState(50);

    if (!currentSong) {
      return <div className="font-primary text-2xl font-bold mb-4">Loading...</div>;
    }

  return (
    <div className="flex flex-col items-center p-4 rounded-lg space-y-4">
      <div className="flex flex-col items-start p-4 rounded-lg space-y-4">
        <div className="flex flex-col items-center w-full space-y-2">
          <CoverArt cover={currentSong.cover}/>
            <div className="w-full text-left">
              <h3 className="font-primary text-lg font-semibold">{currentSong.title}</h3>
                <p className="text-sm text-gray-500">{currentSong.artist}</p>
            </div>
          </div>

          {/* PlayControls */}
          <div className="flex justify-center w-full">
            {onShuffle && (
              <PlayControls
                onBack={onBack}
                onForward={onForward}
                speed={speed}
                onSpeedChange={onSpeedChange}
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
                onShuffle={onShuffle}
                shuffle={shuffle}
            />
            )}
          </div>

          {/* VolumeControls */}
          <div className="flex justify-center w-full">
            <VolumeControl
              volume={volume}
              onVolumeChange={(newVolume) => setVolume(newVolume)} />
          </div>
      </div>
    </div>
  );
};
