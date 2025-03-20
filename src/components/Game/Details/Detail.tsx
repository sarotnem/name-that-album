'use client';
import { useEffect, useState } from 'react';
import DetailValue from './DetailValue';
import { useGameStore } from '@/providers/game-store-provider';

type DetailProps = {
  label: string;
  value?: string | string[] | number;
  cost: number;
  onReveal?: () => void; // Optional callback for handling point deduction
};

export default function Detail({ label, value, cost, onReveal }: DetailProps) {
  const gameStatus = useGameStore(state => state.gameStatus);
  const isPlaying = gameStatus === 'playing';
  const hasEnded = gameStatus === 'won' || gameStatus === 'lost';
  const [isRevealed, setIsRevealed] = useState(false);

  // Hide detail when game is reset
  useEffect(() => {
    if (isPlaying) {
      setIsRevealed(false);
    }
  }, [isPlaying]);

  // Reveal detail when game ended
  useEffect(() => {
    if (hasEnded) {
      setIsRevealed(true);
    }
  }, [hasEnded]);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      if (onReveal) onReveal();
    }
  };

  return (
    <div className="flex flex-col text-center bg-slate-700 rounded-lg px-4 py-3 shadow-md">
      <span className="text-xs text-white/85 font-medium tracking-wide">
        {label}
      </span>

      {isRevealed
        ? <DetailValue value={value} />
        : (
            <button
              className="w-full px-3 py-2 mt-2 rounded-md bg-slate-800 text-white font-medium text-sm hover:bg-slate-900 transition cursor-pointer"
              onClick={handleReveal}
            >
              Click to reveal
              <span className="text-xs text-white/65 ml-2">
                {cost && `(-${cost} pts)`}
              </span>
            </button>
          )}
    </div>
  );
}
