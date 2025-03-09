import { useGameStore } from '@/providers/game-store-provider';

export default function Guesses() {
  const guesses = useGameStore(state => state.guesses);

  return (
    <div className="mt-4 text-center">
      <div className="mt-2 flex flex-wrap gap-2 justify-center items-center">
        <span className="text-xs text-white/20">
          { guesses.length ? 'You guessed:' : 'Your guesses will be shown here'}
        </span>
        {guesses.map((guess, index) => (
          <span
            key={`wrong_guess_${index}`}
            className={`
                inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ring-1 ring-inset 
                ${guess.isCorrect ? 'bg-green-800 text-green-200 ring-green-500/30' : 'bg-red-800 text-red-200 ring-red-500/30'}
              `}
          >
            {guess.value}
          </span>
        ))}
      </div>
    </div>
  );
}
