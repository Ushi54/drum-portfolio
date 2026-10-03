type Props = {
  id: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

// 各セクション共通の外枠と見出し
export const Section = ({ id, title, lead, action, children }: Props) => (
  <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={`${id}-title`} className="flex items-center gap-3 text-2xl font-bold tracking-wide sm:text-3xl">
          <span aria-hidden className="led-bar h-[1em] w-[3px] rounded-full" />
          {title}
        </h2>
        {lead && <p className="mt-2 pl-[15px] text-muted">{lead}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
);

export const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:bg-raised"
  >
    {children}
  </a>
);
