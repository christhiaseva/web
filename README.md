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

## Deploy (Cloudflare Pages)

This is a static site with no build step. Recommended host: **Cloudflare Pages**.

### Setup

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. Select **Connect to Git** and authorize access to `christhiaseva/web`
3. Configure the build:
   - **Project name**: `csm-web` (or whatever you prefer — this determines the `*.pages.dev` subdomain)
   - **Production branch**: `main`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (root)
4. Click **Save and Deploy**

The site will be live at `https://<project-name>.pages.dev` within a minute.

### Custom domain

Once you have a domain (e.g. `christhiaseva.org`):

1. In the Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `christhiaseva.org`)
3. Add these DNS records at your registrar (or in Cloudflare DNS if the domain is on Cloudflare):

| Type  | Name | Target                          |
|-------|------|---------------------------------|
| CNAME | @    | `<project-name>.pages.dev`      |
| CNAME | www  | `<project-name>.pages.dev`      |

Cloudflare handles HTTPS automatically.

### How deploys work

Every push to `main` triggers a new deploy automatically. Preview deploys are
created for pull requests.

## Donations

Currently a placeholder form. Will be replaced with DonorBox embeds wired to per-fund
campaigns. See `CLAUDE.md` for the wiring plan.

## Project handoff

See `CLAUDE.md` for full architecture, open tasks (deploy, CMS, donations), and
gotchas. That doc is intended to be read by Claude Code or another developer
picking up the project.
