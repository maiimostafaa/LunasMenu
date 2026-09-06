#!/bin/bash
# Launches Chromium in fullscreen kiosk mode pointed at the specials board,
# and turns off the screen-blanking / screensaver behavior that would
# otherwise put the TV to sleep. Meant to be run automatically on login
# (see pi-setup/README.md).

# Give the server a moment to come up on boot before Chromium tries to load it.
sleep 5

# Disable screen blanking and power management for this X session.
xset s off
xset s noblank
xset -dpms

# Hide the mouse cursor when idle (requires: sudo apt install unclutter).
unclutter -idle 0.5 -root &

chromium-browser \
  --kiosk \
  --noerrdialogs \
  --disable-infobars \
  --incognito \
  --no-first-run \
  --disable-translate \
  --check-for-update-interval=31536000 \
  "http://localhost:3000/display"
