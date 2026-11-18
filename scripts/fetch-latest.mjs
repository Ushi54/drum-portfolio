// ビルド前に「最新のフル動画」「最新のショート動画」「最新のnote記事」を取得して src/data/latest.json に書き出す。
// 取得に失敗した場合は既存の latest.json をそのまま使う（ビルドは止めない）。
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/latest.json', import.meta.url);
const VIDEOS_URL = 'https://www.youtube.com/@drumcover9606/videos';
const SHORTS_URL = 'https://www.youtube.com/@drumcover9606/shorts';
const NOTE_RSS = 'https://note.com/ushi5432/rss';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const decode = (s) =>
  s.replace(/\\u0026/g, '&').replace(/\\"/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// 「動画」タブの先頭（新しい順）から、最大 VIDEO_COUNT 件
const VIDEO_COUNT = 5;
async function fetchLatestVideos() {
  const res = await fetch(VIDEOS_URL, { headers: { 'User-Agent': UA, 'Accept-Language': 'ja' } });
  if (!res.ok) throw new Error(`YouTube ${res.status}`);
  const html = await res.text();
  const marker = '"richItemRenderer":{"content":{"lockupViewModel"';
  const list = [];
  let start = html.indexOf(marker);
  while (start >= 0 && list.length < VIDEO_COUNT) {
    const nextStart = html.indexOf(marker, start + marker.length);
    const block = html.slice(start, nextStart < 0 ? start + 8000 : Math.min(nextStart, start + 8000));
    const id = block.match(/\/vi\/([A-Za-z0-9_-]{11})\//)?.[1];
    const title = block.match(/"lockupMetadataViewModel":\{"title":\{"content":"((?:[^"\\]|\\.)*)"/)?.[1];
    if (id && title && !list.some((v) => v.id === id)) {
      list.push({ id, title: decode(title), url: `https://www.youtube.com/watch?v=${id}` });
    }
    start = nextStart;
  }
  if (list.length === 0) throw new Error('フル動画が見つからない');
  return list;
}

async function fetchLatestShort() {
  const res = await fetch(SHORTS_URL, { headers: { 'User-Agent': UA, 'Accept-Language': 'ja' } });
  if (!res.ok) throw new Error(`YouTube ${res.status}`);
  const html = await res.text();
  // ショート一覧の先頭（最新）の1件
  const block = html.match(/"shortsLockupViewModel":\{.*?"accessibilityText":"((?:[^"\\]|\\.)*)"/);
  const id = html.match(/"reelWatchEndpoint":\{"videoId":"([A-Za-z0-9_-]{11})"/);
  if (!block || !id) throw new Error('ショート動画が見つからない');
  // 例: 「爽快感満載の大好きな曲#ドラム #叩いてみた, 1,152回視聴 - ショート動画を再生」
  const text = decode(block[1]).replace(/,\s*[\d,.万]+\s*回視聴.*$/, '');
  const caption = text.split('#')[0].trim();
  const tags = [...text.matchAll(/#([^\s#]+)/g)].map((m) => m[1]);
  return { id: id[1], caption, tags, url: `https://www.youtube.com/shorts/${id[1]}` };
}

async function fetchLatestNote() {
  const res = await fetch(NOTE_RSS, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`note ${res.status}`);
  const xml = await res.text();
  const item = xml.match(/<item>([\s\S]*?)<\/item>/)?.[1];
  if (!item) throw new Error('note記事が見つからない');
  const pick = (tag) => decode(item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))?.[1] ?? '').trim();
  return {
    title: pick('title').replace(/^#+\s*/, ''), // 記事の題名の先頭に見出しの「#」が残っていても外す
    url: pick('link'),
    thumbnail: pick('media:thumbnail'),
    publishedAt: new Date(pick('pubDate')).toISOString(),
  };
}

// 影響を受けたアーティスト：YouTube公式チャンネルのアイコンを取る（src/data/profile.ts の inspirations の url から）
const ARTISTS_OUT = new URL('../src/data/artist-icons.json', import.meta.url);
async function fetchArtistIcons(prev) {
  const src = await readFile(new URL('../src/data/profile.ts', import.meta.url), 'utf8');
  const urls = [...new Set(src.match(/https:\/\/www\.youtube\.com\/@[^'"]+/g) ?? [])];
  const out = {};
  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'ja' } });
        const icon = (await res.text()).match(/<meta property="og:image" content="([^"]+)"/)?.[1];
        // 大きさを 240px に（URL の末尾の =s900-... を書き換える）
        if (icon) out[url] = decode(icon).replace(/=s\d+[^/]*$/, '=s240-c-k-c0x00ffffff-no-rj');
        else if (prev[url]) out[url] = prev[url];
      } catch {
        if (prev[url]) out[url] = prev[url];
      }
    }),
  );
  // 並びを profile.ts の順にそろえる（毎回の差分を小さくするため）
  return Object.fromEntries(urls.filter((u) => out[u]).map((u) => [u, out[u]]));
}
let prevIcons = {};
try {
  prevIcons = JSON.parse(await readFile(ARTISTS_OUT, 'utf8'));
} catch {
  // 初回は空
}
try {
  const icons = await fetchArtistIcons(prevIcons);
  await writeFile(ARTISTS_OUT, JSON.stringify(icons, null, 2) + '\n');
  console.log(`[fetch-latest] artist icons=${Object.keys(icons).length}`);
} catch (e) {
  console.warn(`[fetch-latest] アーティストのアイコンの取得に失敗。前回の値を使います: ${e.message}`);
}

