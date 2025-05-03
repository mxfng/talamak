import yaml from "js-yaml";
import type {
  LinktreeConfig,
  LinkItem,
  ImageItem,
  TextItem,
  LinktreeItem,
} from "@/types";

type RawItem = Record<string, unknown> & { label: string; type?: string };
interface RawConfig {
  name: string;
  bio: string;
  avatar: string;
  items: RawItem[];
}

function isRawConfig(obj: unknown): obj is RawConfig {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "name" in obj &&
    "bio" in obj &&
    "avatar" in obj &&
    "items" in obj &&
    Array.isArray((obj as Record<string, unknown>).items)
  );
}

export async function loadConfig(): Promise<LinktreeConfig> {
  const res = await fetch("/config/linktree.yaml");
  const text = await res.text();
  const raw = yaml.load(text);

  if (!isRawConfig(raw)) {
    throw new Error("Invalid config format");
  }

  const items: LinktreeItem[] = raw.items.map((item) => {
    switch (item.type) {
      case "image":
        return {
          type: "image",
          label: item.label,
          src: item.src as string,
          url: item.url as string | undefined,
        } as ImageItem;
      case "text":
        return {
          type: "text",
          label: item.label,
          title: item.title as string,
          content: item.content as string,
          url: item.url as string | undefined,
        } as TextItem;
      case "link":
      default:
        return {
          type: "link",
          label: item.label,
          url: item.url as string,
          icon: item.icon as string | undefined,
        } as LinkItem;
    }
  });

  return {
    name: raw.name,
    bio: raw.bio,
    avatar: raw.avatar,
    items,
  };
}
