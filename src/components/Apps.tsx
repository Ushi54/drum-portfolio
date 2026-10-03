import { apps } from '../data/apps';
import { Section } from './Section';

export const Apps = () => (
  <Section id="apps" title="つくったアプリ" lead="自分の練習や作業で欲しくなったものを作っています。">
    <div className="grid gap-6 sm:grid-cols-2">
      {apps.map((app) => {
        const body = (
          <>
            <div className="aspect-[1.91/1] overflow-hidden rounded-2xl bg-raised">
              {app.thumbnail ? (
                <img src={app.thumbnail} alt="" loading="lazy" className="size-full object-cover" />
              ) : (
                <div className="grid size-full place-items-center text-muted">準備中</div>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold">{app.title}</h3>
            <p className="mt-1 text-muted">{app.description}</p>
            <span className="mt-3 inline-block text-sm font-bold">
              {app.url ? '開いて使う' : '公開まで少しお待ちください'}
            </span>
          </>
        );
        return app.url ? (
          <a
            key={app.title}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2rem] bg-panel p-4 transition-colors hover:bg-raised sm:p-5"
          >
            {body}
          </a>
        ) : (
          <div key={app.title} className="rounded-[2rem] border-2 border-dashed border-line p-4 sm:p-5">
            {body}
          </div>
        );
      })}
    </div>
  </Section>
);
