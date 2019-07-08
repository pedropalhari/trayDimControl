## About

`!! PSA: this is heavily unoptimized !!`
<sub><sup> for obvious reasons</sup></sub>

<sub><sup> currently, 90MB for a tray icon. about 10³ more than it should be. thanks.</sup></sub>

This is an App that encapsulates some terminal commands that I've been using to control the brightness of my laptop below supported levels, so I can watch videos at night without getting constantly harassed.

More specifically, **these** commands:

```bash
echo $SUDO_PASSWORD | sudo -S chmod 777 /sys/class/backlightintel_backlight/brightness

echo $BRIGHTNESS_VALUE > /sys/class/backlight/intel_backlight/brightness
```

So, to keep me from every night having to type these two aliases while I'm being currently attacked by light, I've made this.

- What it is:

  - A fix for my extremely bright, cheap, extremely old and crippled intel Pavillon g4

- What it's not:
  - A fix for you, but you can try.

## Installation

This app currently requires `electron` (globally) at `^5.0.6` and `dotenv`.

Then you can just:

- `yarn electron .`

If you opt to install electron locally, I'd suggest using `yarn` instead of npm:

- `yarn add --dev electron`
- `yarn electron .`

## How it works

It uses electron to communicate and create a tray Icon. In `main.js` you have all the icons defined with their respective `labels` and `dimValues`.

Each item is then bound by a `click` function that spawns the command to modify the system brightness. Your mileage may vary.

It also uses a `.env` or a bash environment parameter called `SUDO_PASS` to enable it to modify the files that control brightness. **You're giving it SU access indirectly**, so please, read the code.

If you want, you can also pass a blank SUDO_PASS (blank, as on `" "` not undefined or `""`) and manually give modify permissions to the file `/sys/class/backlightintel_backlight/brightness` as on:

```bash
sudo chmod 777 /sys/class/backlightintel_backlight/brightness
```
