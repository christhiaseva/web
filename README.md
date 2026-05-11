# Christhia Seva Mission — Website

Static HTML website for [Christhia Seva Mission](https://example.org), a faith-led
mission planting churches and supporting education in Karnataka, India.

## Local dev

No build step. Just serve the folder:

```bash
# any static server works
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000.

## Content editing

Content lives in `data/*.json`:
- `students.json` — current students seeking sponsorship
- `churches.json` — churches and their needs
- `stories.json` — past graduates and current student stories
- `site.json` — site-wide config (stats, contact, hero variant)

Once Decap CMS is wired up (see `CLAUDE.md`), staff edit these via `/admin/`.

## Deploy

This is a static site. Deploy any of:
- **Cloudflare Pages** *(recommended)* — connect the GitHub repo, no build command, output dir `/`
- **Netlify** — same, plus enables Netlify Identity for Decap CMS
- **GitHub Pages** — works, but Decap CMS needs an external OAuth proxy

## Donations

Currently a placeholder form. Will be replaced with DonorBox embeds wired to per-fund
campaigns. See `CLAUDE.md` for the wiring plan.

## Project handoff

See `CLAUDE.md` for full architecture, open tasks (deploy, CMS, donations), and
gotchas. That doc is intended to be read by Claude Code or another developer
picking up the project.
