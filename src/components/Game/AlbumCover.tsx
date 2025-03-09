'use client';
import { useGameStore } from '@/providers/game-store-provider';
import { useEffect, useRef } from 'react';

export default function AlbumCover({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Higher number -> more pixelation
  const pixelSize = useGameStore(state => state.pixelation);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;

      // Process image into mosaic
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          let r = 0, g = 0, b = 0, a = 0;
          let count = 0;

          // Average the color of the block
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

          // Draw a solid square with the averaged color
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };
  }, [url, pixelSize]);

  return (
    <div className="flex items-center justify-center bg-gray-700 rounded-lg w-full aspect-square shadow-lg">
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" width={300} height={300} />
    </div>
  );
}
