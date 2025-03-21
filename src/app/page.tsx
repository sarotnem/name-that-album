'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-900 text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-radial-spotlight pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-accent text-center relative"
      >
        <span className="relative z-10">Name That Album</span>
        <span className="absolute inset-0 blur-[22px] opacity-10 bg-accent"></span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 text-white/80 text-center max-w-lg text-lg leading-relaxed"
      >
        Pixel by pixel.
        <br />
        Cover by cover.
        <br />
        Can you name them all?
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-8 py-4 rounded-2xl shadow-xl ring-1 ring-white/10 transition cursor-pointer
                   bg-gradient-to-br from-primary to-primary/80 hover:from-primary/80 hover:to-primary/60
                   text-white font-bold text-lg relative overflow-hidden"
        onClick={() => router.push('/game')}
      >
        Start Game
      </motion.button>
    </div>
  );
}
