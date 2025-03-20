'use client';

import { useGameStore } from '@/providers/game-store-provider';
import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';

type AlbumCoverProps = {
  url: string;
};

export default function AlbumCover({ url }: AlbumCoverProps) {
  const isPlaying = useGameStore(state => state.gameStatus === 'playing');
  const pixelSize = useGameStore(state => state.pixelation);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  // Reset the state immediately when the URL changes
  useEffect(() => {
    setIsImageLoaded(false);
    setImage(null);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      setImage(img);
      setIsImageLoaded(true);
    };
  }, [url]);

  // Pixelate the image when it's loaded or when the pixelation changes
  useEffect(() => {
    if (!canvasRef.current || !image || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    applyPixelation(ctx, image, pixelSize);
  }, [image, pixelSize, isPlaying]);

  return (
    <div className={`
      relative flex items-center justify-center bg-gray-700 rounded-lg w-full aspect-square 
      shadow-lg overflow-hidden transition-all duration-500
    `}
    >
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gray-600 animate-pulse rounded-lg"></div>
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-full rounded-lg absolute transition-opacity duration-500 
          ${isPlaying && isImageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        width={450}
        height={450}
      />

      {isImageLoaded && (
        <NextImage
          src={url}
          alt="Album Cover"
          width={1000}
          height={1000}
          className={`
            w-full h-full object-cover rounded-lg absolute transition-opacity duration-500 
            ${!isPlaying ? 'opacity-100' : 'opacity-0'}
          `}
          priority
        />
      )}
    </div>
  );
}

/**
 * Applies a pixelation effect to an image on a canvas.
 * @param ctx Canvas 2D context
 * @param img Loaded Image element
 * @param pixelSize Size of the pixelation effect
 */
function applyPixelation(ctx: CanvasRenderingContext2D, img: HTMLImageElement, pixelSize: number) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let r = 0, g = 0, b = 0, a = 0, count = 0;

      // Average color in the block
      for (let yy = 0; yy < pixelSize; yy++) {
        for (let xx = 0; xx < pixelSize; xx++) {
          const pixelIndex = ((y + yy) * width + (x + xx)) * 4;
          if (pixelIndex < data.length) {
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            a += data[pixelIndex + 3];
            count++;
          }
        }
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      a = Math.floor(a / count);

      // Fill the block with the averaged color
      ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }
}
