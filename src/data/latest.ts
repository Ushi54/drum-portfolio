// latest.json は scripts/fetch-latest.mjs が dev / build の前に自動で更新する
import latest from './latest.json';

export type LatestShort = { id: string; caption: string; tags: string[]; url: string };
export type LatestNote = { title: string; url: string; thumbnail: string; publishedAt: string };

export const latestShort = latest.short as LatestShort | null;
export const latestNote = latest.note as LatestNote | null;
