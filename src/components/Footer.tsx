import { YoutubeIcon, MailIcon } from './Header'; // 再利用

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-panel">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-white font-serif font-bold text-lg">うっしー <span className="text-xs font-sans text-slate-400 font-normal ml-1">-portfolio-</span></p>
          <p className="text-sm text-slate-400 mt-2">© {currentYear} うっしー. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://youtube.com/channel/UCjYzaIL8YhXh671FyjcYikg"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="YouTube"
          >
            <YoutubeIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:test@example.com"
            className="social-link"
            aria-label="Mail"
          >
            <MailIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      <style>{`
        .footer-panel {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background-color: rgba(3, 7, 18, 0.6);
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 10;
        }

        .social-link {
          color: #94a3b8;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: #336774;
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .md\\:flex-row { flex-direction: row; }
        }
        .flex-col { flex-direction: column; }
        .py-12 { padding-top: 48px; padding-bottom: 48px; }
      `}</style>
    </footer>
  );
};
