# Christhia Seva Mission — Project Handoff

This is a static React (via inline Babel) prototype for the CSM ministry website.
Everything is hosted as flat HTML — no build step, no server.

## Architecture

```
index.html        ← entry; loads React + Babel + all .jsx files
app.jsx           ← router, tweaks, shared state
home.jsx          ← home page (hero variants, ministries, Silpa story, map, timeline)
education.jsx     ← Sponsor a Student grid
profile.jsx       ← Single student detail page
sponsor.jsx       ← Sponsor flow (legacy — donate.jsx is canonical now)
donate.jsx        ← Donation page (handles ?fund=education&id=priya etc.)
churches.jsx      ← Help Plant a Church page
stories.jsx       ← Student stories page (past + current)
story.jsx         ← Our Story (Mathew & Mary's founding narrative)
shared.jsx        ← Nav, Footer, Verse, Eyebrow, common UI
styles.css        ← All styling
image-slot.js     ← Drag-and-drop image placeholder web component
tweaks-panel.jsx  ← In-page tweaks UI (toggle from Open Macroscope toolbar)
data/*.json       ← Content (students, churches, stories, site config)
admin/            ← Decap CMS admin page (config.yml + index.html)
```

### Data model

**Students** are single-sponsor, $200/year. `data/students.json` is the source of truth.
At runtime, `app.jsx` fetches all four JSON files in parallel before mounting the React tree
and assigns them to:

- `window.STUDENTS` — array of student records (from `data/students.json`)
- `window.CHURCHES` — array of church records (from `data/churches.json`)
- `window.STORIES`  — array of story records (from `data/stories.json`)
- `window.SITE`     — site config (from `data/site.json`)

Components read these globals. Nothing else fetches.

### Routing

`app.jsx` owns a tiny pushState router with clean URLs:
`/sponsor-a-student`, `/student/priya`, `/our-story`, `/student-stories`,
`/plant-a-church`, `/donate/:fund/:id?amount=N`. All inter-page links call
`navigate(page, params)` which is passed down as a prop. Back/forward and
refresh work via `popstate`.

**SPA fallback (required for deploy):** `_redirects` at the project root
contains `/*  /index.html  200` — both Cloudflare Pages and Netlify honor
this file natively so deep links (e.g. `/student/priya`) serve `index.html`
instead of 404'ing on direct visit. If you ever switch to a host that does
not read `_redirects`, set up an equivalent rewrite rule there.

---

# Open Tasks (Steps 2–4)

This handoff covers everything needed to take the prototype from "running locally"
to "live, editable, accepting donations." Original main agent already completed
**Step 1 — extract data to JSON** (the `data/` folder above).

## Step 2 — Deploy to Cloudflare Pages or Netlify

Static site, no build step. Recommended: **Cloudflare Pages**.

### What you (Claude Code) can do
1. `git init`, commit everything, write a clean `.gitignore` (ignore `.image-slots.state.json`,
   `node_modules/`, `.DS_Store`).
2. Help the user create a GitHub repo and push.
3. Write a deploy `README.md` explaining the Cloudflare Pages flow.
4. Configure custom domain DNS records when the user shares their domain.

### What only the user can do
- Create the Cloudflare/Netlify account.
- Click "Connect to GitHub" and authorize.
- Add the custom domain at their registrar.

### Build settings
- **Build command**: *(none — leave empty)*
- **Output directory**: `/` (root)
- **Node version**: not needed

---

## Step 3 — Decap CMS

`admin/index.html` and `admin/config.yml` are scaffolded. The user will be able to
log in at `/admin/` and edit `data/*.json` through forms. Edits commit to GitHub;
the site auto-rebuilds.

### What you (Claude Code) can do
1. Update `admin/config.yml` `backend.repo` to `OWNER/REPO` once the GitHub repo exists.
2. Add image-upload widgets — wire `media_folder: images/uploads` and update each
   student/church record's `photo` field to point at the uploaded path.
