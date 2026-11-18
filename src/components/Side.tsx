import { Apps } from './Apps';
import { Writing } from './Writing';

// ドラム（主役）のあとに置く「ドラムのほかの活動」。note とアプリを横に並べる（スマホでは縦）。
export const Side = () => (
  <section aria-labelledby="side-title" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
    <div className="mb-10">
      <p className="text-sm tracking-[0.2em] text-muted">BEYOND THE DRUMS</p>
      <h2 id="side-title" className="mt-2 flex items-center gap-3 text-2xl font-bold tracking-wide sm:text-3xl">
        <span aria-hidden className="led-bar h-[1em] w-[3px] rounded-full" />
        ドラムのほかに
      </h2>
      <p className="mt-2 pl-[15px] text-muted">文章を書いたり、アプリを作ったりもしています。</p>
    </div>
    <div className="grid gap-12 md:grid-cols-2 md:gap-8">
      <Writing />
      <Apps />
    </div>
  </section>
);

type ColumnProps = {
  id: string;
  title: string;
  lead: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

// 「ドラムのほかに」の中の1列（note／アプリ）
export const SideColumn = ({ id, title, lead, action, children }: ColumnProps) => (
  <div id={id} className="scroll-mt-20">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted">{lead}</p>
      </div>
      {action}
    </div>
    {children}
  </div>
);
