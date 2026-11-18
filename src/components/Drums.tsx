import { videos, type Video } from '../data/videos';
import { latestVideos } from '../data/latest';
import { youtubeChannelUrl } from '../data/links';
import { Section, TextLink } from './Section';
import { VideoCarousel } from './VideoCarousel';
import { YoutubeEmbed } from './YoutubeEmbed';

export const Drums = () => {
  // カルーセルに入っている動画が下の一覧にもある場合は、一覧から外す
  const shown = new Set(latestVideos.map((v) => v.id));
  const rest = videos.filter((v) => !shown.has(v.youtubeId));
  return (
    <Section
      id="drums"
      title="演奏動画"
      lead="カバーやサポートで叩いた動画です。"
      action={<TextLink href={youtubeChannelUrl}>YouTubeチャンネルへ</TextLink>}
    >
      <VideoCarousel videos={latestVideos} />
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