// チャンネルの数字（登録者数・総再生数・動画の本数）を「概要」ページから取る
async function fetchChannelStats() {
  const res = await fetch('https://www.youtube.com/@drumcover9606/about', { headers: { 'User-Agent': UA, 'Accept-Language': 'ja' } });
  if (!res.ok) throw new Error(`YouTube ${res.status}`);
  const html = await res.text();
  const num = (re) => {
    const m = html.match(re)?.[1];
    return m ? Number(m.replace(/,/g, '')) : null;
  };
  const subscribers = num(/"subscriberCountText":"チャンネル登録者数 ([\d,]+)人"/);
  const views = num(/"viewCountText":"([\d,]+)回視聴"/);
  const videos = num(/"videoCountText":"([\d,]+) 本の動画"/);
  if (subscribers === null || views === null) throw new Error('チャンネルの数字が取れない');
  return { subscribers, views, videos, fetchedAt: new Date().toISOString().slice(0, 10) };
}

let current = {};
try {
  current = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  // 初回は空
}

const [videos, short, note, channel] = await Promise.allSettled([fetchLatestVideos(), fetchLatestShort(), fetchLatestNote(), fetchChannelStats()]);
const recentVideos = videos.status === 'fulfilled' ? videos.value : current.videos ?? (current.video ? [current.video] : []);
const next = {
  // video は最新の1件（以前からの形）。videos はカルーセル用の新しい順の最大5件
  video: recentVideos[0] ?? null,
  videos: recentVideos,
  short: short.status === 'fulfilled' ? short.value : current.short ?? null,
  note: note.status === 'fulfilled' ? note.value : current.note ?? null,
  channel: channel.status === 'fulfilled' ? channel.value : current.channel ?? null,
};
for (const [name, r] of [['videos', videos], ['short', short], ['note', note], ['channel', channel]]) {
  if (r.status === 'rejected') console.warn(`[fetch-latest] ${name} の取得に失敗。前回の値を使います: ${r.reason.message}`);
}
await writeFile(OUT, JSON.stringify(next, null, 2) + '\n');
console.log(`[fetch-latest] videos=${next.videos.map((v) => v.id).join(',')} short=${next.short?.id} note=${next.note?.title}`);
