import { useGameStore } from '@/providers/game-store-provider';
import Detail from './Detail';

export default function Details() {
  const year = useGameStore(state => state.album?.year);
  const artist = useGameStore(state => state.album?.artist);

  // TODO: Remove
  const dummyGenres = ['political folk', 'underground rap', 'west coast rap', 'blues-rock', 'protest', 'hardcore rap'];

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-md">
      <Detail label="Arist" value={artist} cost={20} />
      <Detail label="Year" value={year} cost={5} />
      <Detail label="Genres" value={dummyGenres} cost={5} />
    </div>
  );
}
