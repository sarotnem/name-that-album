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

type GameProps = {
  album: GameAlbum;
};

export default function Game({ album }: GameProps) {
  const storedAlbum = useGameStore(state => state.album);
  const updateAlbum = useGameStore(state => state.updateAlbum);
  const loseLife = useGameStore(state => state.loseLife);
  const addGuess = useGameStore(state => state.addGuess);
  const gameStatus = useGameStore(state => state.gameStatus);
  const isPlaying = useGameStore(state => state.gameStatus === 'playing');
  const resetGame = useGameStore(state => state.resetGame);
  const [hasGivenWrongAnswer, setHasGivenWrongAnswer] = useState(false);

  useEffect(() => {
    if (storedAlbum?.id !== album.id) {
      updateAlbum(album);
    }
  }, [album, storedAlbum, updateAlbum]);

  const handleGuess = (answer: string): void => {
    if (!album.title) {
      return;
    }

    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedTitle = album.title.toLowerCase().trim();

    if (normalizedAnswer.localeCompare(normalizedTitle) === 0) {
      addGuess({ value: answer, isCorrect: true });
      return;
    }

    loseLife();
    addGuess({ value: answer, isCorrect: false });
    setHasGivenWrongAnswer(true);
    setTimeout(() => setHasGivenWrongAnswer(false), 500);
  };

  return (
    <div className="w-full max-w-5xl">
      Album:
      {' '}
      {storedAlbum?.title}
      <br />
      Status:
      {' '}
      { gameStatus }
      <br />
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
                    onClick={() => alert('not implemented')}
                  >
                    Play Again
                  </button>
                </>
              )
            : (
                <GuessInput onGuess={handleGuess} animateWrongAnswer={hasGivenWrongAnswer} />
              )}
          <Guesses />
        </div>
      </div>
    </div>
  );
}
