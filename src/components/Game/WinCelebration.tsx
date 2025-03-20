'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['🎉', '🎊', '🥳', '🎶', '🔥', '🚀', '🎷', '💃', '🎸', '🎤', '🎵', '🎈'];

export default function WinCelebration() {
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number; y: number; rotate: number }[]>([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1600,
      rotate: Math.random() * 720,
    }));
    setEmojis(newEmojis);

    const cleanup = setTimeout(() => setEmojis([]), 2500);
    return () => clearTimeout(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {emojis.map(({ id, emoji, x, y, rotate }) => (
          <motion.span
            key={id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 0, x, y, scale: 2, rotate }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute text-5xl"
          >
            {emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
