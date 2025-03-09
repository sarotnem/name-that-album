import Image from 'next/image';

export default function AlbumCover({ url }: { url: string }) {
  return (
    <div className="flex items-center justify-center bg-gray-700 rounded-lg w-full aspect-square shadow-lg">
      <Image src={url} alt={url} width={1000} height={1000} className="w-full h-full object-cover" priority />
    </div>
  );
}
