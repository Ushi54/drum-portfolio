import { bandLinks, personalLinks, type LinkItem } from '../data/links';
import { BrandIcon } from './icons';
import { Section } from './Section';

export const Links = () => (
  <Section id="links" title="リンク">
    <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
      <LinkGroup title="うっしー" items={personalLinks} />
      <LinkGroup title="schirm.（所属バンド）" items={bandLinks} />
    </div>
  </Section>
);

const LinkGroup = ({ title, items }: { title: string; items: LinkItem[] }) => (
  <div>
    <h3 className="mb-3 text-lg font-bold">{title}</h3>
    <ul className="divide-y divide-line/40 overflow-hidden rounded-xl bg-panel">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-raised"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-raised">
              <BrandIcon name={item.icon} className="size-5" />
            </span>
            <span>
              <span className="block font-bold">{item.name}</span>
              <span className="block text-sm text-muted">{item.description}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
