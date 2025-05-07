# Talamak - Artist Landing Page

A beautiful, customizable landing page for musicians and artists. Share your music, social media, and more in one place.

## Quick Start

1. **Clone this repository**

   ```bash
   git clone https://github.com/mxfng/talamak.git
   cd talamak
   ```

2. **Create your config file**

   ```bash
   cp public/config.example.yaml public/config.yaml
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Start the development server**
   ```bash
   bun dev
   ```

## Customizing Your Page

Edit the `public/config.yaml` file to personalize your page.

```yaml
# Your name or artist name
name: Your Name

# A short bio
bio: Your bio here

# Profile picture (place in /public/images/)
avatar: /images/avatar.png

# Toolbar (experimental, unfinished - do not use in production)
toolbar: false # only set to true if you're interested in testing

# Your content sections
items:
  # Example: Music release
  - label: Your Release Name
    image:
      type: fill # or "icon" for smaller images
      src: /images/your-image.png
    links:
      - label: Spotify
        url: https://open.spotify.com/your-track
        icon: spotify
      - label: Apple Music
        url: https://music.apple.com/your-track
        icon: apple_music

  # Example: Social Media
  - label: Social Media
    image:
      type: icon
      src: /images/social-icon.png
    links:
      - label: Instagram
        url: https://instagram.com/yourusername
        icon: instagram
      - label: TikTok
        url: https://tiktok.com/@yourusername
        icon: tiktok

  # Example: About Section
  - label: About
    links:
      - label: Biography
        url: https://yourwebsite.com/about
        icon: info
      - label: Press Kit
        url: https://yourwebsite.com/press
        icon: link
```

### Advanced Configuration Options

#### Theme Customization

You can customize the appearance of your page by adding a `theme` section to your config:

```yaml
theme:
  # Border radius for UI elements (e.g., "0.5rem", "8px")
  radius: "0.5rem"

  # Custom colors (using OKLCH format)
  colors:
    background: "oklch(0.141 0.005 285.823)"
    foreground: "oklch(0.985 0 0)"
    primary: "oklch(0.92 0.004 286.32)"
    primaryForeground: "oklch(0.21 0.006 285.885)"
    secondary: "oklch(0.274 0.006 286.033)"
    secondaryForeground: "oklch(0.985 0 0)"
    muted: "oklch(0.274 0.006 286.033)"
    mutedForeground: "oklch(0.705 0.015 286.067)"
    border: "oklch(1 0 0 / 10%)"
    input: "oklch(1 0 0 / 15%)"
    ring: "oklch(0.552 0.016 285.938)"
```

#### Link Item Configuration

Each item in your `items` array can be configured with:

```yaml
items:
  - id: "unique-id" # Optional unique identifier
    label: "Section Title"
    image:
      type: "fill" # or "icon" for smaller images
      src: "/images/your-image.png"
    links:
      - id: "link-id" # Optional unique identifier
        label: "Link Label"
        url: "https://your-url.com"
        icon: "spotify" # Optional icon
```

### Available Icons

- **Music Platforms**: `spotify`, `apple_music`, `youtube`, `youtube_music`, `amazon_music`, `beatport`, `bandcamp`, `soundcloud`
- **Social Media**: `tiktok`, `instagram`, `x`, `facebook`, `threads`, `github`
- **Other**: `website`, `info`, `link`

### Image Guidelines

- Place all images in the `/public/images/` folder
- Use PNG or JPG format
- For album covers and large images, use `type: fill`
- For icons and small images, use `type: icon`

## Deploying Your Page

1. **Build the project**

   ```bash
   bun build
   ```

2. **Deploy to your preferred hosting service**
   - [Vercel](https://vercel.com) (recommended)
   - [Netlify](https://netlify.com)
   - [GitHub Pages](https://pages.github.com)

## Need Help?

- Check the [example config](public/config.yaml) for reference
- Open an issue on GitHub
- Join our [Discord community](https://discord.gg/talamak)

## License

MIT License - feel free to use this template for your personal or commercial projects.

---

Made by [mxfng](https://github.com/mxfng)
