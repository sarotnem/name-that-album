import type { Album } from '@prisma/client';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  album: Album | null;
  score: number;
  lives: number;
};

export type GameActions = {
  updateAlbum: (album: Album) => void;
  decreaseScore: (amount: number) => void;
  loseLife: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  album: null,
  score: 100,
  lives: 3,
};

export const createGameStore = (
  initState: GameState = defaultInitState,
) => {
  return createStore<GameStore>()(
    devtools(
      set => ({
        ...initState,
        updateAlbum: album => set(() => ({ album }), false, 'updateAlbum'),
        decreaseScore: amount => set(state => ({ score: state.score - amount }), false, 'decreaseScore'),
        loseLife: () => set(state => ({ lives: state.lives - 1 }), false, 'loseLife'),
      }),
      { name: 'GameStore' }, // This name appears in Redux DevTools
    ),
  );
};
