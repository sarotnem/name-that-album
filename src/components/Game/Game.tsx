'use client';
import { useGameStore } from '@/providers/game-store-provider';
import AlbumCover from './AlbumCover';
import Details from './Details/Details';
import GuessInput from './GuessInput';
import ScoreBar from './ScoreBar/ScoreBar';
import { useEffect, useState } from 'react';
import type { GameAlbum } from '@/types';
import Guesses from './Guesses';
import HintsSection from './HintsSection/HintsSection';
import { useRouter } from 'next/navigation';
import FiftyFifty from './FiftyFifty';
import { isFuzzyMatch } from '@/utils/fuzzy-match';
import WinCelebration from './WinCelebration';
import { motion } from 'framer-motion';

type GameProps = {
  album: GameAlbum;
  alternativeTitle: string;
};

export default function Game({ album, alternativeTitle }: GameProps) {
  const storedAlbum = useGameStore(state => state.album);
  const updateAlbum = useGameStore(state => state.updateAlbum);
  const loseLife = useGameStore(state => state.loseLife);
  const loseAllLives = useGameStore(state => state.loseAllLives);
  const addGuess = useGameStore(state => state.addGuess);
  const gameStatus = useGameStore(state => state.gameStatus);
  const isPlaying = useGameStore(state => state.gameStatus === 'playing');
  const resetGame = useGameStore(state => state.resetGame);
  const hasUsed5050 = useGameStore(state => state.hasUsed5050);
  const [hasGivenWrongAnswer, setHasGivenWrongAnswer] = useState(false);

  useEffect(() => {
    if (storedAlbum?.id !== album.id) {
      updateAlbum(album, alternativeTitle);
    }
  }, [album, alternativeTitle, storedAlbum, updateAlbum]);

  const handleGuess = (answer: string): void => {
    if (!album.title) {
      return;
    }

    const isCorrect = isFuzzyMatch(answer, album.title);

    if (isCorrect) {
      addGuess({ value: answer, isCorrect: true });
      return;
    }

    addGuess({ value: answer, isCorrect: false });

    if (hasUsed5050) {
      loseAllLives();
      return;
    }

    loseLife();
    setHasGivenWrongAnswer(true);
    setTimeout(() => setHasGivenWrongAnswer(false), 500);
  };

  const router = useRouter();
  const handlePlayAgain = (): void => {
    resetGame();
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl"
    >
      { gameStatus === 'won' && <WinCelebration />}
      <ScoreBar />
      <div className="grid grid-cols-2 gap-6 items-center">
        <AlbumCover url={album.cover} />
        <Details />
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {isPlaying && (
          <div className="flex justify-center gap-4">
            <HintsSection />
          </div>
        )}
        <div className="flex flex-col items-center gap-4 w-full">
          {!isPlaying
            ? (
                <>
                  <h2 className="text-center text-6xl font-black animate-fadein">{storedAlbum?.title}</h2>
                  <button
                    className="mt-4 w-50 bg-secondary text-white px-6 py-3 rounded-lg text-lg font-semibold transition cursor-pointer hover:bg-secondary/80"
                    onClick={() => handlePlayAgain()}
                  >
                    Play Again
                  </button>
                </>
              )
            : (
                !hasUsed5050
                  ? <GuessInput onGuess={handleGuess} animateWrongAnswer={hasGivenWrongAnswer} />
                  : <FiftyFifty onGuess={handleGuess} correctTitle={storedAlbum?.title || ''} />
              )}
          <Guesses />
        </div>
      </div>
    </motion.div>
  );
}
