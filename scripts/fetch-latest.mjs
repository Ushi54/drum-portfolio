// ビルド前に「最新のショート動画」と「最新のnote記事」を取得して src/data/latest.json に書き出す。
// 取得に失敗した場合は既存の latest.json をそのまま使う（ビルドは止めない）。
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/latest.json', import.meta.url);
const SHORTS_URL = 'https://www.youtube.com/@drumcover9606/shorts';
const NOTE_RSS = 'https://note.com/ushi5432/rss';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const decode = (s) =>
  s.replace(/\\u0026/g, '&').replace(/\\"/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

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
    title: pick('title'),
    url: pick('link'),
    thumbnail: pick('media:thumbnail'),
    publishedAt: new Date(pick('pubDate')).toISOString(),
  };
}

let current = {};
try {
  current = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  // 初回は空
}

const [short, note] = await Promise.allSettled([fetchLatestShort(), fetchLatestNote()]);
const next = {
  short: short.status === 'fulfilled' ? short.value : current.short ?? null,
  note: note.status === 'fulfilled' ? note.value : current.note ?? null,
};
for (const [name, r] of [['short', short], ['note', note]]) {
  if (r.status === 'rejected') console.warn(`[fetch-latest] ${name} の取得に失敗。前回の値を使います: ${r.reason.message}`);
}
await writeFile(OUT, JSON.stringify(next, null, 2) + '\n');
console.log(`[fetch-latest] short=${next.short?.id} note=${next.note?.title}`);
