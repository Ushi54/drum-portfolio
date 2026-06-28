import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowUpRight } from 'lucide-react';
import { YoutubeIcon } from './Header';

interface VideoItem {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  category: string;
}

export const YoutubeCard: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // 最近のお気に入り動画 (ユーザーが気分で変更する枠)
  const featuredVideo: VideoItem = {
    id: 'featured',
    title: '最近のお気に入り動画',
    artist: 'Selected by うっしー',
    youtubeId: 'xYZQBZfGTa8',
    thumbnail: 'https://img.youtube.com/vi/xYZQBZfGTa8/hqdefault.jpg',
    category: 'My Favorite',
  };

  // ドラムカバー・サポート動画データ
  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'ギターと孤独と蒼い惑星 / 結束バンド (Cover)',
      artist: '七海うらら × 結束バンド Band Cover',
      youtubeId: 'z2tnZmWGwYQ',
      thumbnail: 'https://img.youtube.com/vi/z2tnZmWGwYQ/hqdefault.jpg',
      category: 'Anime / Rock',
    },
    {
      id: '2',
      title: '青春コンプレックス / 結束バンド (Cover)',
      artist: '七海うらら × 結束バンド Band Cover',
      youtubeId: 'sg0PFcCeYA8',
      thumbnail: 'https://img.youtube.com/vi/sg0PFcCeYA8/hqdefault.jpg',
      category: 'Anime / Rock',
    },
    {
      id: '3',
      title: 'ノンフィクション / あいづたか feat. nayuta',
      artist: 'あいづたか feat. nayuta (Drum Support)',
      youtubeId: 'jIku9CsKXQo',
      thumbnail: 'https://img.youtube.com/vi/jIku9CsKXQo/hqdefault.jpg',
      category: 'Original / J-Rock',
    },
  ];

  return (
    <section id="works" className="section-container">
      {/* ヘッダーブロック */}
      <div className="works-header">
        <div className="works-header-text">
          <h2 className="section-title">Works</h2>
          <p className="text-slate-400 font-sans text-sm mt-3">
            YouTubeに投稿している演奏動画やサポート実績です。クリックするとその場で再生できます。
          </p>
        </div>
        <a 
          href="https://youtube.com/channel/UCjYzaIL8YhXh671FyjcYikg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <YoutubeIcon className="w-5 h-5 text-red-500" />
          YouTube Channel
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* 最近のお気に入り動画 (Featured) */}
      <div className="featured-video-wrapper">
        <p className="works-section-label">Recent Favorite</p>
        <motion.div
          className="featured-video-card glass-panel"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => setSelectedVideo(featuredVideo)}
        >
          <div className="featured-thumbnail-container">
            <img src={featuredVideo.thumbnail} alt={featuredVideo.title} className="thumbnail-img" />
            <div className="thumbnail-overlay">
              <div className="play-button-ring">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
            <span className="category-badge">Featured</span>
          </div>
          <div className="featured-card-info">
            <span className="text-xs text-slate-500 font-serif">My Favorite</span>
            <h3 className="featured-video-title font-serif mt-2">{featuredVideo.title}</h3>
            <p className="artist-name mt-1">{featuredVideo.artist}</p>
          </div>
        </motion.div>
      </div>

      {/* 通常の動画グリッド */}
      <div>
        <p className="works-section-label">Drum Covers & Support</p>
        <div className="video-grid">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="video-card glass-panel"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* サムネイル部分 */}
              <div className="thumbnail-container" onClick={() => setSelectedVideo(video)}>
                <img src={video.thumbnail} alt={video.title} className="thumbnail-img" />
                <div className="thumbnail-overlay">
                  <div className="play-button-ring">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
                <span className="category-badge">{video.category}</span>
              </div>

              {/* 情報記述 */}
              <div className="card-info">
                <h3 className="video-title font-serif">{video.title}</h3>
                <p className="artist-name">{video.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* foriio への "More" 導線 */}
        <div className="more-works-container">
          <a 
            href="https://fori.io/ushi5555" 
            target="_blank" 
            rel="noopener noreferrer"
            className="more-works-link"
          >
            <span>More Works on foriio</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 動画ポップアップモーダル */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="modal-content glass-panel"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedVideo(null)}>
                <X className="w-6 h-6" />
              </button>
              
              <div className="iframe-wrapper">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6">
                <span className="category-badge inline-block mb-2">{selectedVideo.category}</span>
                <h3 className="text-xl font-serif text-white">{selectedVideo.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{selectedVideo.artist}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ヘッダーマージン調整 */
        .works-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .works-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 24px;
          }
        }

        .mt-3 {
          margin-top: 12px;
        }

        /* お気に入り動画コンテナの下部マージン明示設定 */
        .featured-video-wrapper {
          margin-bottom: 48px;
        }

        .works-section-label {
          font-size: 0.75rem;
          color: #8799a3;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
          font-family: var(--font-serif);
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 900px) {
          .video-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .video-grid {
            grid-template-columns: 1fr;
          }
        }

        /* foriio への More リンク配置 */
        .more-works-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .more-works-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-family: var(--font-sans);
          text-decoration: none;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
        }

        .more-works-link:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        /* 横長お気に入り動画カード */
        .featured-video-card {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
          border-color: rgba(51, 103, 116, 0.15) !important;
        }

        @media (max-width: 768px) {
          .featured-video-card {
            grid-template-columns: 1fr;
          }
        }

        .featured-thumbnail-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .featured-card-info {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.005);
        }

        .featured-video-title {
          font-size: 1.35rem;
          color: white;
          line-height: 1.4;
          font-weight: 400;
        }

        .video-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          cursor: pointer;
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .video-card:hover .thumbnail-img,
        .featured-video-card:hover .thumbnail-img {
          transform: scale(1.03);
        }

        .thumbnail-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13, 18, 22, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .thumbnail-overlay,
        .featured-video-card:hover .thumbnail-overlay {
          opacity: 1;
        }

        .play-button-ring {
          width: 56px;
          height: 56px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13, 18, 22, 0.4);
          backdrop-filter: blur(4px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .video-card:hover .play-button-ring,
        .featured-video-card:hover .play-button-ring {
          transform: scale(1.05);
          border-color: var(--primary);
        }

        .category-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(13, 18, 22, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.04);
          color: #8799a3;
          font-size: 0.7rem;
          font-weight: 400;
          padding: 4px 10px;
          border-radius: 2px;
          backdrop-filter: blur(4px);
          letter-spacing: 0.05em;
        }

        .card-info {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .video-title {
          font-size: 1.1rem;
          color: white;
          line-height: 1.4;
          font-weight: 400;
        }

        .artist-name {
          font-size: 0.85rem;
          color: #8799a3;
        }

        /* モーダル */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13, 18, 22, 0.9);
          backdrop-filter: blur(12px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 800px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: #0d1216;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
        }

        .close-btn:hover {
          background: rgba(239, 68, 68, 0.8);
        }

        .iframe-wrapper {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
        }

        .iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </section>
  );
};
