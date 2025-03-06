export default function GuessInput() {
  return (
    <>
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
    </>
  );
}
