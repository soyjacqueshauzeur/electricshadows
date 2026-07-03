# Youlink

**Extract and organize all content from any YouTube channel** — videos, shorts, lives, courses, playlists, and posts — into categorized, exportable lists. A single-file, zero-dependency HTML application that runs entirely in your browser.

---

## Features

### Content Extraction (6 categories)
| Category | Source | How it's classified |
|----------|--------|---------------------|
| **Videos** | Channel uploads playlist | Duration > 60s, not a live stream |
| **Shorts** | Channel uploads playlist | Duration ≤ 60s |
| **Lives** | Channel uploads playlist | Has `actualStartTime` and `actualEndTime` in `liveStreamingDetails` |
| **Courses** | Channel uploads playlist | Same as videos (duration > 60s) — for grouping longer educational content |
| **Playlists** | `playlists` endpoint | All public playlists of the channel |
| **Posts** | `community` endpoint | Community tab posts (may fail without OAuth; handled gracefully) |

### Smart Channel Input
Accepts multiple formats:
- `@channelHandle`
- `https://www.youtube.com/@channelHandle`
- `https://www.youtube.com/channel/UC...`
- `https://www.youtube.com/c/username`
- Raw channel ID (`UC...`)

### API Key Management
- **AES-256-GCM encryption** via `crypto.subtle` (Web Crypto API)
- Password and salt auto-generated and stored in `localStorage`
- Decryption key never leaves the browser
- **Multi-key rotation**: enter multiple keys (one per line) — if one hits quota or fails, the next key is used automatically
- Automatic migration from plaintext `localStorage` to encrypted storage

### Export Formats
| Format | Extension | Description |
|--------|-----------|-------------|
| Plain Text | `.txt` | Channel info header + pipe-delimited categorized tables |
| Markdown | `.md` | Markdown tables with clickable links |
| HTML | `.html` | Self-contained styled HTML page with tables and links |

### UI
- Dark theme with Tailwind CSS (CDN)
- Lucide icons
- Category tabs with live counts
- Smooth animations (fade-in, spin loader, modal transitions)
- Responsive layout
- Auto-resizing textarea input
- Keyboard support: `Enter` to extract, `Esc` (click outside) to close settings

---

## Architecture

```
index.html          Single-file application (HTML + CSS + JS)
├── HTML            Structure: search box, results area, category tabs, settings modal
├── CSS             Tailwind CDN + inline custom styles (scrollbar, animations, tabs)
└── JavaScript      All logic in a single <script> block
    ├── CryptoManager        AES-256-GCM encryption/decryption for API keys
    ├── fetchAPI()           API call with automatic key rotation on failure
    ├── fetchAPIAllPages()   Paginated API calls (max 20 pages)
    ├── getChannelId()       Channel ID resolution from various input formats
    ├── extractAllFromPlaylist()  Single-pass extraction of videos/shorts/lives/courses
    ├── extractPlaylists()   Playlist extraction
    ├── extractPosts()       Community posts extraction
    ├── formatCategoryData*() TXT, MD, HTML formatters
    └── UI logic             Settings modal, tabs, copy, download, state management
```

### Data Flow
1. User enters a channel reference → `getChannelId()` resolves to a YouTube channel ID
2. `getChannelDetails()` fetches channel metadata (name, description, stats, uploads playlist ID)
3. `extractAllFromPlaylist()` fetches all uploads and classifies each video by duration and live status
4. `extractPlaylists()` and `extractPosts()` run in parallel (sequentially in the UI)
5. Category tabs filter the in-memory data via `activeCategory`
6. Export buttons serialize the categorized data to the selected format

### YouTube Data API v3 Endpoints Used
- `channels` — channel metadata, uploads playlist ID
- `playlistItems` — all uploaded videos
- `videos` — duration and live streaming details
- `playlists` — playlists list
- `community` — community posts
- `search` — fallback channel resolution by handle

---

## Usage

1. Open `index.html` in any modern browser
2. Click the gear icon (top-right) to open API Settings
3. Enter one or more **YouTube Data API v3** keys (one per line)
4. Save changes
5. Paste a YouTube channel link or handle in the search box
6. Click the arrow or press `Enter`
7. Browse results by category tab
8. Export via Copy, TXT, Markdown, or HTML buttons

### Getting a YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select an existing one
3. Enable the **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. (Optional) Restrict the key to the YouTube Data API v3

---

## Browser Compatibility

Requires the Web Crypto API (`crypto.subtle`), available in:
- Chrome 37+
- Firefox 34+
- Safari 11+
- Edge 79+

---

## License

MIT
