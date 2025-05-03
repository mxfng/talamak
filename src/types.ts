interface BaseItem {
  label: string;
  url?: string;
}

export interface LinkItem extends BaseItem {
  type: "link";
  icon?: string;
}

export interface ImageItem extends BaseItem {
  type: "image";
  src: string;
}

export interface TextItem extends BaseItem {
  type: "text";
  content: string;
}

export type LinktreeItem = LinkItem | ImageItem | TextItem;

export interface LinktreeConfig {
  name: string;
  bio: string;
  avatar: string;
  items: LinktreeItem[];
}
