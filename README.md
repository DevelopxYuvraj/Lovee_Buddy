# For Someone Special ✦

A polished, responsive digital love-letter / memory website built with plain HTML, CSS and JavaScript.

## Run

1. Keep the folder structure exactly as provided.
2. Open `index.html` in a modern browser. A local server is recommended but not required.
3. No build step is required.

## Personalize quickly

Open `index.html` and search for these comments:

- `<!-- CHANGE NAME HERE -->`
- `<!-- ADD YOUR PHOTO HERE -->`
- `<!-- CHANGE YOUR PERSONAL MESSAGE HERE -->`
- `<!-- ADD YOUR PHOTOS HERE -->`
- `<!-- CHANGE DATE HERE -->`
- `<!-- ADD YOUR MUSIC FILE HERE -->`

### Photos
Put photos in `assets/images/`. For the hero, replace the placeholder inside `.photo-frame` with:
`<img src="assets/images/hero.jpg" alt="A favorite memory">`

For gallery cards, set each button's `data-img`, for example:
`data-img="assets/images/memory-01.jpg"`

### Music
Put an MP3 in `assets/music/` and set the `<source src="">` value in `index.html`, for example:
`<source src="assets/music/song.mp3" type="audio/mpeg">`

Music never autoplays.

### Special date
Set the `data-date` on `.countdown` to an ISO date such as:
`2026-12-31T00:00:00`
If it is blank, the entire countdown section hides automatically.

## Notes
- The gallery and hero work with placeholders even before images are added.
- Reduced-motion preferences are respected.
- Escape closes open modals.
- The secret logo interaction triggers after five clicks.
