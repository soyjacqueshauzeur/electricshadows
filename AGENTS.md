# AGENTS.md

## Project Structure

```
./
├── biorest/              # BioRest website
│   ├── blog/
│   │   └── 2026/04/      # Blog posts
│   ├── images/
│   ├── styles/
│   └── index.html
├── curso-de-composicion-para-fotografia/  # Photography course
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── webfonts/
│   └── index.html
├── images/
├── maderoterapia/        # Wood therapy course
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── webfonts/
│   └── index.html
├── ruso/                # Ruso course
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── webfonts/
│   ├── index.html
│   └── ruso-purchase.html
├── sound/               # Sound Division
│   ├── images/
│   ├── styles/
│   ├── index.html
│   ├── sounddivision-thanks.html
│   ├── form-handler.js
│   └── form-n8n.js
├── styles/
├── index.html
├── politicas.html
├── ecommerce.html
├── script.js
└── commits_names.md
```

## Commit Format

All commits must use JSON (no free-form messages):

```bash
git add -A && git commit -m 'JSON_AQUI' && git push
```

### Commit Types

| Type | Description |
|------|-------------|
| `config` | Configuration changes (GTM, Meta Pixel, etc.) |
| `feature` | New functionality |
| `fix` | Bug fixes |
| `refactor` | Code restructuring without functionality change |
| `style` | CSS, colors, design changes |
| `docs` | Documentation changes |
| `content` | Text content updates |
| `seo` | SEO optimizations |

### Commit JSON Structure

```json
{
  "commit": {
    "date": "YYYY-MM-DD",
    "type": "tipo_de_cambio",
    "summary": "Descripción breve (máx 80 caracteres)",
    "webs": {
      "nombre_web": {
        "path": "ruta/",
        "changes": {
          "archivo.ext": ["Cambio 1", "Cambio 2"]
        }
      }
    }
  }
}
```

## Notes

- Static HTML sites: no build, test, or lint commands
- Each website in its own subdirectory
- Common frameworks used: Bootstrap, jQuery, GSAP, Swiper, Font Awesome