import { contactEmail } from '../data/links';
import { MailIcon } from './icons';

export const Footer = () => (
  <footer className="border-t border-line/40 bg-panel">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-8">
      <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 hover:underline">
        <MailIcon className="size-5" />
        お仕事・ご連絡はメールで
      </a>
      <p className="text-sm text-muted">© {new Date().getFullYear()} うっしー</p>
    </div>
  </footer>
);
