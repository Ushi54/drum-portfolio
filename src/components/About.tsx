import React from 'react';
import { motion } from 'framer-motion';
import { Music, Info, Star } from 'lucide-react';

export const About: React.FC = () => {
  const favoriteArtists = [
    'ヨルシカ', 'ずっと真夜中でいいのに。', 'NoisyCell', 'Fall Out Boy', 
    'Polyphia', 'Fear, and Loathing in Las Vegas', 'the band apart', 
    'harha', 'mabanua', 'supercell', 'haruka nakamura'
  ];

  // 詳細・整理された正確な愛用機材データ
  const gearCategories = [
    {
      title: 'Acoustic Drums',
      items: [
        'Yamaha RBS1455 (Snare 14"×5.5")',
        'Zildjian 漢家兒 18" (China)',
        '小出 808 Splash 8"',
        'Pearl 110HC (Sticks)'
      ]
    },
    {
      title: 'Pedal & E-Drums',
      items: [
        'Yamaha FP9C (Bass Pedal)',
        'Roland TD713SC-S (E-Drums)'
      ]
    },
    {
      title: 'Camera & Optics',
      items: [
        'Canon EOS Kiss M',
        'EF-M22mm F2 STM (Lens)'
      ]
    },
    {
      title: 'Creative Software',
      items: [
        'Logic Pro (DAW)',
        'Final Cut Pro X (Video)'
      ]
    }
  ];

  // ユーザー様との対話から設定した星5段階の強み・プレイスタイル
  const drummingStrengths = [
    { name: 'J-Rock / Vocaloid / Anime', rating: 5, note: '得意ジャンル・動画投稿多数' },
    { name: 'Live Performance', rating: 5, note: '自分がステージで一番楽しむ＆楽しませる！' },
    { name: 'Groove & Space (余白と空気感)', rating: 4, note: '楽曲を引き立てるリズムの「間」' },
    { name: 'Tone & Tuning (音作り)', rating: 4, note: 'Yamaha × Zildjian × 小出 などの組み合わせ' },
    { name: 'Jazz / Instrumental', rating: 2, note: '挑戦中・絶賛練習強化中！☕' },
  ];

  return (
    <section id="about" className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">About Me</h2>
      </div>

      <div className="about-grid">
        {/* 左側：プロフィール概要 */}
        <motion.div 
          className="glass-panel profile-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="avatar-container">
            <img 
              src="https://ugc.production.linktr.ee/fb5396ce-df03-4e1d-baac-b481b681f767_IMG-0483.jpeg?io=true&size=avatar-v3_0" 
              alt="うっしー" 
              className="avatar-img"
            />
          </div>
          <h3 className="profile-name font-serif text-2xl text-white mt-6">うっしー</h3>
          <p className="profile-title text-gradient font-bold mt-1">Drummer</p>
          
          <p className="profile-bio text-slate-300 mt-6 leading-relaxed text-sm">
            15歳からドラムを始め、YouTubeのレッスン動画などを参考に独学でスキルを磨いてきました。
            ボカロ、ロック、アニソンなど幅広いジャンルをカバーし、ドラムカバーやコラボ演奏動画の投稿、
            楽曲でのドラム担当、および自身の所属バンド「schirm. (シルム)」での活動を行っています。
          </p>
 
          <p className="profile-bio text-slate-300 mt-4 leading-relaxed text-sm">
            ドラムを叩くときは、ボーカルが歌いやすい演奏を一番に意識しつつ、ゴーストノートを交えた繊細なニュアンスも大切にしてます。
            ライブでは「自分がステージ上で一番楽しむこと」をモットーに、見ている人も一緒に楽しめるようなドラムを目指してます！
          </p>
        </motion.div>

        {/* 右側：ドラム特性や使用機材 */}
        <div className="skill-column">
          {/* プレイスタイルの特徴 (星5つ評価) */}
          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="card-sub-title font-serif text-white mb-6 flex items-center gap-2">
              <Music className="w-5 h-5" style={{ color: '#336774' }} />
              Play Style & Focus
            </h4>
            <div className="skill-bars">
              {drummingStrengths.map((strength) => (
                <div key={strength.name} className="skill-bar-item">
                  <div className="flex justify-between items-start">
                    <div className="info-area">
                      <span className="font-serif text-sm text-slate-200 block">{strength.name}</span>
                      {strength.note && (
                        <span className="text-xxs text-slate-500 font-sans mt-1 block">{strength.note}</span>
                      )}
                    </div>
                    {/* 星レーティング */}
                    <div className="flex gap-1 items-center rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 star-icon" 
                          style={{ 
                            color: i < strength.rating ? '#336774' : '#1b2631',
                            fill: i < strength.rating ? '#336774' : 'transparent',
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 使用機材 ＆ アーティスト */}
          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="card-sub-title font-serif text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5" style={{ color: '#336774' }} />
              Gear & Favorites
            </h4>
            
            <div className="gear-wrapper">
              <p className="about-section-label">My Gear</p>
              <div className="gear-categories-grid">
                {gearCategories.map((category) => (
                  <div key={category.title} className="gear-category-block">
                    <p className="gear-category-subtitle font-serif text-slate-300 mb-2">{category.title}</p>
                    <ul className="text-xs text-slate-400 leading-relaxed list-none pl-0 mb-0">
                      {category.items.map((item) => (
                        <li key={item} className="mb-1 flex items-start gap-1">
                          <span className="bullet-point">・</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspirations用コンテナ（個別にpaddingを設定） */}
            <div className="inspirations-container">
              <p className="about-section-label">Inspirations</p>
              <div className="flex flex-wrap gap-2">
                {favoriteArtists.map((artist) => (
                  <span key={artist} className="skill-badge artist-badge">{artist}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        #about {
          padding-bottom: 120px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .skill-column {
            margin-bottom: 32px;
          }
        }

        .profile-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 32px;
        }

        .skill-column .glass-panel {
          padding: 32px;
          margin-bottom: 24px;
        }

        .skill-column .glass-panel:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 600px) {
          .profile-card {
            padding: 32px 20px;
          }
          .skill-column .glass-panel {
            padding: 24px 20px;
          }
        }

        .avatar-container {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(51, 103, 116, 0.4);
          box-shadow: 0 0 15px rgba(51, 103, 116, 0.15);
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-bio {
          text-align: left;
          padding: 8px 4px;
        }

        .card-sub-title {
          font-size: 1.15rem;
          margin-bottom: 18px;
        }

        .gear-wrapper {
          margin-bottom: 40px;
        }

        .about-section-label {
          font-size: 0.75rem;
          color: #8799a3;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .skill-badge {
          font-size: 0.75rem;
          padding: 6px 12px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          color: #8799a3;
          transition: all 0.4s ease;
        }

        .artist-badge:hover {
          background: rgba(51, 103, 116, 0.08);
          border-color: rgba(51, 103, 116, 0.3);
          color: #e6ebed;
          transform: translateY(-1px);
        }

        .flex-wrap {
          display: flex;
          flex-wrap: wrap;
        }

        .skill-bars {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skill-bar-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          padding-bottom: 12px;
        }

        .skill-bar-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .rating-stars {
          flex-shrink: 0;
        }

        .star-icon {
          stroke-width: 1.5;
        }

        .info-area {
          flex-grow: 1;
          padding-right: 16px;
        }

        .bullet-point {
          color: var(--primary);
          font-weight: bold;
        }

        .text-xxs {
          font-size: 0.7rem;
        }

        .block {
          display: block;
        }

        .mt-1 {
          margin-top: 4px;
        }

        /* ギアのカテゴリ分けグリッドとインサイドパネル設定 */
        .gear-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 600px) {
          .gear-categories-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .gear-category-block {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          padding: 16px; /* 各機材ブロック内のインサイド余白 */
          transition: border-color 0.3s;
        }

        .gear-category-block:hover {
          border-color: rgba(51, 103, 116, 0.1);
        }

        .gear-category-subtitle {
          font-size: 0.8rem;
          border-left: 2px solid var(--primary);
          padding-left: 8px;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        /* Inspirationsブロック用コンテナ */
        .inspirations-container {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          padding: 16px; /* お気に入りアーティスト欄内のインサイド余白 */
          margin-top: 24px; /* 機材欄との縦余白 */
          margin-bottom: 16px; /* カード底辺との間の余白を追加 */
          transition: border-color 0.3s;
        }

        .inspirations-container:hover {
          border-color: rgba(51, 103, 116, 0.1);
        }
      `}</style>
    </section>
  );
};
