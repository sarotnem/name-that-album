'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full text-center py-4 text-xs text-white/40 absolute bottom-2 left-0 opacity-50">
      Albums are from the
      {' '}
      <span className="font-medium">Rolling Stone 500 Greatest Albums of All Time (2023 Edition)</span>
      ,
      sourced from
      {' '}
      <Link
        href="https://musicbrainz.org/series/bb3d9d84-75b8-4e67-8ad7-dcc38f764bf3"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        MusicBrainz
      </Link>
      . Album covers from
      {' '}
      <Link
        href="https://coverartarchive.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Cover Art Archive
      </Link>
      .
    </footer>
  );
}
