import { GAME_CONFIG } from '@/lib/config';
import type { GameStatus, GameAlbum, Guess } from '@/types';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  album: GameAlbum | null;
  alternativeTitle: string | null;
  score: number;
  lives: number;
  guesses: Guess[];
  pixelation: number;
  gameStatus: GameStatus;
  hasUsed5050: boolean;
};

export type GameActions = {
  updateAlbum: (album: GameAlbum, alternativeTitle: string) => void;
  decreaseScore: (amount: number) => void;
  loseLife: () => void;
  loseAllLives: () => void;
  addGuess: (guess: Guess) => void;
  updatePixelation: (value: number) => void;
  resetGame: () => void;
  updateHasUsed5050: (value: boolean) => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  album: null,
  alternativeTitle: null,
  score: 100,
  lives: GAME_CONFIG.MAX_LIVES,
  guesses: [],
  pixelation: GAME_CONFIG.INIT_PIXELATION,
  gameStatus: 'playing',
  hasUsed5050: false,
};

export const createGameStore = (
  initState: GameState = defaultInitState,
) => {
  return createStore<GameStore>()(
    devtools(
      set => ({
        ...initState,
        // Update the current album playing
        updateAlbum: (album, alternativeTitle) => set(() => ({ album, alternativeTitle }), false, 'updateAlbum'),
        // Decrease the score by the passed amount
        decreaseScore: amount => set(state => ({ score: state.score - amount }), false, 'decreaseScore'),
        // Decrease the available lives by 1
        loseLife: () => set((state) => {
          const newLives = state.lives - 1;
          return {
            lives: state.lives - 1,
            gameStatus: newLives === 0 ? 'lost' : state.gameStatus,
            score: newLives === 0 ? 0 : state.score,
          };
        }, false, 'loseLife'),
        // Lose all lives and end the game
        loseAllLives: () => set(() => ({ lives: 0, gameStatus: 'lost', score: 0 }), false, 'loseAllLives'),
        // Add a guess to the list
        addGuess: guess => set(state => ({
          guesses: [...state.guesses, guess],
          gameStatus: guess.isCorrect ? 'won' : state.gameStatus,
        }), false, 'addGuess'),
        // Update the pixelation value of the album
        updatePixelation: value => set(() => ({ pixelation: value }), false, 'updatePixelation'),
        // Resets the game
        resetGame: () => set(() => ({ ...defaultInitState }), false, 'resetGame'),
        // Updates the 50/50 state
        updateHasUsed5050: value => set(() => ({ hasUsed5050: value }), false, 'updateHasUsed5050'),
      }),
      { name: 'GameStore' },
    ),
  );
};
