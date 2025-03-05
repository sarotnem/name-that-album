import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const dataFile = './prisma/albums.json';

interface AlbumData {
  title: string;
  artist: string;
  year: string;
  genres: string[];
  rating?: number;
  links?: Record<string, string>;
  cover: string;
  mbid: string;
  spotify_id?: string | null;
}

async function seedDatabase() {
  try {
    const rawData = fs.readFileSync(dataFile, 'utf-8');
    const albums: AlbumData[] = JSON.parse(rawData);

    for (const album of albums) {
      console.log(`🌟 Seeding album: ${album.title} - ${album.artist}`);

      const createdAlbum = await prisma.album.upsert({
        where: { mbid: album.mbid },
        update: {},
        create: {
          mbid: album.mbid,
          title: album.title,
          artist: album.artist,
          year: parseInt(album.year),
          rating: album.rating ?? null,
          cover: album.cover,
          spotifyId: album.spotify_id || null,
        },
      });

      for (const genreName of album.genres) {
        let genre = await prisma.genre.findUnique({ where: { name: genreName } });

        if (!genre) {
          genre = await prisma.genre.create({ data: { name: genreName } });
        }

        await prisma.albumGenre.create({
          data: {
            albumId: createdAlbum.id,
            genreId: genre.id,
          },
        });
      }

      if (album.links) {
        for (const [type, url] of Object.entries(album.links)) {
          if (typeof url === 'string') {
            await prisma.link.create({
              data: {
                type,
                url,
                albumId: createdAlbum.id,
              },
            });
          }
        }
      }
    }

    console.log('Database seeding complete!');
  }
  catch (error) {
    console.error('Error seeding database:', error);
  }
  finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
