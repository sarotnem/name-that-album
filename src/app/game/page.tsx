import Game from '@/components/Game/Game';
import { prisma } from '@/lib/db';
import { GameStoreProvider } from '@/providers/game-store-provider';
import type { GameAlbum } from '@/types';

export default async function GamePage() {
  async function getGameAlbumData(): Promise<{ album: GameAlbum; alternativeTitle: string }> {
    const albumsCount = await prisma.album.count();

    // Fetch the main album
    // TODO: Lazy-load genres
    const albums = await prisma.album.findMany({
      take: 1,
      skip: Math.floor(Math.random() * Math.max(0, albumsCount - 10)),
      include: {
        genres: {
          select: {
            genre: {
              select: { name: true },
            },
          },
        },
      },
    });

    const mainAlbum = albums[0];
    if (!mainAlbum) throw new Error('No album found.');

    // Fetch an alternative album's title
    // TODO: Load the alternative title on demand
    let alternativeTitle: string | null = null;
    while (!alternativeTitle || alternativeTitle === mainAlbum.title) {
      const randomAlternative = await prisma.album.findFirst({
        select: { title: true },
        skip: Math.floor(Math.random() * Math.max(0, albumsCount - 10)),
      });

      alternativeTitle = randomAlternative?.title || null;
    }

    return {
      album: {
        ...mainAlbum,
        genres: mainAlbum.genres.map(g => g.genre.name).sort((a, b) => a.localeCompare(b)),
      },
      alternativeTitle,
    };
  }

  const { album, alternativeTitle } = await getGameAlbumData();

  return (
    <GameStoreProvider>
      <div className="flex flex-col justify-center items-center bg-slate-900 text-foreground p-6 min-h-screen">
        <Game album={album} alternativeTitle={alternativeTitle} />
      </div>
    </GameStoreProvider>
  );
}
