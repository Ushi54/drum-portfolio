import { articles } from '../data/articles';
import { latestNote } from '../data/latest';
import { noteUrl } from '../data/links';
import { formatDate } from './format';
import { Section, TextLink } from './Section';

export const Writing = () => {
  // 最新記事がおすすめにも入っている場合は、おすすめ側から外す
  const picks = articles.filter((a) => a.url !== latestNote?.url);
  return (
    <Section
      id="writing"
      title="note"
      lead="ドラムの練習、AIとの付き合い方、道具の話などを書いています。"
      action={<TextLink href={noteUrl}>記事をすべて見る</TextLink>}
    >
      {latestNote && (
        <a
          href={latestNote.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-10 grid overflow-hidden rounded-[2rem] bg-panel md:grid-cols-[1.2fr_1fr] md:items-center"
        >
          <img src={latestNote.thumbnail} alt="" loading="lazy" className="aspect-[1.91/1] w-full object-cover" />
          <div className="p-6 sm:p-8">
            <span className="text-sm text-muted">最新の記事（{formatDate(latestNote.publishedAt)}）</span>
            <p className="mt-2 text-xl leading-relaxed font-bold group-hover:underline sm:text-2xl">{latestNote.title}</p>
          </div>
        </a>
      )}
      <h3 className="mb-3 text-lg font-bold">おすすめの記事</h3>
      <ul className="divide-y divide-line overflow-hidden rounded-[2rem] bg-panel">
        {picks.map((article) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[6.5rem_1fr] items-center gap-4 p-4 transition-colors hover:bg-raised/50 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-5"
            >
              <img src={article.thumbnail} alt="" loading="lazy" className="aspect-[1.91/1] w-full rounded-xl object-cover" />
              <div>
                <p className="leading-relaxed font-bold group-hover:underline sm:text-lg">{article.title}</p>
                <time dateTime={article.publishedAt} className="mt-1 block text-sm text-muted">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};
