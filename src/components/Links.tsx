import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { YoutubeIcon } from './Header';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10H18a6 6 0 1 1-6-6h2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PortfolioIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

interface LinkItem {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  glowColor: string;
}

export const Links: React.FC = () => {
  // 個人アカウントのリンク
  const personalLinks: LinkItem[] = [
    {
      name: 'うっしー - foriio',
      url: 'https://fori.io/ushi5555',
      icon: <PortfolioIcon className="w-7 h-7" />,
      description: 'ドラマーとしての実績や作品情報をまとめたクリエイターポートフォリオです。',
      color: '#336774',
      glowColor: 'rgba(51, 103, 116, 0.15)',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/channel/UCjYzaIL8YhXh671FyjcYikg',
      icon: <YoutubeIcon className="w-7 h-7" />,
      description: '「叩いてみた」動画やショート演奏動画を公開しています。',
      color: '#a35c5c',
      glowColor: 'rgba(163, 92, 92, 0.15)',
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com/ushiushi_drums',
      icon: <TwitterIcon className="w-7 h-7" />,
      description: '日々の練習での気づきや、ドラムに関する告知・日常のつぶやき。',
      color: '#5c7b8c',
      glowColor: 'rgba(92, 123, 140, 0.15)',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ushi5432_drums',
      icon: <InstagramIcon className="w-7 h-7" />,
      description: '演奏のショートクリップや愛用ドラム機材のギャラリー。',
      color: '#a89498',
      glowColor: 'rgba(168, 148, 152, 0.15)',
    },
    {
      name: 'TikTok',
      url: 'https://vt.tiktok.com/ZSeraUE2m/',
      icon: <TikTokIcon className="w-7 h-7" />,
      description: 'ドラム演奏動画を中心に、テンポの良いショートクリップをお届け。',
      color: '#607380',
      glowColor: 'rgba(96, 115, 128, 0.15)',
    },
    {
      name: 'Threads',
      url: 'https://www.threads.net/@ushi5432',
      icon: <ThreadsIcon className="w-7 h-7" />,
      description: 'ドラム活動についての何気ない思考や、テキストベースの雑記。',
      color: '#687882',
      glowColor: 'rgba(104, 120, 130, 0.15)',
    },
  ];

  // バンド "schirm." の公式リンク
  const bandLinks: LinkItem[] = [
    {
      name: 'schirm. - YouTube',
      url: 'https://www.youtube.com/@schirm.6659',
      icon: <YoutubeIcon className="w-7 h-7" />,
      description: 'schirm.の公式YouTubeチャンネル。MVや音源を公開しています。',
      color: '#a35c5c',
      glowColor: 'rgba(163, 92, 92, 0.15)',
    },
    {
      name: 'schirm. - X (Twitter)',
      url: 'https://x.com/schirmOfficial',
      icon: <TwitterIcon className="w-7 h-7" />,
      description: 'schirm.の公式X。最新のリリース情報やライブ出演告知などをお届けします。',
      color: '#336774',
      glowColor: 'rgba(51, 103, 116, 0.15)',
    },
    {
      name: 'schirm. - Instagram',
      url: 'https://www.instagram.com/schirmofficial/',
      icon: <InstagramIcon className="w-7 h-7" />,
      description: 'schirm.の公式Instagram。バンドの世界観を表現するビジュアルアートワーク。',
      color: '#a89498',
      glowColor: 'rgba(168, 148, 152, 0.15)',
    },
  ];

  return (
    <section id="links" className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">Links</h2>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto font-sans text-sm">
          ドラマー個人としての各アカウント、および所属バンド「schirm.」の公式リンク集です。
        </p>
      </div>

      {/* 1. 個人用アカウントセクション */}
      <div className="mb-16">
        <h3 className="links-group-title font-serif text-slate-400 mb-6">Personal Links</h3>
        <div className="links-grid">
          {personalLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card glass-panel"
              style={{
                '--glow-color': link.glowColor,
                '--brand-color': link.color,
              } as React.CSSProperties}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="link-icon-container" style={{ color: link.color }}>
                {link.icon}
              </div>
              
              <div className="link-info-box">
                <h3 className="link-name font-serif text-white flex items-center gap-2">
                  {link.name}
                  <ArrowUpRight className="w-4 h-4 text-slate-600 link-arrow" />
                </h3>
                <p className="link-desc text-slate-400 text-sm mt-2 leading-relaxed">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* 2. バンド用アカウントセクション */}
      <div>
        <h3 className="links-group-title font-serif text-slate-400 mb-6">Band "schirm." Links</h3>
        <div className="links-grid">
          {bandLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card glass-panel"
              style={{
                '--glow-color': link.glowColor,
                '--brand-color': link.color,
              } as React.CSSProperties}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="link-icon-container" style={{ color: link.color }}>
                {link.icon}
              </div>
              
              <div className="link-info-box">
                <h3 className="link-name font-serif text-white flex items-center gap-2">
                  {link.name}
                  <ArrowUpRight className="w-4 h-4 text-slate-600 link-arrow" />
                </h3>
                <p className="link-desc text-slate-400 text-sm mt-2 leading-relaxed">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .links-group-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 8px;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .links-grid {
            grid-template-columns: 1fr;
          }
        }

        .link-card {
          padding: 24px;
          display: flex;
          gap: 20px;
          text-decoration: none;
          align-items: flex-start;
          border-radius: 4px;
        }

        .link-card:hover {
          border-color: var(--brand-color) !important;
          box-shadow: 0 10px 30px -10px var(--glow-color) !important;
        }

        .link-icon-container {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          width: 48px;
          height: 48px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .link-card:hover .link-icon-container {
          transform: scale(1.05) rotate(2deg);
        }

        .link-info-box {
          flex-grow: 1;
        }

        .link-name {
          font-size: 1.25rem;
        }

        .link-arrow {
          transition: transform 0.3s ease, color 0.3s;
        }

        .link-card:hover .link-arrow {
          transform: translate(2px, -2px);
          color: var(--brand-color);
        }
      `}</style>
    </section>
  );
};
