import { BookOpen } from 'lucide-react';
import { latestShort } from '../data/latest';
import { noteUrl, youtubeChannelUrl } from '../data/links';
import { YoutubeIcon } from './icons';
import { YoutubeEmbed } from './YoutubeEmbed';

const hiddenTags = new Set(['ドラム', '叩いてみた']);

export const Hero = () => (
  <section id="top" className="foam-wall relative overflow-clip border-b border-line/40">
    {/* 撮影スタジオの縦型LEDバー */}
    <div aria-hidden className="led-bar absolute top-0 bottom-0 right-2.5 w-[3px] md:right-auto md:left-[56%]" />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-2.5 w-[40rem] translate-x-1/2 bg-[radial-gradient(closest-side,rgb(242_244_247/0.07),transparent)] md:right-auto md:left-[56%] md:-translate-x-1/2"
    />
    <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 pt-16 pb-16 sm:px-8 md:grid-cols-[1fr_16rem] md:gap-24 md:pt-20 md:pb-24">
      <div>
        <h1 className="glow text-5xl font-black tracking-[0.12em] sm:text-6xl">うっしー</h1>
        <p className="mt-5 text-lg font-bold sm:text-xl">
          ドラムを叩いて、文章を書いて、
          <br />
          アプリを作っています。
        </p>
        <p className="mt-3 max-w-md text-muted">
          演奏動画、note、つくったもの、各SNSへの入口をこのページにまとめています。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-glow inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-on-accent transition-shadow"
          >
            <YoutubeIcon className="size-5" />
            YouTubeで演奏を見る
          </a>
          <a
            href={noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-base/60 px-5 py-3 font-bold transition-colors hover:border-accent"
          >
            <BookOpen className="size-5" aria-hidden />
            noteを読む
          </a>
        </div>
      </div>

      {latestShort && (
        <figure className="mx-auto w-full max-w-[16rem]">
          <YoutubeEmbed youtubeId={latestShort.id} title={latestShort.caption} vertical />
          <figcaption className="mt-3">
            <span className="block text-sm text-muted">最新のショート動画</span>
            <a href={latestShort.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
              {latestShort.caption}
            </a>
            <span className="mt-1 block text-sm text-muted">
              {latestShort.tags
                .filter((t) => !hiddenTags.has(t))
                .map((t) => `#${t}`)
                .join(' ')}
            </span>
          </figcaption>
        </figure>
      )}
    </div>
  </section>
);
