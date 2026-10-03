import { useEffect, useState } from 'react';

const nav = [
  { label: '演奏', href: '#drums' },
  { label: 'note', href: '#writing' },
  { label: 'アプリ', href: '#apps' },
  { label: 'プロフィール', href: '#about' },
  { label: 'リンク', href: '#links' },
];

type Zone = 'zone-night' | 'zone-day';

// ヘッダーの真下にあるエリア（data-zone）に合わせて、ヘッダーの色を夜／昼に切り替える
const HEADER_BOTTOM = 56;

const useZoneUnderHeader = (): Zone => {
  const [zone, setZone] = useState<Zone>('zone-night');
  useEffect(() => {
    const update = () => {
      const areas = document.querySelectorAll<HTMLElement>('[data-zone]');
      for (const el of areas) {
        const r = el.getBoundingClientRect();
        if (r.top <= HEADER_BOTTOM && r.bottom > HEADER_BOTTOM) {
          setZone(el.dataset.zone as Zone);
          return;
        }
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return zone;
};

export const Header = () => {
  const zone = useZoneUnderHeader();
  return (
    <header className={`${zone} sticky top-0 z-20 border-b border-line/40 bg-base/85 backdrop-blur transition-colors duration-500`}>
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-5 py-3 sm:px-8">
        <a href="#top" className="shrink-0 text-lg font-black tracking-wider">
          うっしー
        </a>
        <nav aria-label="ページ内リンク" className="-mr-5 overflow-x-auto [scrollbar-width:none] sm:mr-0 sm:ml-auto">
          <ul className="flex gap-1 pr-5 text-sm whitespace-nowrap sm:pr-0">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="block rounded-full px-3 py-1.5 transition-colors hover:bg-raised">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
