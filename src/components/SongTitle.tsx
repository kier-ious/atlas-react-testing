import React from 'react';

interface SongTitleProps {
  title: string;
}

export const SongTitle: React.FC<SongTitleProps> = ({ title }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">Echos of the Sea</p>
    </div>
  );
};
