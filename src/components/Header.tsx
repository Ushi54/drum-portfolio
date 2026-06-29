import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music } from 'lucide-react';

export const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'default';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#works' },
    { name: 'Links', href: '#links' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* ロゴ */}
          <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-1.5 text-white font-bold tracking-wider logo-container">
            <Music className="w-5 h-5 logo-music-icon" style={{ color: 'var(--primary)' }} />
            <span className="font-serif text-white logo-name">うっしー</span>
            <span className="font-sans text-slate-400 font-normal logo-sub">-portfolio-</span>
          </a>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* デスクトップ用テーマセレクター */}
          <div className="hidden md:flex items-center gap-3 mr-4 theme-selector-container">
            <button 
              onClick={() => setTheme('default')} 
              className={`theme-dot theme-dot-default ${theme === 'default' ? 'active' : ''}`}
              title="デフォルト（深夜）"
              aria-label="Default Theme"
            />
            <button 
              onClick={() => setTheme('matcha')} 
              className={`theme-dot theme-dot-matcha ${theme === 'matcha' ? 'active' : ''}`}
              title="抹茶"
              aria-label="Matcha Theme"
            />
            <button 
              onClick={() => setTheme('aoi')} 
              className={`theme-dot theme-dot-aoi ${theme === 'aoi' ? 'active' : ''}`}
              title="蒼"
              aria-label="Aoi Theme"
            />
            <button 
              onClick={() => setTheme('momiji')} 
              className={`theme-dot theme-dot-momiji ${theme === 'momiji' ? 'active' : ''}`}
              title="紅葉"
              aria-label="Momiji Theme"
            />
            <button 
              onClick={() => setTheme('monochrome')} 
              className={`theme-dot theme-dot-monochrome ${theme === 'monochrome' ? 'active' : ''}`}
              title="白黒"
              aria-label="Monochrome Theme"
            />
          </div>

          {/* デスクトップSNSリンク */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://youtube.com/channel/UCjYzaIL8YhXh671FyjcYikg" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-400 transition-colors">
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <a href="mailto:ushi.54.log@gmail.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Contact">
              <MailIcon className="w-5 h-5" />
            </a>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-cyan-400 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* モバイルナビゲーションメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-lg md:hidden flex flex-col justify-center items-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-2xl font-serif text-slate-200 hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-6 mt-8">
              <a href="https://youtube.com/channel/UCjYzaIL8YhXh671FyjcYikg" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-400 transition-colors">
                <YoutubeIcon className="w-6 h-6" />
              </a>
              <a href="mailto:ushi.54.log@gmail.com" className="text-slate-400 hover:text-white transition-colors" aria-label="Contact">
                <MailIcon className="w-6 h-6" />
              </a>
            </div>

            {/* モバイルメニュー内部用テーマセレクター */}
            <div className="flex items-center gap-4 mt-6 px-4 py-2 bg-slate-900/40 rounded-full border border-white/5">
              <span className="text-xs text-slate-500 font-serif mr-1">Theme</span>
              <button 
                onClick={() => setTheme('default')} 
                className={`theme-dot theme-dot-default ${theme === 'default' ? 'active' : ''}`}
                aria-label="Default Theme"
              />
              <button 
                onClick={() => setTheme('matcha')} 
                className={`theme-dot theme-dot-matcha ${theme === 'matcha' ? 'active' : ''}`}
                aria-label="Matcha Theme"
              />
              <button 
                onClick={() => setTheme('aoi')} 
                className={`theme-dot theme-dot-aoi ${theme === 'aoi' ? 'active' : ''}`}
                aria-label="Aoi Theme"
              />
              <button 
                onClick={() => setTheme('momiji')} 
                className={`theme-dot theme-dot-momiji ${theme === 'momiji' ? 'active' : ''}`}
                aria-label="Momiji Theme"
              />
              <button 
                onClick={() => setTheme('monochrome')} 
                className={`theme-dot theme-dot-monochrome ${theme === 'monochrome' ? 'active' : ''}`}
                aria-label="Monochrome Theme"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Tailwind風ヘルパー（Tailwind無効化時のため） */
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .gap-6 { gap: 24px; }
        .gap-8 { gap: 32px; }
        .hidden { display: none; }
        @media (min-width: 768px) {
          .md\\:flex { display: flex; }
          .md\\:hidden { display: none; }
        }
        .fixed { position: fixed; }
        .top-0 { top: 0; }
        .left-0 { left: 0; }
        .w-full { width: 100%; }
        .z-50 { z-index: 50; }
        .z-40 { z-index: 40; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
        .py-6 { padding-top: 24px; padding-bottom: 24px; }
        .px-6 { padding-left: 24px; padding-right: 24px; }
        .max-w-6xl { max-width: 1200px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .bg-transparent { background-color: transparent; }
        .bg-slate-950\\/80 { background-color: rgba(13, 18, 22, 0.8); }
        .bg-slate-950\\/95 { background-color: rgba(13, 18, 22, 0.95); }
        .border-b { border-bottom-width: 1px; }
        .border-white\\/5 { border-color: rgba(255, 255, 255, 0.03); }
        .text-white { color: #ffffff; }
        .text-slate-300 { color: #cbd5e1; }
        .text-slate-400 { color: #94a3b8; }
        .text-cyan-400 { color: var(--primary); }
        .hover\:text-white:hover { color: #ffffff; }
        .hover\:text-cyan-400:hover { color: var(--primary); }
        .hover\\:text-red-400:hover { color: #5c7b8c; }
        .font-bold { font-weight: 700; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xs { font-size: 0.75rem; }
        .px-2 { padding-left: 8px; padding-right: 8px; }
        .py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
        .rounded { border-radius: 2px; }
        .bg-cyan-950 { background-color: #1e293b; }
        .border-cyan-800\\/50 { border-color: rgba(255, 255, 255, 0.05); }
        .tracking-wider { letter-spacing: 0.05em; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .mt-8 { margin-top: 32px; }

        /* SVGアイコンサイズ強制 */
        svg.w-5 {
          width: 20px;
          height: 20px;
        }
        svg.w-6 {
          width: 24px;
          height: 24px;
        }

        /* テーマセレクタードット */
        .theme-selector-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
        }

        .theme-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
          outline: none;
        }
        
        .theme-dot-default {
          background-color: #336774;
        }
        
        .theme-dot-matcha {
          background-color: #6A8372;
        }
        
        .theme-dot-aoi {
          background-color: #0089A7;
        }
        
        .theme-dot-momiji {
          background-color: #8E354A;
        }
        
        .theme-dot-monochrome {
          background-color: #FFFFFF;
        }
        
        .theme-dot:hover {
          transform: scale(1.25);
          border-color: rgba(255, 255, 255, 0.6);
        }
        
        .theme-dot.active {
          transform: scale(1.15);
          border-color: #ffffff;
          box-shadow: 0 0 8px var(--primary);
        }
        
        .logo-container {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        
        .logo-name {
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }
        
        .logo-sub {
          font-size: 0.75rem;
          margin-left: 2px;
          opacity: 0.8;
        }

        @media (max-width: 480px) {
          .logo-name {
            font-size: 0.95rem;
          }
          .logo-sub {
            font-size: 0.65rem;
          }
          svg.logo-music-icon {
            width: 16px;
            height: 16px;
          }
        }

        .mr-2 { margin-right: 8px; }
        .mr-3 { margin-right: 12px; }
        .mr-4 { margin-right: 16px; }
        .px-4 { padding-left: 16px; padding-right: 16px; }
        .py-2 { padding-top: 8px; padding-bottom: 8px; }
        .mt-6 { margin-top: 24px; }
        .rounded-full { border-radius: 9999px; }
        .bg-slate-900\\/40 { background-color: rgba(15, 23, 42, 0.4); }
        .border-white\\/5 { border-color: rgba(255, 255, 255, 0.05); }
      `}</style>
    </>
  );
};
