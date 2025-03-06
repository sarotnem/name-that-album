export default function ScoreBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-6">
      <div className="text-xl font-bold text-primary">
        Score:
        <span className="text-white">90/100</span>
      </div>
      <div className="text-xl font-bold text-secondary flex gap-2">
        ❤️ ❤️ 🤍
      </div>
    </div>
  );
}
