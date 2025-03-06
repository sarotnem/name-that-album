import AlbumCover from '@/components/Game/AlbumCover';
import Details from '@/components/Game/Details';
import GuessInput from '@/components/Game/GuessInput';
import ScoreBar from '@/components/Game/ScoreBar';
import { prisma } from '@/lib/db';

export default async function Game() {
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
    <div className="flex flex-col justify-center items-center bg-slate-900 text-foreground p-6 min-h-screen">
      <div className="w-full max-w-4xl">
        <ScoreBar />
        <div className="grid grid-cols-2 gap-6 items-start">
          <AlbumCover url={album.cover} />
          <Details />
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            Unpixelate More (-20 pts)
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            50/50 (-50 pts)
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full mt-6">
          <GuessInput />
        </div>
      </div>
    </div>
  );
}
