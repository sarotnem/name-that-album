'use client';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/providers/game-store-provider';

export default function ScoreBar() {
  const score = useGameStore(state => state.score);
  const [animatedScore, setAnimatedScore] = useState(score);

  useEffect(() => {
    if (score !== animatedScore) {
      // How much to decrease per interval
      const step = Math.abs(score - animatedScore) / 20;
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev > score) return Math.max(prev - step, score);
          return prev;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [score, animatedScore]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-6">
      <div>
        <span className="text-xs text-white/30">Score</span>
        <div className="text-white">
          <span
            className="text-4xl font-extrabold text-accent transition-all"
          >
            {Math.round(animatedScore)}
          </span>
          <span className="text-sm text-white/70 ml-1">/ 100</span>
        </div>
      </div>

      <div>
        <span className="text-xs text-white/30">Lives</span>
        <div className="text-xl font-bold text-secondary flex gap-2">
          ❤️ ❤️ 🤍
        </div>
      </div>
    </div>
  );
}
