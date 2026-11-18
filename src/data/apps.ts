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
    title: 'ACCEL',
    description: 'テンポが自動で上がっていく、ドラマーのためのメトロノーム。変拍子とポリリズムにも対応しています。',
    url: 'https://accel-tempo.vercel.app',
    thumbnail: '/projects/accel/og-image.png',
  },
];
