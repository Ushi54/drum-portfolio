import { BookOpen, FolderOpen, Mail } from 'lucide-react';
import type { LinkIcon } from '../data/links';

type IconProps = { className?: string };

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const YoutubeIcon = ({ className }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const XIcon = ({ className }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg className={className} {...stroke}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ThreadsIcon = ({ className }: IconProps) => (
  <svg className={className} {...stroke}>
    <path d="M12 2a10 10 0 1 0 10 10H18a6 6 0 1 1-6-6h2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => <Mail className={className} aria-hidden />;

const icons: Record<LinkIcon, (p: IconProps) => React.ReactElement> = {
  youtube: YoutubeIcon,
  x: XIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  threads: ThreadsIcon,
  note: ({ className }) => <BookOpen className={className} aria-hidden />,
  portfolio: ({ className }) => <FolderOpen className={className} aria-hidden />,
};

export const BrandIcon = ({ name, className }: { name: LinkIcon } & IconProps) => {
  const Icon = icons[name];
  return <Icon className={className} />;
};
