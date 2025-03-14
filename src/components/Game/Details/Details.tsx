'use client';
import { useGameStore } from '@/providers/game-store-provider';
import Detail from './Detail';

const COST_ARTIST = 20;
const COST_YEAR = 5;
const CONST_GENRES = 5;

export default function Details() {
  const year = useGameStore(state => state.album?.year);
  const artist = useGameStore(state => state.album?.artist);
  const genres = useGameStore(state => state.album?.genres);
  const decreaseScore = useGameStore(state => state.decreaseScore);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-800 rounded-lg shadow-md">
      <Detail label="Arist" value={artist} cost={COST_ARTIST} onReveal={() => decreaseScore(COST_ARTIST)} />
      <Detail label="Year" value={year} cost={COST_YEAR} onReveal={() => decreaseScore(COST_YEAR)} />
      <Detail label="Genres" value={genres} cost={CONST_GENRES} onReveal={() => decreaseScore(CONST_GENRES)} />
    </div>
  );
}
