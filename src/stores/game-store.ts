import { GAME_CONFIG } from '@/lib/config';
import type { GameStatus, GameAlbum, Guess } from '@/types';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  album: GameAlbum | null;
  score: number;
  lives: number;
  guesses: Guess[];
  pixelation: number;
  gameStatus: GameStatus;
};

export type GameActions = {
  updateAlbum: (album: GameAlbum) => void;
  decreaseScore: (amount: number) => void;
  loseLife: () => void;
  addGuess: (guess: Guess) => void;
  updatePixelation: (value: number) => void;
  resetGame: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  album: null,
  score: 100,
  lives: GAME_CONFIG.MAX_LIVES,
  guesses: [],
  pixelation: GAME_CONFIG.INIT_PIXELATION,
  gameStatus: 'playing',
};

export const createGameStore = (
  initState: GameState = defaultInitState,
) => {
  return createStore<GameStore>()(
    devtools(
      set => ({
        ...initState,
        // Update the current album playing
        updateAlbum: album => set(() => ({ album }), false, 'updateAlbum'),
        // Decrease the score by the passed amount
        decreaseScore: amount => set(state => ({ score: state.score - amount }), false, 'decreaseScore'),
        // Decrease the available lives by 1
        loseLife: () => set((state) => {
          const newLives = state.lives - 1;
          return {
            lives: state.lives - 1,
            gameStatus: newLives === 0 ? 'lost' : state.gameStatus,
          };
        }, false, 'loseLife'),
        // Add a guess to the list
        addGuess: guess => set(state => ({
          guesses: [...state.guesses, guess],
          gameStatus: guess.isCorrect ? 'won' : state.gameStatus,
        }), false, 'addGuess'),
        // Update the pixelation value of the album
        updatePixelation: value => set(() => ({ pixelation: value }), false, 'updatePixelation'),
        // Resets the game
        resetGame: () => set(() => ({ ...defaultInitState }), false, 'resetGame'),

      }),
      { name: 'GameStore' },
    ),
  );
};
