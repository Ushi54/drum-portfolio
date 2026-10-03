export type Video = {
  youtubeId: string;
  title: string;
  credit: string;
  genre: string;
};

// 先頭の1本は大きく表示する
export const videos: Video[] = [
  { youtubeId: 'xYZQBZfGTa8', title: '最近のお気に入り動画', credit: 'うっしーのセレクト', genre: 'お気に入り' },
  { youtubeId: 'z2tnZmWGwYQ', title: 'ギターと孤独と蒼い惑星 / 結束バンド', credit: '七海うらら × 結束バンド バンドカバー', genre: 'アニソン / ロック' },
  { youtubeId: 'sg0PFcCeYA8', title: '青春コンプレックス / 結束バンド', credit: '七海うらら × 結束バンド バンドカバー', genre: 'アニソン / ロック' },
  { youtubeId: 'jIku9CsKXQo', title: 'ノンフィクション / あいづたか feat. nayuta', credit: 'ドラムサポート', genre: 'オリジナル / J-Rock' },
];
