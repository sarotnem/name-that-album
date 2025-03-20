import Fuse from 'fuse.js';

/**
 * Checks if two strings are a fuzzy match using Fuse.js.
 * @param input The user-provided input string.
 * @param target The correct/reference string.
 * @param threshold Similarity threshold (0.0 = exact match, 1.0 = very loose). Default: 0.70.
 * @returns True if the input is considered a close match to the target.
 */
export function isFuzzyMatch(input: string, target: string, threshold = 0.70): boolean {
  if (!input || !target) return false;

  const inputNormalized = normalizeString(input);
  const targetNormalized = normalizeString(target);

  const fuse = new Fuse([targetNormalized], {
    includeScore: true,
    ignoreDiacritics: true,
    threshold: 1 - threshold,
    minMatchCharLength: 3,
  });

  const result = fuse.search(inputNormalized);

  console.log('Input Normalized:', inputNormalized, '| Score:', result[0]?.score);

  return result.length > 0 && result[0].score !== undefined && result[0].score <= (1 - threshold);
}

/**
 * Normalizes a string by
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Decomposes accents
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritics
    .replace(/[^a-z0-9\s]/g, '') // Removes non-alphanumeric chars except spaces
    .replace(/\s+/g, ' ') // Collapses multiple spaces
    .trim();
}
