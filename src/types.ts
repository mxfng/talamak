export type LinkIcon =
  | "spotify"
  | "apple_music"
  | "youtube"
  | "youtube_music"
  | "amazon_music"
  | "beatport"
  | "bandcamp"
  | "soundcloud"
  | "tiktok"
  | "instagram"
  | "x"
  | "facebook"
  | "threads"
  | "github"
  | "website"
  | "info"
  | "link";

export type LinkImageType = "fill" | "icon";

export interface LinkImage {
  type: LinkImageType;
  src: string;
}

export interface Link {
  id: string;
  label: string;
  url: string;
  icon?: LinkIcon;
}

export interface LinkItem {
  id: string;
  label: string;
  links: Link[];
  image?: LinkImage;
}

export interface ThemeColors {
  background?: string;
  foreground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
}

export interface Theme {
  colors?: ThemeColors;
  radius?: string;
}

export interface Config {
  name: string;
  bio?: string;
  avatar?: string;
  toolbar: boolean;
  items: LinkItem[];
  theme?: Theme;
}
