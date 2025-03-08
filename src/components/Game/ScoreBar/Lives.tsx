'use client';
import { GAME_CONFIG } from '@/lib/config';
import { useGameStore } from '@/providers/game-store-provider';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

export default function Lives() {
  const lives = useGameStore(state => state.lives);
  const previousLives = useRef(lives);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (lives < previousLives.current) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);

      return () => clearTimeout(timeout);
    }

    previousLives.current = lives;
  }, [lives]);

  return (
    <div>
      <span className="text-xs text-white/30">Lives</span>
      <div className={`text-xl font-bold text-secondary flex gap-2 ${animate ? 'animate-shake' : ''}`}>
        {Array.from({ length: GAME_CONFIG.MAX_LIVES }, (_, i) => (
          i < lives
            ? (
                <IconHeartFilled key={`heart_${i}`} size={32} className="text-accent" />
              )
            : (
                <IconHeart key={`heart_${i}`} size={32} className="text-accent" />
              )
        ))}
      </div>
    </div>
  );
}
