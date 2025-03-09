'use client';
import { useGameStore } from '@/providers/game-store-provider';
import AlbumCover from './AlbumCover';
import Details from './Details/Details';
import GuessInput from './GuessInput';
import ScoreBar from './ScoreBar/ScoreBar';
import { useEffect, useState } from 'react';
import type { GameAlbum } from '@/types/album';
import Guesses from './Guesses';

type GameProps = {
  album: GameAlbum;
};

export default function Game({ album }: GameProps) {
  const storedAlbum = useGameStore(state => state.album);
  const updateAlbum = useGameStore(state => state.updateAlbum);
  const loseLife = useGameStore(state => state.loseLife);
  const addGuess = useGameStore(state => state.addGuess);
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
      alert('You won!');
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
      <ScoreBar />
      <div className="grid grid-cols-2 gap-6 items-center">
        <AlbumCover url={album.cover} />
        <Details />
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
          Unpixelate More (-20 pts)
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
          50/50 (-50 pts)
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full mt-6">
        <GuessInput onGuess={handleGuess} animateWrongAnswer={hasGivenWrongAnswer} />
        <Guesses />
      </div>
    </div>
  );
}
