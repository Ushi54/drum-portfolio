export const avatarUrl =
  'https://ugc.production.linktr.ee/fb5396ce-df03-4e1d-baac-b481b681f767_IMG-0483.jpeg?io=true&size=avatar-v3_0';

export const bio = [
  '15歳からドラムを始め、YouTubeのレッスン動画を参考に独学で続けてきました。ボカロ、ロック、アニソンを中心にドラムカバーやコラボ演奏を投稿しつつ、バンド「schirm.（シルム）」でも叩いています。',
  '大切にしているのは、正確に叩くことより、体全体で音楽を楽しんで、その熱量を観てくれる人と共有すること。演奏後に「本当に楽しそうに叩くね」と言ってもらえる瞬間がいちばんうれしいです。',
  '本業はエンジニア。ドラムの練習を助けるアプリを作ったり、考えたことをnoteに書いたりしています。',
];

// できること（依頼の窓口）。2026-11-18 「得意なこと」の代わりに追加
export const services = [
  { title: 'ライブのサポート', note: '歌い手さんのバックバンドなど。楽譜がなくても耳コピで対応' },
  { title: 'レコーディング', note: '電子ドラムで録音して、音声やMIDIのデータで納品' },
  { title: 'コラボ・バンドカバーへの参加', note: '歌い手さんや演奏者とのカバー動画' },
  { title: 'ドラムカバー・叩いてみた', note: 'ボカロ、ロック、アニソンを中心に、撮影から編集まで' },
];

// 実績（うっしーに聞いた内容と、foriio の作品一覧から）。url は実績を見られるページ、links は1つの実績に動画が複数ある時
export type Achievement = { title: string; note: string; url?: string; links?: { label: string; url: string }[] };
export const achievements: Achievement[] = [
  { title: 'schirm.（シルム）', note: 'バンドのドラム担当（2025年3月からサポート、2026年2月から正式メンバー）', url: 'https://www.youtube.com/@schirm.6659' },
  { title: 'Next to You（渋谷DIVE）', note: '歌い手7組のうち4組のバックバンドで、1日に33曲を演奏（すべて耳コピ）', url: 'https://www.foriio.com/works/649778' },
  { title: '学生パフォーマンスライブ', note: '高校のバンドで出演し、avex賞を受賞' },
  { title: 'あいづたか 2nd Album『Nonfiction Switch』', note: '「Nonfiction (feat.nayuta)」のドラムを担当（M3 2024春）', url: 'https://takaaizu.booth.pm/items/5591463' },
  { title: '七海うらら「灼熱にて純情(wii-wii-woo)」バンドカバー', note: 'ドラムのレコーディング（電子ドラムで録音して納品）', url: 'https://www.youtube.com/watch?v=4zZh5VlaAFs' },
  {
    title: '七海うらら × 結束バンド バンドカバー',
    note: '2曲に参加',
    links: [
      { label: 'ギターと孤独と蒼い惑星', url: 'https://www.youtube.com/watch?v=z2tnZmWGwYQ' },
      { label: '青春コンプレックス', url: 'https://www.youtube.com/watch?v=sg0PFcCeYA8' },
    ],
  },
  { title: '『鬼滅の刃』「残響散歌」（Aimer）バンドカバー', note: 'Room963 のバンドカバーにドラムで参加', url: 'https://www.youtube.com/watch?v=rIgUs0OldQM' },
  { title: 'DECO*27「ヒバナ」band edition', note: '筆まめさんのバンド企画でドラムを担当', url: 'https://www.youtube.com/watch?v=5La34Me-3E4' },
];

// 活動の年表（2026-11-18 作成。うっしーに聞いた内容、foriio、動画の公開日から）
export const timeline = [
  { when: '2011年10月（中学3年）', what: 'ドラムを始める。池脇嘉一さんのレッスン動画を見ながら独学で練習' },
  { when: '2014年度（高校3年）', what: '高校で組んだバンドで「学生パフォーマンスライブ」に出演し、avex賞を受賞' },
  { when: '2015年6月', what: 'YouTubeチャンネルを開設。ドラムカバーの投稿を始める' },
  { when: '2022年8月', what: 'ライブイベント「Next to You」（渋谷DIVE）に出演。歌い手7組のうち4組のバックバンドで、1日に33曲を耳コピで演奏' },
  { when: '2023年1〜2月', what: '七海うららさん × 結束バンドのバンドカバー「ギターと孤独と蒼い惑星」「青春コンプレックス」に参加' },
  { when: '2023年3月', what: '七海うららさんの「灼熱にて純情(wii-wii-woo)」バンドカバーで、ドラムをレコーディング' },
  { when: '2023年6月', what: '『鬼滅の刃』「残響散歌」（Aimer）のバンドカバー（Room963）にドラムで参加' },
  { when: '2023年9月', what: '筆まめさんのバンド企画、DECO*27「ヒバナ」band edition でドラムを担当' },
  { when: '2024年4月', what: 'あいづたかさんの 2nd Album『Nonfiction Switch』（M3 2024春）の「Nonfiction (feat.nayuta)」でドラムを担当' },
  { when: '2025年3月', what: 'バンド「schirm.」のサポートドラマーになる' },
  { when: '2026年2月', what: 'schirm. の正式なドラマーになる。ライブにも出演' },
];

