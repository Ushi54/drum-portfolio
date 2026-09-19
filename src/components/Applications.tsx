import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Clock } from 'lucide-react';

interface AppItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  status: 'published' | 'wip';
}

export const Applications: React.FC = () => {
  const apps: AppItem[] = [
    {
      id: 'pomodoro',
      title: 'Pomodoro Timer',
      description: '集中力を持続させるためのシンプルで優しいポモドーロタイマーアプリケーション。',
      url: 'https://pomodoro-timer-teal-one.vercel.app',
      thumbnail: '/projects/pomodoro/og-image.jpg',
      category: 'Productivity',
      status: 'published',
    },
    {
      id: 'metronome',
      title: 'Metronome',
      description: 'ドラマーのための実践的な練習用メトロノーム。変拍子やポリリズムにも対応予定。',
      url: '#',
      thumbnail: '', // 画像がないためCSSプレースホルダーを使用
      category: 'Music Tool',
      status: 'wip',
    },
  ];

  return (
    <section id="applications" className="section-container mt-16">
      {/* ヘッダーブロック */}
      <div className="works-header">
        <div className="works-header-text">
          <h2 className="section-title">Applications</h2>
          <p className="text-slate-400 font-sans text-sm mt-3">
            エンジニアとして個人開発したWebアプリケーションやツールの一覧です。
          </p>
        </div>
      </div>

      <div>
        <div className="app-grid">
          {apps.map((app) => (
            <motion.a
              key={app.id}
              href={app.status === 'published' ? app.url : '#'}
              target={app.status === 'published' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`app-card glass-panel ${app.status === 'wip' ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={app.status === 'published' ? { y: -6 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={(e) => {
                if (app.status === 'wip') e.preventDefault();
              }}
            >
              {/* サムネイル部分 */}
              <div className="thumbnail-container">
                {app.thumbnail ? (
                  <img src={app.thumbnail} alt={app.title} className="thumbnail-img" />
                ) : (
                  <div className="wip-placeholder">
                    <Code className="w-10 h-10 text-slate-600 mb-2" />
                    <span className="text-slate-500 font-serif text-sm">No Image</span>
                  </div>
                )}
                
                <div className="thumbnail-overlay">
                  {app.status === 'published' && (
                    <div className="play-button-ring">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                {app.status === 'wip' ? (
                  <span className="category-badge wip-badge flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    WIP / 開発中
                  </span>
                ) : (
                  <span className="category-badge">{app.category}</span>
                )}
              </div>

              {/* 情報記述 */}
              <div className="card-info">
                <h3 className="video-title font-serif flex items-center gap-2">
                  {app.title}
                  {app.status === 'published' && <ArrowUpRight className="w-4 h-4 text-slate-500" />}
                </h3>
                <p className="artist-name">{app.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .app-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .app-grid {
            grid-template-columns: 1fr;
          }
        }

        .app-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          text-decoration: none;
        }

        .wip-placeholder {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .wip-badge {
          background: rgba(234, 179, 8, 0.2) !important;
          color: #fde047 !important;
          border-color: rgba(253, 224, 71, 0.2) !important;
        }
      `}</style>
    </section>
  );
};
