import Lives from './Lives';
import Score from './Score';

export default function ScoreBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-6">
      <Score />
      <Lives />
    </div>
  );
}
