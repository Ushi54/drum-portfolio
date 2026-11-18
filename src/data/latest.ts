// latest.json は scripts/fetch-latest.mjs が dev / build の前に自動で更新する
import latest from './latest.json';

export type LatestVideo = { id: string; title: string; url: string };
export type LatestShort = { id: string; caption: string; tags: string[]; url: string };
export type LatestNote = { title: string; url: string; thumbnail: string; publishedAt: string };

export const latestVideo = (latest.video ?? null) as LatestVideo | null;
// カルーセル用：新しい順に最大5件
export const latestVideos = ((latest as { videos?: LatestVideo[] }).videos ?? (latestVideo ? [latestVideo] : [])) as LatestVideo[];
export const latestShort = latest.short as LatestShort | null;
export const latestNote = latest.note as LatestNote | null;

// YouTubeチャンネルの数字（ビルドのたびに自動で取り直す）
export type ChannelStats = { subscribers: number; views: number; videos: number | null; fetchedAt: string };
export const channelStats = ((latest as { channel?: ChannelStats | null }).channel ?? null) as ChannelStats | null;
