export type LinkIcon = 'youtube' | 'x' | 'instagram' | 'tiktok' | 'threads' | 'note' | 'portfolio';

export type LinkItem = {
  name: string;
  url: string;
  icon: LinkIcon;
  description: string;
};

export const personalLinks: LinkItem[] = [
  { name: 'YouTube', url: 'https://www.youtube.com/@drumcover9606', icon: 'youtube', description: '叩いてみた動画とショート演奏' },
  { name: 'note', url: 'https://note.com/ushi5432', icon: 'note', description: '考えたこと、作ったもの、ドラムの話' },
  { name: 'X', url: 'https://twitter.com/ushiushi_drums', icon: 'x', description: '練習での気づきや告知' },
  { name: 'Instagram', url: 'https://www.instagram.com/ushi_5432_drpr/', icon: 'instagram', description: '演奏のショートクリップと機材' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@ushi5432', icon: 'tiktok', description: 'ドラム演奏のショート動画' },
  { name: 'Threads', url: 'https://www.threads.com/@ushi_5432_drpr', icon: 'threads', description: 'Instagramの投稿と同じ内容' },
  { name: 'foriio', url: 'https://fori.io/ushi5555', icon: 'portfolio', description: 'ドラマーとしての実績まとめ' },
];

// 所属バンド schirm.
export const bandLinks: LinkItem[] = [
  { name: 'YouTube', url: 'https://www.youtube.com/@schirm.6659', icon: 'youtube', description: 'MVと音源' },
  { name: 'X', url: 'https://x.com/schirmOfficial', icon: 'x', description: 'リリースとライブの告知' },
  { name: 'Instagram', url: 'https://www.instagram.com/schirmofficial/', icon: 'instagram', description: 'アートワーク' },
];

export const contactEmail = 'ushi.54.log@gmail.com';
export const youtubeChannelUrl = 'https://www.youtube.com/@drumcover9606';
export const noteUrl = 'https://note.com/ushi5432';
