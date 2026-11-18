import { channelStats } from '../data/latest';
import { achievements, avatarUrl, bio, gear, services, timeline } from '../data/profile';
import { ArrowUpRight } from 'lucide-react';
import { Inspirations } from './Inspirations';
import { Section } from './Section';

const fmt = (n: number) => n.toLocaleString('ja-JP');

// うっしーについて（2026-11-18 組み替え）
// アイコン → YouTubeの数字 → 自己紹介・機材 → 活動の年表・できること・実績 → 影響を受けたアーティスト
export const About = () => (
  <Section id="about" title="うっしーについて">
    {/* アイコンは大きめにして、セクションの中央に置く */}
    <img src={avatarUrl} alt="うっしー" className="mx-auto mb-8 size-36 rounded-full border-2 border-line object-cover sm:size-44" />

    {channelStats && (
      <dl className="mx-auto mb-14 grid max-w-2xl grid-cols-3 divide-x divide-line/60 text-center">
        <Stat label="チャンネル登録者" value={fmt(channelStats.subscribers)} unit="人" />
        <Stat label="総再生回数" value={fmt(channelStats.views)} unit="回" />
        {channelStats.videos !== null && <Stat label="投稿した動画" value={fmt(channelStats.videos)} unit="本" />}
      </dl>
    )}

    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <div className="max-w-prose space-y-4">
        {bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold">機材</h3>
        <Gear />
      </div>
    </div>

    <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr]">
      <div>
        <h3 className="mb-5 text-lg font-bold">活動の年表</h3>
        <ol className="relative space-y-6 border-l border-line pl-6">
          {timeline.map((t) => (
            <li key={t.when + t.what} className="relative">
              <span aria-hidden className="led-bar absolute top-1.5 -left-[29px] size-2.5 rounded-full" />
              <p className="font-display text-sm tracking-wider text-muted">{t.when}</p>
              <p className="mt-0.5 text-sm leading-relaxed">{t.what}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="mb-3 text-lg font-bold">できること</h3>
          <ul className="divide-y divide-line/60 rounded-xl bg-panel">
            {services.map((s) => (
              <li key={s.title} className="px-6 py-4">
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">ご依頼・ご相談は、ページ下のメールからどうぞ。</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">実績</h3>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a.title}>
                {a.url ? (
                  <ExternalLink href={a.url} className="font-medium">
                    {a.title}
                  </ExternalLink>
                ) : (
                  <p className="font-medium">{a.title}</p>
                )}
                <p className="text-sm text-muted">{a.note}</p>
                {a.links && (
                  <p className="mt-0.5 flex flex-wrap gap-x-4 text-sm">
                    {a.links.map((l) => (
                      <ExternalLink key={l.url} href={l.url}>
                        {l.label}
                      </ExternalLink>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <Inspirations />
  </Section>
);

const Stat = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="px-2">
    <dt className="text-xs text-muted sm:text-sm">{label}</dt>
    <dd className="mt-1">
      <span className="font-display text-2xl tracking-wide sm:text-4xl">{value}</span>
      <span className="ml-0.5 text-xs text-muted sm:text-sm">{unit}</span>
    </dd>
  </div>
);

// 機材：分類ごとのカード。1行に「種類」と「名前」、公式ページがあれば ↗ のリンク
const Gear = () => (
  <div className="space-y-4">
    {gear.map((g) => (
      <section key={g.category} className="rounded-xl bg-panel px-5 py-4">
        <h4 className="mb-2 text-xs tracking-wider text-muted">{g.category}</h4>
        <ul className="divide-y divide-line/40">
          {g.items.map((item) => (
            <li key={item.name} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 py-2 text-sm">
              <span className="text-muted">{item.kind}</span>
              {item.url ? (
                <ExternalLink href={item.url} className="font-medium">
                  {item.name}
                </ExternalLink>
              ) : (
                <span className="font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);

// 外部へのリンク（名前の横に ↗）
const ExternalLink = ({ href, className = '', children }: { href: string; className?: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-baseline gap-1 hover:underline ${className}`}>
    {children}
    <ArrowUpRight className="size-3.5 shrink-0 self-center text-muted transition-colors group-hover:text-fg" aria-hidden />
  </a>
);
