export type App = {
  title: string;
  description: string;
  url: string | null; // null は準備中
  thumbnail: string | null;
};

export const apps: App[] = [
  {
    title: 'Visual Pomodoro',
    description: '残り時間が目で見て分かる、集中のためのシンプルなタイマー。',
    url: 'https://pomodoro-timer-teal-one.vercel.app',
    thumbnail: '/projects/pomodoro/og-image.png',
  },
  {
    title: 'メトロノーム',
    description: 'ドラマーの練習用メトロノーム。変拍子やポリリズムにも対応する予定です。',
    url: null,
    thumbnail: null,
  },
];
