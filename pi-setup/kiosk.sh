#!/bin/bash
# Launches Chromium in fullscreen kiosk mode pointed at the specials board,
# and turns off the screen-blanking / screensaver behavior that would
# otherwise put the TV to sleep. Meant to be run automatically on login
# (see pi-setup/README.md).

# Wait for the server to come up on boot before Chromium tries to load it
# (cap the wait so a broken server still leaves a visible error page to
# debug rather than a blank desktop).
for _ in $(seq 1 30); do
  curl -sf http://localhost:3000/api/specials >/dev/null && break
  sleep 2
done

# Disable screen blanking and power management for this X session.
xset s off
xset s noblank
xset -dpms

# Hide the mouse cursor when idle (requires: sudo apt install unclutter).
unclutter -idle 0.5 -root &

# Package name differs across Raspberry Pi OS releases.
BROWSER=$(command -v chromium-browser || command -v chromium)

"$BROWSER" \
  --kiosk \
  --password-store=basic \
  --noerrdialogs \
  --disable-infobars \
  --incognito \
  --no-first-run \
  --disable-translate \
  --check-for-update-interval=31536000 \
  "http://localhost:3000/display"
