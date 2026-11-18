import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LatestVideo } from '../data/latest';
import { YoutubeEmbed } from './YoutubeEmbed';

const INTERVAL_MS = 6000;

// 最新の動画（新しい順に最大5件）を、横に自動で送るカルーセル。
// - 6秒ごとに次へ。最後の次は、同じ向きに流れて最初に戻る
//   （末尾に1本目の写しを置き、写しまで流れたら、見た目を変えずに本物の1本目へ位置だけ戻す）
// - マウスを乗せている間・キーボードで操作している間・動画を再生した後は止まる
// - 「動きを減らす」設定の端末では自動で送らない
// - 左右のボタン、下の点、スワイプでも切り替えられる
export const VideoCarousel = ({ videos }: { videos: LatestVideo[] }) => {
  // pos は 0〜count。count は末尾に置いた「1本目の写し」の位置
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = videos.length;

  const index = pos % Math.max(count, 1);

  // アニメーションなしで位置を変えてから、次の描画でアニメーションを戻す
  const jump = useCallback((to: number, then?: number) => {
    setAnimate(false);
    setPos(to);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        if (then !== undefined) setPos(then);
      }),
    );
  }, []);

  const next = useCallback(() => setPos((p) => Math.min(p + 1, count)), [count]);
  const prev = useCallback(() => {
    // 1本目から前へは、写しの位置へ瞬間移動してから、逆向きに流す
    if (pos === 0) jump(count, count - 1);
    else setPos(pos - 1);
  }, [pos, count, jump]);
  const go = useCallback((i: number) => setPos(i), []);

  // 写しまで流れ切ったら（アニメーションは0.7秒）、本物の1本目へ位置だけ戻す。
  // transitionend はタブが裏にあると来ないことがあるので、時間で待つ
  useEffect(() => {
    if (count < 2 || pos !== count) return;
    const t = window.setTimeout(() => jump(0), 750);
    return () => window.clearTimeout(t);
  }, [pos, count, jump]);

  useEffect(() => {
    if (count < 2 || paused || playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, playing, next]);

  if (count === 0) return null;

  return (
    <div
      className="mb-10"
      role="region"
      aria-roledescription="カルーセル"
      aria-label="最新の動画"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className={`flex ${animate ? 'transition-transform duration-700 ease-out' : ''} motion-reduce:transition-none`}
          style={{ transform: `translateX(-${pos * 100}%)` }}
        >
          {videos.map((video, i) => (
            <article
              key={video.id}
              aria-roledescription="スライド"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== pos}
              inert={i !== pos}
              className="w-full shrink-0 lg:grid lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-8"
            >
              <YoutubeEmbed youtubeId={video.id} title={video.title} onPlay={() => setPlaying(true)} />
              <div className="mt-3">
                <span className="inline-block rounded-full bg-raised px-3 py-0.5 text-xs">
                  {i === 0 ? '最新の動画' : `新しい動画 ${i + 1}/${count}`}
                </span>
                <h3 className="mt-2 text-lg font-bold">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {video.title}
                  </a>
                </h3>
              </div>
            </article>
          ))}
          {count > 1 && (
            // 1本目の写し（最後から最初へ、同じ向きに流すため）
            <div aria-hidden inert className="w-full shrink-0 lg:grid lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-8">
              <YoutubeEmbed youtubeId={videos[0].id} title={videos[0].title} />
              <div className="mt-3">
                <span className="inline-block rounded-full bg-raised px-3 py-0.5 text-xs">最新の動画</span>
                <h3 className="mt-2 text-lg font-bold">{videos[0].title}</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:bg-raised"
            aria-label="前の動画"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <div className="flex gap-2">
            {videos.map((video, i) => (
              <button
                key={video.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}番目の動画`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'led-bar w-8' : 'w-3 bg-line hover:bg-muted'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:bg-raised"
            aria-label="次の動画"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
};
