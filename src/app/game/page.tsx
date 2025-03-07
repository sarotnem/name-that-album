import Game from '@/components/Game/Game';
import { prisma } from '@/lib/db';
import { GameStoreProvider } from '@/providers/game-store-provider';
import type { GameAlbum } from '@/types/album';

export default async function GamePage() {
  async function getAlbum(): Promise<GameAlbum> {
    const albumsCount = await prisma.album.count();
    // TODO: Lazy-load genres
    const albums = await prisma.album.findMany({
      take: 1,
      skip: Math.floor(Math.random() * (albumsCount - 10)),
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

    return { ...albums[0], genres: albums[0].genres.map(g => g.genre.name).sort((a, b) => a.localeCompare(b)) };
  }

  const album = await getAlbum();

  return (
    <GameStoreProvider>
      <div className="flex flex-col justify-center items-center bg-slate-900 text-foreground p-6 min-h-screen">
        <Game album={album} />
      </div>
    </GameStoreProvider>
  );
}
