# Screenshot slots

One folder per project. Drop images in, then add them to that project's `shots`
array in `js/projects.js`:

```js
shots: [
  { file: '01-canvas.png', caption: 'Work-area canvas with an imported SVG' }
]
```

The first shot in the array is also the thumbnail on the project card.
A project with an empty `shots` array shows a "no capture yet" tile — nothing breaks.

## Guidance

- PNG, 16:10-ish, at least 1600px wide. Cards crop from the top left.
- One shot per idea. Four good ones beat twelve near-identical ones.
- Real data beats test data. Empty states and loading spinners read as unfinished.
- Captions are shown under the enlarged image, so write them for a stranger.

## Status

All six projects have screenshots.

## Nice to have, for the ones already filled

- **homelander/** — the TTS-10 mid-job, or a finished burn
- **netcher/** — the cut stencils, or an etched steel plate
- **spacewars/** — a Panda3D render, to show the renderer swap
- **pictiler/** — the printed tiles taped together
- **starlog/** — the share-sheet confirmation dialog, and tag suggestions mid-review; a
  release build would also drop the DEBUG ribbon
