export default function Game() {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 text-foreground p-6 min-h-screen">
      <div className="w-full max-w-4xl">
        {/* Header: Score & Lives */}
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="text-xl font-bold text-primary">
            Score:
            <span className="text-white">90/100</span>
          </div>
          <div className="text-xl font-bold text-secondary flex gap-2">
            ❤️ ❤️ 🤍
          </div>
        </div>

        {/* Game Grid: Cover & Details */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {/* Cover Section */}
          <div className="flex items-center justify-center bg-gray-700 rounded-lg w-full aspect-square shadow-lg">
            <span className="text-gray-300">[Image Placeholder]</span>
          </div>

          {/* Hints/Details Section */}
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            Unpixelate More (-20 pts)
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">
            50/50 (-50 pts)
          </button>
        </div>

        {/* Input & Submit */}
        <div className="flex flex-col gap-4 w-full mt-6">
          <input
            type="text"
            placeholder="Guess the album..."
            className="w-full p-3 text-lg rounded-md border border-gray-700 focus:ring-2 focus:ring-primary outline-none text-white"
          />
          <button
            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg text-lg font-semibold transition w-full cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
