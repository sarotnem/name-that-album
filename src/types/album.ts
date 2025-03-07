import type { Album } from '@prisma/client';

export type GameAlbum = Album & {
  genres: string[];
};
