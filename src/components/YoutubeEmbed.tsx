import { useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  youtubeId: string;
  title: string;
  vertical?: boolean;
};

// 押すまではサムネイルだけ表示して、ページを軽く保つ
export const YoutubeEmbed = ({ youtubeId, title, vertical = false }: Props) => {
  const [active, setActive] = useState(false);
  const aspect = vertical ? 'aspect-[9/16]' : 'aspect-video';
  const thumb = vertical
    ? `https://i.ytimg.com/vi/${youtubeId}/oar2.jpg`
    : `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (active) {
    return (
      <iframe
        className={`${aspect} w-full rounded-2xl bg-base`}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`group relative ${aspect} w-full overflow-hidden rounded-2xl bg-raised`}
      aria-label={`${title} を再生`}
    >
      <img src={thumb} alt="" loading="lazy" className="size-full object-cover" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent/90 text-on-accent transition-transform group-hover:scale-110">
          <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
};
