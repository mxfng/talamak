import { Helmet } from "react-helmet-async";
import type { Config } from "@/types";

interface SEOProps {
  config: Config;
  title?: string;
  description?: string;
  image?: string;
}

export function SEO({ config, title, description, image }: SEOProps) {
  const siteTitle = title ? `${title} | ${config.name}` : config.name;
  const siteDescription = description || config.bio || "";
  const siteImage = image || config.avatar || "";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      {siteImage && <meta property="og:image" content={siteImage} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {siteImage && <meta name="twitter:image" content={siteImage} />}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
}
