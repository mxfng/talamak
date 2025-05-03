# Talamak

**Talamak** is a lightweight, YAML-configurable link-in-bio tool built for musicians, creators, and anyone needing a clean landing page for their links.

## Features

- Responsive, ultra modern UI with mobile support
- Support for nested links, like providing multiple streaming services for a link to a song
- Optional toolbar with fuzzy search, mailing list (coming soon), and sharing functionality
- Fast and minimal - configurable via `config.yaml` and static image assets

## Getting Started

### Install & Run

```bash
git clone https://github.com/mxfng/talamak.git
cd talamak
npm install
npm run dev
```

## Configuration

Edit `public/config.yaml` to customize your profile and links.

### Example

```yaml
name: Your Name
bio: Short description (optional)
avatar: /images/avatar.jpg
toolbar: true

items:
  - label: My Music
    image:
      type: fill
      src: /images/cover.jpg
    links:
      - label: Spotify
        url: https://open.spotify.com/artist/your-id
        icon: spotify

  - label: Socials
    links:
      - label: Instagram
        url: https://instagram.com/yourusername
        icon: instagram
```

### Built-in Icons

- **Music**: `spotify`, `apple_music`, `youtube`, `youtube_music`, `amazon_music`, `beatport`, `bandcamp`, `soundcloud`
- **Social**: `tiktok`, `instagram`, `x`, `facebook`, `threads`, `github`
- **Other**: `website`, `info`, `link`

## Deployment

```bash
bun build
```

Deploy the `dist/` directory to any static host (Vercel, Netlify, GitHub Pages, etc.)

## License

[MIT](LICENSE)

---

Made by [mxfng](https://github.com/mxfng)
