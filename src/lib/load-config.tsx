import yaml from "js-yaml";
import type { Config, LinkItem, Link, ThemeColors } from "@/types";

// slugify: lowercase, kebab-case
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function applyThemeColors(colors: ThemeColors) {
  Object.entries(colors).forEach(([key, value]) => {
    if (value) {
      const cssVar = `--${key}`;
      document.documentElement.style.setProperty(cssVar, value);
    }
  });
}

// Default configuration to use when config.yaml is missing
const defaultConfig: Config = {
  name: "Talamak",
  bio: "A beautiful, customizable landing page for musicians and artists. Share your music, social media, and more in one place.",
  avatar: "/images/example/avatar.webp",
  toolbar: false,
  items: [
    {
      id: "0-getting-started",
      label: "Getting Started",
      links: [
        {
          id: "0-0-readme",
          label: "Read the README",
          url: "https://github.com/mxfng/talamak",
          icon: "github",
        },
      ],
    },
  ],
};

export async function loadConfig(): Promise<Config> {
  try {
    const res = await fetch("/config.yaml");
    if (!res.ok) {
      console.warn("config.yaml not found, using default configuration");
      return defaultConfig;
    }

    const text = await res.text();
    const raw = yaml.load(text) as Omit<Config, "items"> & {
      items: Omit<LinkItem, "id">[];
    };

    // Apply theme configuration if present
    if (raw.theme) {
      // Set radius if specified
      if (raw.theme.radius) {
        document.documentElement.style.setProperty(
          "--radius",
          raw.theme.radius,
        );
      }

      // Apply colors if specified
      if (raw.theme.colors) {
        applyThemeColors(raw.theme.colors);
      }
    }

    return {
      name: raw.name,
      bio: raw.bio,
      avatar: raw.avatar,
      toolbar: raw.toolbar ?? false,
      theme: raw.theme,
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
  } catch (error) {
    console.error("Error loading config:", error);
    console.warn("Using default configuration");
    return defaultConfig;
  }
}
