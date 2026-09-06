# LunasMenu — Specials Board

React + Raspberry Pi 4 daily-specials display. A TV runs a fullscreen chalkboard-style
board (`/display`); a phone edits the specials on it (`/edit`), with live push over a
websocket so saving on the phone updates the TV instantly, no refresh.

Read `README.md` first for setup/run commands and `pi-setup/README.md` for deploying to
the actual Pi. This file is working context for whoever (human or Claude) is developing
in this repo day to day.

## Architecture, and why

Everything runs **on the Pi itself** — one Express server serves both the API and the
built React app, on the same machine that displays it on the TV. No cloud backend, no
external database. Rationale: the Pi is already there and always powered, so this avoids
hosting costs, avoids a second point of failure, and keeps the board working even if the
restaurant's internet drops (only WiFi to the local network is needed, not the internet).

Consequence: editing only works from a phone on the *same WiFi* as the Pi right now. If
remote editing (from off-site) is ever wanted, the plan is to add
[Tailscale](https://tailscale.com) on the Pi rather than exposing it to the open
internet — not set up yet, deliberately deferred until it's actually needed.

Data storage is a single JSON file (`server/data/specials.json`, gitignored — it's
runtime state, not code) written atomically (temp file + rename) so a Pi power loss
mid-write can't corrupt the board. No SQLite/Postgres: the dataset is tiny (one board,
a handful of items) and native modules are extra friction to get working on a Pi's ARM
chip, so a flat file was the pragmatic choice.

Auth is intentionally minimal: one shared PIN (`server/.env` → `EDIT_PIN`) exchanged for
an in-memory session token on `/api/login`, checked as a Bearer token on writes. This is
not a real security boundary — the point is stopping randoms on the WiFi from casually
editing prices, not protecting sensitive data.

## Repo layout

```
server/     Express + socket.io API. index.js is the entry point; data.js is the only
            thing that touches the JSON file on disk.
client/     Vite + React app. Two routes: pages/Display.jsx (TV) and pages/Edit.jsx
            (phone). components/Doodles.jsx holds the hand-drawn-style SVG icons.
            styles/global.css has all the chalkboard theming as CSS variables at the top.
pi-setup/   systemd unit (specials-server.service) + Chromium kiosk autostart script
            (kiosk.sh), for when this actually goes on the Pi.
```

Root `package.json` uses npm workspaces (`server`, `client`) so `npm install` /
`npm run dev` at the root handles both.

## Current status

Scaffolded and smoke-tested (server boots, login + auth-protected writes work, client
builds cleanly), then committed on top of this repo's existing initial commit and pushed.
Nobody has run it against a real Raspberry Pi yet, and the visual design is a rough
recreation of the actual chalkboard artwork, not a pixel-accurate copy.

## Where to pick up

Roughly in this order:

1. **Run it locally and confirm the live-update loop works.** `npm install`,
   `cp server/.env.example server/.env` (set a real PIN), `npm run dev`, then open
   `/display` and `/edit` in two tabs and confirm a save on one updates the other.
2. **Match the real design.** This is the part most worth manual attention — tweak the
   CSS variables in `client/src/styles/global.css` and the icon shapes in
   `client/src/components/Doodles.jsx` against the actual board artwork. Fonts are
   self-hosted via `@fontsource` (Permanent Marker for the title, Kalam for body text)
   specifically so the kiosk doesn't depend on Google Fonts' CDN being reachable.
3. **Load in the real specials** through the `/edit` UI itself, not by hand-editing JSON.
4. **In parallel, prep the Pi**: Raspberry Pi OS *with Desktop* (not Lite — Chromium
   needs a display server), Node 20+, clone this repo onto it.
5. **Deploy**: follow `pi-setup/README.md` — build, register the systemd service, set
   desktop autologin, add the kiosk autostart entry, reboot and confirm it comes up
   fullscreen on its own.
6. **Stress-test the boring failure cases** before it's actually relied on: power-cycle
   the Pi, restart the WiFi router, edit from a phone on the real restaurant network.

## Known gotchas / decisions already made

- `dotenv` is loaded with an explicit absolute path to `server/.env` in `server/index.js`
  (not the bare `dotenv/config` default), because both the systemd service and
  `npm run start` from the repo root launch the server with the *root* as the working
  directory, which would otherwise make dotenv silently miss `server/.env`. Don't
  simplify this back to `import 'dotenv/config'`.
- `server/data/specials.json` is gitignored on purpose so pulling code on the Pi never
  clobbers whatever's live on the board. `server/data/default-seed.json` (tracked) is
  what a fresh install seeds itself from.
- The git identity used for the first scaffold commit in this repo was set locally to
  `Maya <mostafam@stanford.edu>` since nothing was configured — change it
  (`git config user.email` / `user.name`, or amend that commit) if that's not the
  identity to use going forward.
- No native/compiled dependencies anywhere on purpose, to avoid ARM build headaches on
  the Pi.
