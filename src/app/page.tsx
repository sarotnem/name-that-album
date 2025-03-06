import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded cursor-pointer">
          <Link href={"/game"}>New Game</Link>
        </button>
      </main>
    </div>
  );
}
