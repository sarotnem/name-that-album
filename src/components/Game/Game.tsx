'use client';
export const dynamic = 'force-dynamic';
import { useGameStore } from '@/providers/game-store-provider';
import AlbumCover from './AlbumCover';
import Details from './Details/Details';
import GuessInput from './GuessInput';
import ScoreBar from './ScoreBar/ScoreBar';
import { useEffect } from 'react';
import type { GameAlbum } from '@/types/album';

type GameProps = {
  album: GameAlbum;
};

export default function Game({ album }: GameProps) {
  const storedAlbum = useGameStore(state => state.album);
  const updateAlbum = useGameStore(state => state.updateAlbum);
  // TODO: Remove when guessing is implemented
  const loseLife = useGameStore(state => state.loseLife);

  useEffect(() => {
    if (storedAlbum?.id !== album.id) {
      updateAlbum(album);
    }
  }, [album, storedAlbum, updateAlbum]);

  return (
    <div className="w-full max-w-4xl">
      <button className="bg-amber-500 hover:bg-amber-400 cursor-pointer rounded-2xl p-2 text-black" onClick={() => loseLife()}>Lose Life (remove)</button>
      <ScoreBar />
      <div className="grid grid-cols-2 gap-6 items-center">
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