3. Set up the OAuth proxy. Two paths:

   **Path A — Netlify Identity (easiest if hosting on Netlify):**
   - Switch `backend.name` in `config.yml` from `github` to `git-gateway`.
   - Have user enable Identity + Git Gateway in Netlify dashboard.
   - Add `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`
     to `index.html` and `admin/index.html`.

   **Path B — Cloudflare Worker OAuth proxy (if hosting on Cloudflare):**
   - Write the worker (`worker.js`) — ~50 lines, exchanges GitHub OAuth code for token.
     Reference: https://decapcms.org/docs/external-oauth-clients/
   - Tell user to register a GitHub OAuth App pointing at the worker URL.
   - Add `base_url: https://oauth-proxy.<user>.workers.dev` to `config.yml`.

4. Test the editor flow locally with `decap-server` or by deploying a preview branch.
5. Write a 1-page "How to edit content" guide for non-technical staff
   (`docs/editing-guide.md`).

### What only the user can do
- Authorize the GitHub OAuth App.
- Create the first admin user (Netlify Identity invite, or add their GitHub username
  to a collaborators list).

---

## Step 4 — Donations (DonorBox or Stripe)

The Donate page (`donate.jsx`) currently shows a fake form. It needs to be replaced
with a real payment widget.

### Recommendation: DonorBox

DonorBox is the easiest path for a nonprofit. They handle PCI, tax receipts, recurring
billing, and have a free tier. The user creates **campaigns** in the DonorBox dashboard
(one per fund — e.g. "Sponsor a Student", "Help Plant a Church", "General Fund", plus
one per active student/church if you want per-recipient tracking) and gets an embed code.

### What you (Claude Code) can do
1. Replace the form section of `donate.jsx` with a DonorBox `<iframe>` or popup widget.
2. Wire the `?fund=...&id=...` URL parameters to the right campaign — likely a small
   lookup table mapping fund/id to DonorBox campaign ID.
3. Style the surrounding chrome (heading, "you're sponsoring Priya" panel) to match.
4. Add post-donation thank-you state if DonorBox supports a redirect URL.
5. For the church page's per-church "Give to Bagepalli" button, decide whether each
   church gets its own DonorBox campaign (simpler tracking) or all churches share one
   with a designation field (one campaign to manage).

### What only the user can do
- Create the DonorBox account, complete nonprofit verification (1–3 days).
- Connect their bank.
- Create campaigns in the DonorBox dashboard.
- Provide the resulting campaign IDs to wire up.

---

## Things to be careful of

1. **Story page (`story.jsx`) timeline is invented.** The original main agent
   fabricated dated milestones (1987 first pastor, 1995 building, etc.). The user
   asked us to flag this. Either get real milestones from the user, or remove the
   dated timeline and replace with a non-dated narrative.

2. **Verses on each page.** Several Bible references appear (John 10:10, Proverbs 22:6,
   Romans 12:11, etc.). Treat these as content the user may want to swap; do not
   hardcode them anywhere new without making them editable.

3. **Image slots persist via localStorage.** The `<image-slot>` web component
   stores dropped images in `localStorage`, keyed by slot ID. This is fine for the
   prototype but should be migrated: real photos should live in `/images/students/<id>.jpg`
   etc. and be referenced from the JSON. Decap CMS can manage this.

4. **`window.STUDENTS` vs JSON.** Once the JSON loader in `app.jsx` is in place,
   the inline `STUDENTS` constant in `education.jsx` becomes vestigial — keep it
   only as a fallback if fetch fails. Same for `CHURCHES` in `churches.jsx`.

5. **The "10 churches" stat is hardcoded in many places.** When churches are added
   via the CMS, those scattered "10" references won't update. Eventually replace with
   `${SITE.stats.churches}` everywhere or compute from `CHURCHES.length`.

6. **No analytics, no contact form, no newsletter.** None of these exist. If the
   user asks, default to Plausible (privacy-friendly analytics) and Buttondown or
   Mailchimp embed for newsletter.
