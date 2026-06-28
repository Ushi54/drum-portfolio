import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { WaterEffect } from './components/WaterEffect';
import { YoutubeCard } from './components/YoutubeCard';
import { About } from './components/About';
import { Links } from './components/Links';
import { Footer } from './components/Footer';
import { ChevronDown, Sparkles } from 'lucide-react';

function App() {
  const handleScrollToAbout = () => {
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 動的な水面背景エフェクト */}
      <WaterEffect />

      {/* ヘッダー・ナビゲーション */}
      <Header />

      {/* 1. Hero セクション */}
      <section id="home" className="hero-section">
        {/* 背景の有機的な風のそよぎ線画 (ホワイトラインアート) */}
        <div className="hero-line-art-container">
          <svg className="hero-line-art" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 風が戦ぐ（そよぐ）ようなベジェ曲線群 */}
            
            {/* 曲線1: 上から右下に流れる大きな風のうねり */}
            <path 
              d="M -100,120 C 300,50 600,450 1100,320" 
              stroke="rgba(255,255,255,0.07)" 
              strokeWidth="1.6" 
              strokeLinecap="round"
            />
            
            {/* 曲線2: 平行して流れるやや細い風のライン（点線） */}
            <path 
              d="M -50,170 C 320,110 580,490 1150,370" 
              stroke="rgba(255,255,255,0.04)" 
              strokeWidth="1.2" 
              strokeDasharray="8 6" 
              strokeLinecap="round"
            />
            
            {/* 曲線3: 下から大きく中央を通り右上へ流れるうねり */}
            <path 
              d="M -100,420 C 250,520 550,120 1100,180" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="1.6" 
              strokeLinecap="round"
            />
            
            {/* 曲線4: 曲線3に優しく寄り添う繊細なライン */}
            <path 
              d="M -80,460 C 230,550 530,150 1080,210" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1.2" 
              strokeLinecap="round"
            />

            {/* 曲線5: 右下から中央へ向けて優しく吹き上げるようなカーブ */}
            <path 
              d="M 400,550 C 600,480 800,500 1100,420" 
              stroke="rgba(255,255,255,0.045)" 
              strokeWidth="1.4" 
              strokeLinecap="round"
            />

            {/* ドラム/シンバルを連想させる、曲線と交差するアブストラクトな円 */}
            <circle cx="280" cy="230" r="75" stroke="rgba(255,255,255,0.045)" strokeWidth="1.4" />
            <circle cx="280" cy="230" r="115" stroke="rgba(255,255,255,0.02)" strokeWidth="1.0" />
            
            <circle cx="720" cy="380" r="95" stroke="rgba(255,255,255,0.045)" strokeWidth="1.4" />
            <circle cx="720" cy="380" r="145" stroke="rgba(255,255,255,0.015)" strokeWidth="1.0" />
          </svg>
        </div>

        <div className="hero-content relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-slate-900/40 border border-white/5 text-slate-300 text-sm mb-6"
            style={{ borderRadius: '2px' }}
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" style={{ color: '#336774' }} />
            <span>Drummer Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title font-serif"
          >
            Beat the <span className="text-gradient">Silence</span>.<br />
            Sound the <span className="text-gradient">Soul</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-desc font-sans text-slate-400"
          >
            15歳から叩き続けるドラムのビート。楽曲の「余白」と「空気感」を捉え、繊細なニュアンスからダイナミックな高揚感まで、静寂を撃ち抜くリズムの世界へ。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-buttons flex justify-center gap-4 mt-10"
          >
            <button onClick={handleScrollToAbout} className="btn-primary">
              About Me
            </button>
            <a href="#works" className="btn-secondary">
              My Works
            </a>
          </motion.div>
        </div>

        {/* スクロール誘導 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 text-slate-400 hover:text-white"
          onClick={handleScrollToAbout}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* 2. About セクション */}
      <About />

      {/* 3. Works / YouTube セクション */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <YoutubeCard />
      </motion.div>

      {/* 4. Links / Contact セクション */}
      <Links />

      {/* フッター */}
      <Footer />

      <style>{`
        .relative { position: relative; }
        .min-h-screen { min-height: 100vh; }
        .z-10 { z-index: 10; }
        
        /* Hero セクション特有スタイル */
        .hero-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 24px;
          text-align: center;
          overflow: hidden;
        }

        .hero-line-art-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-line-art {
          width: 100%;
          max-width: 1100px;
          height: auto;
          opacity: 0.85;
          animation: floatLineArt 24s ease-in-out infinite;
        }

        @keyframes floatLineArt {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) scale(1.02) rotate(0.4deg);
          }
        }

        .hero-content {
          max-width: 800px;
          margin-top: -40px;
        }

        .hero-title {
          font-size: clamp(2.2rem, 6vw, 4.2rem);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: 0.05em;
          color: white;
        }

        .hero-desc {
          font-size: clamp(1rem, 2vw, 1.25rem);
          max-width: 600px;
          margin: 24px auto 0 auto;
          line-height: 1.6;
        }

        .absolute { position: absolute; }
        .bottom-8 { bottom: 32px; }
        .left-1\\/2 { left: 50%; }
        .-translate-x-1\\/2 { transform: translateX(-50%); }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
