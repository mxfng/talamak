import {
  SiSpotify,
  SiApple,
  SiYoutube,
  SiYoutubemusic,
  SiAmazon,
  SiBeatport,
  SiBandcamp,
  SiSoundcloud,
  SiTiktok,
  SiInstagram,
  SiX,
  SiFacebook,
  SiThreads,
  SiGithub,
} from "react-icons/si";
import { FaGlobe, FaInfoCircle, FaLink } from "react-icons/fa";
import { IconType } from "react-icons";
import { LinkIcon } from "@/types";

const iconMap: Record<LinkIcon, IconType> = {
  spotify: SiSpotify,
  apple_music: SiApple,
  youtube: SiYoutube,
  youtube_music: SiYoutubemusic,
  amazon_music: SiAmazon,
  beatport: SiBeatport,
  bandcamp: SiBandcamp,
  soundcloud: SiSoundcloud,
  tiktok: SiTiktok,
  instagram: SiInstagram,
  x: SiX,
  facebook: SiFacebook,
  threads: SiThreads,
  github: SiGithub,
  website: FaGlobe,
  info: FaInfoCircle,
  link: FaLink,
};
interface IconProps {
  name?: string;
  className?: string;
}

export function Icon({ name = "link", className = "size-5" }: IconProps) {
  const IconComponent = iconMap[name as LinkIcon] ?? FaLink;
  return <IconComponent className={className} />;
}
