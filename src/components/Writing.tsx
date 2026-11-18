import { articles } from '../data/articles';
import { latestNote } from '../data/latest';
import { noteUrl } from '../data/links';
import { formatDate } from './format';
import { SideColumn } from './Side';
import { TextLink } from './Section';

// 「ドラムのほかの活動」の左側：note
export const Writing = () => {
  // 最新記事がおすすめにも入っている場合は、おすすめ側から外す
  const picks = articles.filter((a) => a.url !== latestNote?.url);
  return (
    <SideColumn
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
          className="group block overflow-hidden rounded-[1.5rem] border border-line/60 bg-panel"
        >
          <img src={latestNote.thumbnail} alt="" loading="lazy" className="aspect-[1.91/1] w-full object-cover grayscale" />
          <div className="p-5">
            <span className="text-sm text-muted">最新の記事（{formatDate(latestNote.publishedAt)}）</span>
            <p className="mt-1 text-lg leading-relaxed font-bold group-hover:underline">{latestNote.title}</p>
          </div>
        </a>
      )}
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[1.5rem] bg-panel">
        {picks.map((article) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[6.5rem_1fr] items-center gap-4 p-4 transition-colors hover:bg-raised/50"
            >
              <img src={article.thumbnail} alt="" loading="lazy" className="aspect-[1.91/1] w-full rounded-lg object-cover grayscale" />
              <div>
                <p className="text-sm leading-relaxed font-bold group-hover:underline">{article.title}</p>
                <time dateTime={article.publishedAt} className="mt-1 block text-xs text-muted">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SideColumn>
  );
};
