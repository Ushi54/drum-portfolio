export type Article = {
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
};

// おすすめのnote記事（手動で選ぶ）
export const articles: Article[] = [
  {
    title: '目を閉じて、音だけを聴く。初心者の頃に狂ったようにやっていたドラム練習の話',
    url: 'https://note.com/ushi5432/n/ne27adaf83c45',
    thumbnail: 'https://assets.st-note.com/production/uploads/images/296314722/rectangle_large_type_2_6081d578563a57f57e5472d4d3e6da91.jpeg?width=800',
    publishedAt: '2026-07-21',
  },
  {
    title: 'プロンプトを考えるのをやめて、AIにただ喋りかけてみた結果。',
    url: 'https://note.com/ushi5432/n/n913cc74f26fc',
    thumbnail: 'https://assets.st-note.com/production/uploads/images/308575209/rectangle_large_type_2_4e769daea5cf8d75a3a3587bcad69d44.jpeg?width=800',
    publishedAt: '2026-08-30',
  },
  {
    title: '意味もなくタイピングしてしまう。Lofree Flow2の魔力について',
    url: 'https://note.com/ushi5432/n/n87a29f974e88',
    thumbnail: 'https://assets.st-note.com/production/uploads/images/307658176/rectangle_large_type_2_b22ba46be2e03f614245f9e461f899cb.jpeg?width=800',
    publishedAt: '2026-08-28',
  },
];
