import Game from '@/components/Game/Game';
import { prisma } from '@/lib/db';
import { GameStoreProvider } from '@/providers/game-store-provider';

export default async function GamePage() {
  async function getAlbum() {
    const albumsCount = await prisma.album.count();
    const album = await prisma.album.findMany({
      take: 1,
      skip: Math.floor(Math.random() * (albumsCount - 10)),
    });

    return album[0];
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
