'use client';

import { useGameStore } from '@/providers/game-store-provider';
import { useEffect, useState } from 'react';

type FiftyFiftyProps = {
  onGuess: (answer: string) => void;
  correctTitle: string;
};

export default function FiftyFifty({ onGuess, correctTitle }: FiftyFiftyProps) {
  const alternativeTitle = useGameStore(state => state.alternativeTitle);
  const [shuffledTitles, setShuffledTitles] = useState<string[]>([]);

  // Shuffle the two titles when the component mounts or alternativeTitle changes
  useEffect(() => {
    if (alternativeTitle) {
      setShuffledTitles(
        [correctTitle, alternativeTitle].sort(() => Math.random() - 0.5),
      );
    }
  }, [correctTitle, alternativeTitle]);

  if (!alternativeTitle) return null; // Don't render if there's no alternative

  return (
    <div className="flex gap-4 justify-center mt-4">
      {shuffledTitles.map(title => (
        <button
          key={title}
          className="bg-primary hover:bg-primary/60 text-white px-8 py-4 rounded-xl text-lg font-bold cursor-pointer
          shadow-md transition-all transform hover:scale-105 active:scale-95"
          onClick={() => onGuess(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
