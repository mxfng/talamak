export interface Link {
  label: string;
  url: string;
  icon?: string;
}

export interface LinktreeConfig {
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
}
