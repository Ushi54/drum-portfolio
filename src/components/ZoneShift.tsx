export type Zone = 'zone-night' | 'zone-paper' | 'zone-day';

// 各エリアの背景と、中央の縦線の色（暗い面は白い光、明るい面は黒い線）
const colors: Record<Zone, { bg: string; line: string }> = {
  'zone-night': { bg: '#0c0e11', line: '#f2f4f7' },
  'zone-paper': { bg: '#ffffff', line: '#141414' },
  'zone-day': { bg: '#f5efe1', line: '#6f9b88' },
};

// セクションの境目。背景はグラデーションでつなぎ、中央の縦線も色が移り変わる。
// 上半分と下半分に data-zone を持たせ、ヘッダーがどちらの色になるかの判定に使う。
export const ZoneShift = ({ from, to }: { from: Zone; to: Zone }) => {
  const a = colors[from];
  const b = colors[to];
  return (
    <div
      aria-hidden
      className="relative h-32 sm:h-44"
      style={{ background: `linear-gradient(to bottom, ${a.bg}, ${b.bg})` }}
    >
      <div data-zone={from} className="absolute inset-x-0 top-0 h-1/2" />
      <div data-zone={to} className="absolute inset-x-0 bottom-0 h-1/2" />
      <div
        className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 shadow-[0_0_24px_rgb(242_244_247/0.35)]"
        style={{ background: `linear-gradient(to bottom, ${a.line}, ${b.line})` }}
      />
    </div>
  );
};
