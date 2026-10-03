import { videos, type Video } from '../data/videos';
import { youtubeChannelUrl } from '../data/links';
import { Section, TextLink } from './Section';
import { YoutubeEmbed } from './YoutubeEmbed';

export const Drums = () => {
  const [featured, ...rest] = videos;
  return (
    <Section
      id="drums"
      title="演奏動画"
      lead="カバーやサポートで叩いた動画です。"
      action={<TextLink href={youtubeChannelUrl}>YouTubeチャンネルへ</TextLink>}
    >
      <article className="lg:grid lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-8">
        <YoutubeEmbed youtubeId={featured.youtubeId} title={featured.title} />
        <VideoMeta video={featured} />
      </article>
      <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {rest.map((video) => (
          <article key={video.youtubeId}>
            <YoutubeEmbed youtubeId={video.youtubeId} title={video.title} />
            <VideoMeta video={video} small />
          </article>
        ))}
      </div>
    </Section>
  );
};

const VideoMeta = ({ video, small = false }: { video: Video; small?: boolean }) => (
  <div className="mt-3">
    <span className="inline-block rounded-full bg-raised px-3 py-0.5 text-xs">{video.genre}</span>
    <h3 className={`mt-2 font-bold ${small ? 'text-sm leading-relaxed' : 'text-lg'}`}>{video.title}</h3>
    <p className="text-sm text-muted">{video.credit}</p>
  </div>
);
