import yaml from "js-yaml";
import type { Config, LinkItem, Link } from "@/types";

// slugify: lowercase, kebab-case
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function loadConfig(): Promise<Config> {
  const res = await fetch("/config.yaml");
  const text = await res.text();
  const raw = yaml.load(text) as Omit<Config, "items"> & {
    items: Omit<LinkItem, "id">[];
  };

  return {
    name: raw.name,
    bio: raw.bio,
    avatar: raw.avatar,
    toolbar: raw.toolbar ?? false,
    items: raw.items.map((item, itemIndex) => {
      const slug = slugify(item.label);
      const itemId = `${itemIndex}-${slug}`;

      const links: Link[] = item.links.map((link, linkIndex) => ({
        id: `${itemIndex}-${linkIndex}-${slugify(link.label)}`,
        label: link.label,
        url: link.url,
        icon: link.icon,
      }));

      return {
        id: itemId,
        label: item.label,
        image: item.image
          ? { type: item.image.type, src: item.image.src }
          : undefined,
        links,
      };
    }),
  };
}