// 機材。url は公式の商品ページ。公式が見つからないものは通販サイトのページ（2026-11-18 社長の了承）。
// スネアは型番がはっきりしないので url なし
export type GearItem = { kind: string; name: string; url?: string };
export const gear: { category: string; items: GearItem[] }[] = [
  {
    category: 'アコースティック',
    items: [
      { kind: 'スネア', name: 'Yamaha RBS1455（14"×5.5"）' },
      { kind: 'ペダル', name: 'Yamaha FP9C', url: 'https://jp.yamaha.com/musical-instruments/drums/products/hardware/fp9-series/index.html' },
      { kind: 'チャイナ', name: 'Zildjian 漢家兒 18"', url: 'https://www.soundhouse.co.jp/products/detail/item/86223/' },
      { kind: 'スプラッシュ', name: '小出 808 Splash 8"', url: 'https://global.ikebe-gakki.com/products/132455' },
      { kind: 'スティック', name: 'Pearl 110HC', url: 'https://www.soundhouse.co.jp/products/detail/item/201880/' },
    ],
  },
  {
    category: '電子ドラム',
    items: [{ kind: '電子ドラム', name: 'Roland TD713SC-S', url: 'https://www.roland.com/jp/products/td713/' }],
  },
  {
    category: '撮影',
    items: [
      { kind: 'カメラ', name: 'Canon EOS Kiss M', url: 'https://faq.canon.jp/app/answers/detail/a_id/93668/' },
      { kind: 'レンズ', name: 'Canon EF-M22mm F2 STM', url: 'https://faq.canon.jp/app/answers/detail/a_id/68797/' },
    ],
  },
  {
    category: '制作',
    items: [
      { kind: '録音・ミックス', name: 'Logic Pro', url: 'https://www.apple.com/jp/logic-pro/' },
      { kind: '動画編集', name: 'Final Cut Pro', url: 'https://www.apple.com/jp/final-cut-pro/' },
    ],
  },
];

export const inspirations = [
  { name: 'ヨルシカ', url: 'https://www.youtube.com/@nbuna' },
  { name: 'ずっと真夜中でいいのに。', url: 'https://www.youtube.com/@ZUTOMAYO' },
  { name: 'NoisyCell', url: 'https://www.youtube.com/@noisycell' },
  { name: 'Fall Out Boy', url: 'https://www.youtube.com/@falloutboy' },
  { name: 'Polyphia', url: 'https://www.youtube.com/@Polyphia' },
  { name: 'Fear, and Loathing in Las Vegas', url: 'https://www.youtube.com/@fearandloathinginlasvegas9431' },
  { name: 'the band apart', url: 'https://www.youtube.com/@asiangothiclabel' },
  { name: 'harha', url: 'https://www.youtube.com/@harha868' },
  { name: 'mabanua', url: 'https://www.youtube.com/@mabanua_official' },
  { name: 'supercell', url: 'https://www.youtube.com/@spclryo2673' },
  { name: 'haruka nakamura', url: 'https://www.youtube.com/@harukanakamura_' },
  { name: '有形ランペイジ', url: 'https://www.youtube.com/@sasakureUK0211' },
  { name: 'DECO*27', url: 'https://www.youtube.com/@DECO27' },
  { name: 'HoneyWorks', url: 'https://www.youtube.com/@HoneyWorksOFFICIAL' },
  { name: 'ONE OK ROCK', url: 'https://www.youtube.com/@ONEOKROCK' },
  { name: 'RADWIMPS', url: 'https://www.youtube.com/@RADWIMPS_official' },
  { name: 'UNISON SQUARE GARDEN', url: 'https://www.youtube.com/@unisonsgofficial' },
  { name: 'CHiCO with HoneyWorks', url: 'https://www.youtube.com/@chicoxxx' },
  { name: 'SANOVA', url: 'https://www.youtube.com/@SANOVA-Official' },
];
