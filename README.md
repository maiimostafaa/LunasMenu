# Specials Board

A daily-specials display for a TV, powered by a Raspberry Pi 4, editable from your phone.

- **`/display`** — the fullscreen chalkboard view, meant to run in a browser on the TV.
- **`/edit`** — a phone-friendly page for adding, editing, reordering, and hiding specials. Protected by a PIN.

Both pages talk to one small server that also runs **on the Pi**. There's no cloud backend and no
external database: the Pi is the TV *and* the server. When you save a change on your phone, the
server pushes it to the display instantly over a websocket.

## How it's structured

```
specials-board/
  server/     Express + socket.io API, stores specials in a JSON file on disk
  client/     Vite + React app (Display and Edit pages)
  pi-setup/   systemd service + kiosk autostart script for the Pi
```

## Running it locally (on your laptop, before touching the Pi)

```bash
npm install          # installs both workspaces
cp server/.env.example server/.env   # then edit the PIN inside
npm run dev
```

This starts the API on `http://localhost:3000` and the client dev server on `http://localhost:5173`
(with hot reload). Open `http://localhost:5173/display` and `http://localhost:5173/edit` in two tabs
to see them update live.

## Deploying to the Raspberry Pi

1. Install Node.js 20+ on the Pi (`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs`).
2. Clone this repo onto the Pi, `cd` into it.
3. `npm install`, then `cp server/.env.example server/.env` and set a real `EDIT_PIN`.
4. `npm run build` — builds the React app into `client/dist`, which the server serves directly in production.
5. `npm run start` — starts the server on port 3000, serving both the API and the built display/edit pages.
6. Set up `pi-setup/` (see `pi-setup/README.md`) so the server and a fullscreen Chromium pointed at
   `http://localhost:3000/display` both start automatically on boot.

## Editing from your phone

Connect your phone to the same WiFi as the Pi, then visit `http://<pi's-local-ip>:3000/edit`
(find the Pi's IP with `hostname -I` on the Pi). Enter the PIN once — after that your phone stays
logged in.

If you ever want to edit from outside the restaurant's WiFi, look at
[Tailscale](https://tailscale.com/) — it gives your phone a private, secure path to the Pi without
exposing it to the open internet. Not set up here since it depends on your accounts, but it's a
15-minute add-on later.

## Notes / things you'll probably want to tweak

- The doodle icons and fonts are a re-creation of your chalkboard design, not a pixel-exact copy —
  swap colors in `client/src/styles/global.css` (see the `:root` variables) to dial it in.
- The PIN auth is intentionally simple (one shared PIN, one server-side session token) since this
  is a single-location, low-stakes tool. Don't reuse a real password as the PIN.
- `server/data/specials.json` holds the live data and is gitignored on purpose, so pushing to
  GitHub never overwrites what's on the Pi. `server/data/default-seed.json` is what a fresh
  install seeds itself from.
