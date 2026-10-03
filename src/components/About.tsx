import { avatarUrl, bio, gear, inspirations, playStyles } from '../data/profile';
import { Section } from './Section';

export const About = () => (
  <Section id="about" title="うっしーについて">
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <div>
        <img src={avatarUrl} alt="うっしー" className="size-24 rounded-full border-2 border-line object-cover" />
        <div className="mt-6 max-w-prose space-y-4">
          {bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 text-lg font-bold">得意なこと</h3>
          <ul className="space-y-3">
            {playStyles.map((s) => (
              <li key={s.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{s.name}</span>
                  <span className="sr-only">5段階中{s.level}</span>
                  <span aria-hidden className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`size-2.5 rounded-full ${i < s.level ? 'bg-accent' : 'bg-line'}`} />
                    ))}
                  </span>
                </div>
                <p className="text-sm text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">機材</h3>
          <dl className="space-y-3 rounded-xl bg-panel p-6">
            {gear.map((g) => (
              <div key={g.category} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <dt className="text-sm text-muted">{g.category}</dt>
                <dd className="text-sm">
                  <ul>
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    <details className="group mt-10 rounded-xl bg-panel p-6">
      <summary className="cursor-pointer list-none font-bold">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden>
          ▸
        </span>
        影響を受けたアーティスト（{inspirations.length}組）
      </summary>
      <ul className="mt-4 flex flex-wrap gap-2">
        {inspirations.map((a) => (
          <li key={a.name}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-raised px-3 py-1 text-sm transition-colors hover:bg-raised"
            >
              {a.name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  </Section>
);
