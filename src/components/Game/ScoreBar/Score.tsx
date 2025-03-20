'use client';
import { useGameStore } from '@/providers/game-store-provider';
import { useState, useEffect } from 'react';

export default function Score() {
  const score = useGameStore(state => state.score);
  const [animatedScore, setAnimatedScore] = useState(score);

  useEffect(() => {
    if (score === animatedScore) return;

    if (score > animatedScore) {
      setAnimatedScore(score);
      return;
    }

    const step = Math.max(1, Math.abs(score - animatedScore) / 20);
    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        const newScore = Math.max(prev - step, score);
        return newScore === score ? (clearInterval(interval), newScore) : newScore;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [score, animatedScore]);

  return (
    <div>
      <span className="text-xs text-white/30">Score</span>
      <div className="text-white">
        <span className="text-4xl font-extrabold text-accent transition-all">
          {Math.round(animatedScore)}
        </span>
        <span className="text-sm text-white/70 ml-1">/ 100</span>
      </div>
    </div>
  );
}
