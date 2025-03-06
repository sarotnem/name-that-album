export default function Details() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-md">
      <p className="text-lg font-bold">
        Year:
        <span className="text-accent">1994</span>
      </p>
      <button className="w-full p-3 rounded-md bg-gray-900 text-white text-center hover:bg-gray-700 transition">
        Artist: (Click to reveal -20pts)
      </button>
      <button className="w-full p-3 rounded-md bg-gray-900 text-white text-center hover:bg-gray-700 transition">
        Genre: (Click to reveal -10pts)
      </button>
    </div>
  );
}
