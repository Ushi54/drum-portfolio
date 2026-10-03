type Zone = 'zone-night' | 'zone-day';

const colors: Record<Zone, { bg: string; line: string }> = {
  'zone-night': { bg: '#0c0e11', line: '#f2f4f7' },
  'zone-day': { bg: '#f5efe1', line: '#6f9b88' },
};

// 夜と昼の境目。背景はグラデーションでつなぎ、中央の線（LEDの白⇔セージ）も色が移り変わる。
// 上半分と下半分に data-zone を持たせ、ヘッダーがどちらの色になるかの判定に使う。
export const ZoneShift = ({ from, to }: { from: Zone; to: Zone }) => {
  const a = colors[from];
  const b = colors[to];
  return (
    <div
      aria-hidden
      className="relative h-56 sm:h-72"
      style={{ background: `linear-gradient(to bottom, ${a.bg}, #9fb0a6, ${b.bg})` }}
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
