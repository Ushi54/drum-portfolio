import { useState } from 'react';
import icons from '../data/artist-icons.json';
import { inspirations } from '../data/profile';

// アイコンの大きさ（px）。ランダムに混ぜて、コラージュのように見せる
const SIZES = ['size-16', 'size-20', 'size-24'];

const shuffle = <T,>(list: T[]) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// 影響を受けたアーティスト：YouTube公式チャンネルのアイコンを、開くたびにランダムな順・大きさで並べる。
// 普段は白黒、ポインターを当てる（またはキーボードで選ぶ）と色が戻り、アーティスト名が出る。
export const Inspirations = () => {
  const [items] = useState(() =>
    shuffle(inspirations).map((a) => ({
      ...a,
      icon: (icons as Record<string, string>)[a.url],
      size: SIZES[Math.floor(Math.random() * SIZES.length)],
    })),
  );
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-center text-lg font-bold">影響を受けたアーティスト</h3>
      <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {items.map((a) => (
          <li key={a.name}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={a.name}
              title={a.name}
              className={`group relative block ${a.size} overflow-hidden rounded-full border border-line bg-raised`}
            >
              {a.icon ? (
                <img
                  src={a.icon}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="size-full object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                />
              ) : (
                <span className="grid size-full place-items-center text-xl font-bold text-muted">{a.name.slice(0, 1)}</span>
              )}
              <span className="absolute inset-0 grid place-items-center bg-black/65 p-1.5 text-center text-[10px] leading-tight font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
                {a.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
