import { GAME_CONFIG } from '@/lib/config';
import type { GameAlbum } from '@/types/album';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type GameState = {
  album: GameAlbum | null;
  score: number;
  lives: number;
};

export type GameActions = {
  updateAlbum: (album: GameAlbum) => void;
  decreaseScore: (amount: number) => void;
  loseLife: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  album: null,
  score: 100,
  lives: GAME_CONFIG.MAX_LIVES,
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
