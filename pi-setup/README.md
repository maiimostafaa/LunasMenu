# Setting up the Pi

Assumes Raspberry Pi OS (with Desktop, not Lite — you need a display server to run
Chromium) and that you've already cloned the repo, run `npm install`, set a real
`EDIT_PIN` in `server/.env`, and run `npm run build` from the project root.

## 1. Run the server as a background service

Copy the unit file in and enable it:

```bash
sudo cp pi-setup/specials-server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable specials-server
sudo systemctl start specials-server
```

Check it's up: `sudo systemctl status specials-server`, or `curl http://localhost:3000/api/specials`.

If you cloned the repo somewhere other than `/home/pi/specials-board`, edit the
`WorkingDirectory` line in `/etc/systemd/system/specials-server.service` first.

## 2. Auto-login to the desktop on boot

```bash
sudo raspi-config
```

`System Options` → `Boot / Auto Login` → `Desktop Autologin`.

## 3. Launch Chromium in kiosk mode on login

```bash
sudo apt install -y unclutter chromium-browser
chmod +x pi-setup/kiosk.sh
mkdir -p ~/.config/autostart
```

Create `~/.config/autostart/specials-kiosk.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=Specials Kiosk
Exec=/home/pi/specials-board/pi-setup/kiosk.sh
X-GNOME-Autostart-enabled=true
```

(Adjust the `Exec` path if your clone lives elsewhere.)

## 4. Reboot and check

```bash
sudo reboot
```

The Pi should boot straight to the desktop, and Chromium should come up fullscreen
on the specials board a few seconds later with no address bar or window chrome.

## Updating the board later

Whenever you `git pull` a code change (not a content change — content changes go
through the phone `/edit` page, not git):

```bash
npm install
npm run build
sudo systemctl restart specials-server
```

## Troubleshooting

- **Blank/white screen in Chromium**: the server probably isn't up yet — check
  `sudo systemctl status specials-server` and `curl http://localhost:3000/display`.
- **Can't reach `/edit` from your phone**: confirm the phone is on the same WiFi
  network as the Pi, and use the Pi's IP (`hostname -I` on the Pi) rather than
  `localhost`, e.g. `http://192.168.1.42:3000/edit`.
- **Screen goes dark after a while**: double check `xset` ran (some TVs/monitors
  also have their own auto-sleep in their own settings menu, separate from the Pi).
