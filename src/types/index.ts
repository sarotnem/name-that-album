import type { Album } from '@prisma/client';

export type GameAlbum = Album & {
  genres: string[];
};

export type Guess = {
  value: string;
  isCorrect: boolean;
};

export type GameStatus = 'playing' | 'won' | 'lost';
