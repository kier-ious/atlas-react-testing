import React from 'react';


interface PlayListItemProps {
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
  bgColor?: string;
  onClick: () => void;
}


export const PlayListItem: React.FC<PlayListItemProps> = ({ title, artist, duration, isPlaying, onClick }) => {
  return (
    <li
      className={`flex justify-between ${isPlaying ? 'bg-gray-200' : 'bg-white'}bg-secondary rounded-lg cursor-pointer`}
      onClick={onClick}
    >
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{artist}</p>
      </div>
        <p className="text-sm text-gray-500">{duration}</p>
    </li>
  );
};
