# Lunch Hour League

> Kickoff 12:15. Back at your desk by one.

Manchester corporate 5-a-side football league — built headless on Wix, deployed to the edge.

[![Live](https://img.shields.io/badge/live-lunchhourleague.com-1B4332?style=flat-square)](https://lunchhourleague.com)
[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Wix Headless](https://img.shields.io/badge/Wix-Headless-FAAD00?style=flat-square)](https://dev.wix.com/docs/go-headless)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (SSR, server output) |
| UI islands | React 18 — `client:load` / `client:visible` / `client:idle` |
| Styling | Tailwind CSS v4 (CSS-first config, `@theme`) |
| CMS & hosting | Wix Headless — `@wix/data` SDK, `@wix/astro` integration |
| Fonts | Teko 500/600 · Archivo 400/600 · JetBrains Mono |
| Testing | Vitest |

---

## Getting started

### Prerequisites

- Node.js 18+
- A [Wix Headless](https://dev.wix.com/docs/go-headless) project with CMS collections seeded (see below)
- Wix CLI: `npm i -g @wix/cli`

### Install

```bash
git clone https://github.com/yonathank-kom/lunch-hour-league.git
cd lunch-hour-league
npm install
```

### Environment variables

Copy the example and fill in your Wix project credentials:

```bash
cp .env.example .env.local
```

```env
WIX_CLIENT_ID=
WIX_CLIENT_SECRET=
WIX_CLIENT_INSTANCE_ID=
WIX_CLIENT_PUBLIC_KEY=
PUBLIC_SITE_URL=https://your-site.wix-site-host.com
```

Credentials are in your Wix dashboard under **Settings → Headless Settings → OAuth apps**.

### Develop

```bash
npm run dev
```

### Seed CMS

Populates Teams, Venues, Registrations, StoryBlocks, and Captains collections:

```bash
npm run seed
```

### Test

```bash
npm test
```

---

## Deployment

```bash
npm run build
npx wix release
```

`wix release` prints the live `*.wix-site-host.com` URL and promotes the build to Wix's edge infrastructure.

---

## Project structure

```
src/
├── components/
│   ├── CountdownClock.tsx        # client:load — header kickoff countdown
│   ├── MobileRegisterStickyBar.tsx  # client:load — mobile conversion bar
│   ├── StandingsTable.tsx        # client:visible — sortable league table
│   └── RegisterForm.tsx          # client:idle — team registration form
├── layouts/
│   └── Layout.astro              # shell with font preloads + JSON-LD slot
├── lib/
│   └── kickoff.ts                # nextKickoff() + formatCountdown() utils
├── pages/
│   ├── index.astro               # Home
│   ├── format.astro              # How It Works
│   ├── standings.astro           # League table
│   ├── venues.astro              # Pitch locations
│   ├── register.astro            # Team registration
│   ├── rules.astro               # Rulebook & FAQ
│   └── api/register.ts           # POST → Wix CMS Registrations
├── styles/
│   └── global.css                # Tailwind v4 @theme tokens
scripts/
└── seed.mjs                      # One-shot CMS seed script
```

---

## License

[MIT](LICENSE)
