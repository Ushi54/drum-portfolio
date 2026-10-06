export type Video = {
  youtubeId: string;
  title: string;
  credit: string;
  genre: string;
};

// 最新のフル動画（自動取得）の下に並べる動画
export const videos: Video[] = [
  { youtubeId: 'z2tnZmWGwYQ', title: 'ギターと孤独と蒼い惑星 / 結束バンド', credit: '七海うらら × 結束バンド バンドカバー', genre: 'アニソン / ロック' },
  { youtubeId: 'sg0PFcCeYA8', title: '青春コンプレックス / 結束バンド', credit: '七海うらら × 結束バンド バンドカバー', genre: 'アニソン / ロック' },
  { youtubeId: 'jIku9CsKXQo', title: 'ノンフィクション / あいづたか feat. nayuta', credit: 'ドラムサポート', genre: 'オリジナル / J-Rock' },
];
