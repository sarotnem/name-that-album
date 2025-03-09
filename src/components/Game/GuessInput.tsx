'use client';
import { useState } from 'react';

type GuessInputProps = {
  onGuess: (answer: string) => void;
  animateWrongAnswer: boolean;
};

export default function GuessInput({ onGuess, animateWrongAnswer }: GuessInputProps) {
  const [answer, setAnswer] = useState('');

  const handleGuess = () => {
    onGuess(answer);
    setAnswer('');
  };

  return (
    <>
      <input
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={e => answer.length && e.key === 'Enter' && handleGuess()}
        type="text"
        placeholder="Guess the album..."
        className={`
          w-full p-3 text-lg rounded-md border border-gray-700 outline-none text-white
          ${animateWrongAnswer ? 'animate-shake bg-red-900/40 border-red-500 border-2' : ''}
          `}
      />
      <button
        className="
          bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold transition w-full cursor-pointer
          hover:bg-secondary disabled:bg-primary/20
        disabled:text-white/20 disabled:cursor-not-allowed
        "
        onClick={() => handleGuess()}
        disabled={!answer.length}
      >
        Guess!
      </button>
    </>
  );
}
