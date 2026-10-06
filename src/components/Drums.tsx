import { videos, type Video } from '../data/videos';
import { latestVideo } from '../data/latest';
import { youtubeChannelUrl } from '../data/links';
import { Section, TextLink } from './Section';
import { YoutubeEmbed } from './YoutubeEmbed';

export const Drums = () => {
  // 最新のフル動画が下の一覧にも入っている場合は、一覧から外す
  const rest = videos.filter((v) => v.youtubeId !== latestVideo?.id);
  return (
    <Section
      id="drums"
      title="演奏動画"
      lead="カバーやサポートで叩いた動画です。"
      action={<TextLink href={youtubeChannelUrl}>YouTubeチャンネルへ</TextLink>}
    >
      {latestVideo && (
        <article className="mb-10 lg:grid lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-8">
          <YoutubeEmbed youtubeId={latestVideo.id} title={latestVideo.title} />
          <div className="mt-3">
            <span className="inline-block rounded-full bg-raised px-3 py-0.5 text-xs">最新の動画</span>
            <h3 className="mt-2 text-lg font-bold">
              <a href={latestVideo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {latestVideo.title}
              </a>
            </h3>
          </div>
        </article>
      )}
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {rest.map((video) => (
          <article key={video.youtubeId}>
            <YoutubeEmbed youtubeId={video.youtubeId} title={video.title} />
            <VideoMeta video={video} />
          </article>
        ))}
      </div>
    </Section>
  );
};

const VideoMeta = ({ video }: { video: Video }) => (
  <div className="mt-3">
    <span className="inline-block rounded-full bg-raised px-3 py-0.5 text-xs">{video.genre}</span>
    <h3 className="mt-2 text-sm leading-relaxed font-bold">{video.title}</h3>
    <p className="text-sm text-muted">{video.credit}</p>
  </div>
);
