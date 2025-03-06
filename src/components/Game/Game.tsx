'use client';
import { useGameStore } from '@/providers/game-store-provider';
import AlbumCover from './AlbumCover';
import Details from './Details/Details';
import GuessInput from './GuessInput';
import ScoreBar from './ScoreBar';
import type { Album } from '@prisma/client';
import { useEffect } from 'react';

type GameProps = {
  album: Album;
};

export default function Game({ album }: GameProps) {
  const { album: storedAlbum, updateAlbum } = useGameStore(state => state);

  useEffect(() => {
    if (storedAlbum?.id !== album.id) {
      updateAlbum(album);
    }
  }, [album, storedAlbum, updateAlbum]);

  return (
    <div className="w-full max-w-4xl">
      <ScoreBar />
      <div className="grid grid-cols-2 gap-6 items-start">
        <AlbumCover url={album.cover} />
        <Details />
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
          Unpixelate More (-20 pts)
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
          50/50 (-50 pts)
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full mt-6">
        <GuessInput />
      </div>
    </div>
  );
}
