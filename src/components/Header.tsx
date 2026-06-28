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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="flex items-center gap-2 text-white font-bold text-xl tracking-wider">
            <Music className="w-5 h-5" style={{ color: '#336774' }} />
            <span className="font-serif text-lg tracking-wide text-white">うっしー</span>
            <span className="text-xs font-sans text-slate-400 font-normal ml-1">-portfolio-</span>
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
        .text-cyan-400 { color: #336774; }
        .hover\\:text-white:hover { color: #ffffff; }
        .hover\\:text-cyan-400:hover { color: #336774; }
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
      `}</style>
    </>
  );
};
