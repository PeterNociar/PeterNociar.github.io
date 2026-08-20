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

## Wanted, by project

### homelander/
- Work-area canvas with an imported SVG placed to scale
- Layer panel: colour mapped to cut / engrave, with power, speed and passes
- Generated G-code preview
- Live control: jog pad, origin, frame, status readout
- The TTS-10 mid-job, if you have a photo

### netcher/
- Source photograph loaded, before segmentation
- Histogram with the layer handles being dragged
- Layer preview showing the cumulative masks
- A generated stencil SVG with bridges and registration crosshairs
- The cut stencils, or an etched plate, if you have a photo

### starlog/
- Chronological feed with a mix of links, notes and images
- Share-sheet confirmation dialog
- Voice note with its transcript
- Tag suggestions waiting to be accepted or rejected
- Search results across item types

### spacewars/
- Hex board mid-engagement
- Firing arc drawn from a ship
- Ship fit-out / hardpoint screen
- Panda3D render, to show the renderer swap

### crystalcv/
Currently holding four end-to-end test captures (fake data, test toast visible).
Replace with real ones when convenient: dashboard with a populated data pool,
editor beside preview, export dialog, a finished PDF.

### pictiler/
Holding two A4 page tiles. A screenshot of frames placed over an image in the
Kivy window would show the actual tool.
