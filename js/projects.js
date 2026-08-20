/* Project data. Single source for the transform board, the plate grid and the sheets.
   Screenshots live in assets/screenshots/<slug>/ — see MANIFEST.md for the slots. */

const PROJECTS = [
  {
    slug: 'homelander',
    name: 'Homelander',
    kind: 'Desktop application',
    tagline: 'Drives a diode laser engraver from Linux, without LightBurn.',
    pipeline: ['SVG', 'cut / engrave layers', 'G-code', 'serial stream'],
    stack: ['Python', 'PySide6', 'GRBL', 'pyserial', 'AppImage'],
    status: { key: 'v1', label: 'v1 — working' },
    started: '2026',
    lastTouched: '2026-07',
    commits: 96,
    files: '57 modules',
    repoPath: 'github.com/PeterNociar/homelander',
    accent: '#FF6A2B',
    problem:
      'Laser control software is Windows-first (LaserGRBL), closed and paid (LightBurn), or generic and clunky (Universal Gcode Sender). Nothing clean, open and Linux-first exists for diode lasers.',
    does: [
      'Import an SVG and see it to scale on a work-area canvas.',
      'Map SVG colours to Cut (vector outline) or Engrave (scanline fill) layers.',
      'Set power, speed and pass count per layer, then generate GRBL G-code.',
      'Stream over USB serial with character-counting flow control.',
      'Jog, set and return to origin, frame the job, pause, resume, stop.',
      'Add a machine by writing a Profile — a TOML file describing work area, S-max, feed limits and laser mode.'
    ],
    detail:
      'Machine settings and material settings are deliberately separate. A Profile describes a machine and nothing else; power, speed and passes belong to the job. Supporting a new engraver means writing a Profile, not patching the code. First machine is a TwoTrees TTS-10 — GRBL firmware, CH340 serial, 115200 baud, no homing switches — because it is the one that can be validated end to end on a real bench.',
    shots: []
  },
  {
    slug: 'netcher',
    name: 'NEtcher',
    kind: 'Desktop application',
    tagline: 'Turns a photograph into a stack of cut stencils for acid etching.',
    pipeline: ['photograph', 'tonal layers', 'vector paths', 'SVG stencil set'],
    stack: ['Python', 'Kivy', 'potrace', 'Pillow', 'NumPy'],
    status: { key: 'v1', label: 'v1 — working' },
    started: '2026',
    lastTouched: '2026-06',
    commits: 74,
    files: '43 modules',
    repoPath: 'github.com/PeterNociar/NEtcher',
    accent: '#7FD1C1',
    problem:
      'Etching a photograph into steel means cutting a set of stencils where each one exposes more surface than the last. Building that set by hand across a photo editor, a vector tool and CAM software is slow and easy to get wrong.',
    does: [
      'Read the image histogram and split it into tonal layers you can adjust by dragging handles.',
      'Build cumulative masks — every layer contains all the area of the layers before it.',
      'Trace each mask to clean vector paths with potrace.',
      'Insert bridges so isolated islands do not drop out of the stencil during cutting.',
      'Offset for kerf so the cut width does not eat the design.',
      'Add corner registration crosshairs and export one real-world-sized SVG per layer.'
    ],
    detail:
      'The tonal range of the photograph becomes etch depth. Areas exposed through more stencils sit in the acid for more cycles, cut deeper, and read darker on the finished plate. Getting that mapping right is the whole job — the rest of the app exists to make the geometry survive contact with a cutter and a sheet of steel.',
    shots: []
  },
  {
    slug: 'crystalcv',
    name: 'CrystalCV',
    kind: 'Web and mobile application',
    tagline: 'Keeps your career history in one pool and builds CVs out of it.',
    pipeline: ['career data pool', 'selected sections', 'template', 'PDF / Word'],
    stack: ['FastAPI', 'SQLModel', 'PostgreSQL', 'Flutter', 'Alembic'],
    status: { key: 'active', label: 'Active' },
    started: '2025',
    lastTouched: '2026-07',
    commits: 227,
    files: '64 API endpoints',
    repoPath: 'github.com/PeterNociar/CrystalCV2',
    accent: '#8C7BFF',
    problem:
      'Every application wants a different CV, so the same work history gets retyped, drifts out of sync across a folder of near-identical documents, and the good version is never the one you can find.',
    does: [
      'Hold work experience, education, skills, languages, awards and certifications as reusable entities.',
      'Import an existing profile from LinkedIn instead of typing it in again.',
      'Assemble a CV by picking entities from the pool, then reorder sections by drag or sort them by date.',
      'Preview the rendered document beside the editor while you work.',
      'Export to PDF or Word, in A4, Letter or Legal, in colour, greyscale or black and white.'
    ],
    detail:
      'The data pool is the point. A CV is a view over it, not a document you own and maintain. Change a job title once and every CV that references it is correct. Backend is FastAPI with SQLModel and Alembic migrations; the client is a single Flutter codebase covering web, desktop and mobile layouts.',
    shots: [
      { file: '02-editor-split-view.png', caption: 'Editor beside a live preview of the rendered CV' },
      { file: '03-export-dialog.png', caption: 'Export: format, paper size, colour scheme' },
      { file: '05-work-experience-form.png', caption: 'Work experience entry in the data pool' },
      { file: '06-mobile-dashboard.png', caption: 'Mobile layout, same Flutter codebase' }
    ],
    shotsNote: 'Captured from the end-to-end test suite, so the data is fake and the toast is a test fixture.'
  },
  {
    slug: 'starlog',
    name: 'Starlog',
    kind: 'Mobile and web application',
    tagline: 'Catches links, voice notes and images before you forget where you put them.',
    pipeline: ['share sheet / voice / image', 'transcript + analysis', 'suggested tags', 'searchable log'],
    stack: ['FastAPI', 'SQLModel', 'Flutter', 'Docker'],
    status: { key: 'active', label: 'Active' },
    started: '2026',
    lastTouched: '2026-05',
    commits: 56,
    files: '150 modules',
    repoPath: 'github.com/PeterNociar/starlog',
    accent: '#4FA8E8',
    problem:
      'Interesting things arrive all day and scatter: bookmarks get buried, notes need filing before they are useful, photos cannot be searched by why you took them, voice memos are never opened again.',
    does: [
      'Save a link straight from the OS share sheet, with a confirmation you can tap through to edit.',
      'Pull the page title and image, and archive the readable HTML so the item survives the site going down.',
      'Record a voice note and transcribe it on-device, then fix the transcript by hand.',
      'Read intent prefixes in speech — NOTE, TODO, SHOPPING, IDEA — and file the item accordingly.',
      'Save an image with a spoken or typed annotation, and run image analysis on the backend.',
      'Suggest tags drawn from the vocabulary you already use, for you to accept, edit or reject.',
      'Browse chronologically, filter by type or tag, and search full text across everything.'
    ],
    detail:
      'Capture has to cost nothing or it does not happen, so every input is one gesture from wherever you already are. Organisation is the part that gets deferred, so the backend proposes tags from your own existing vocabulary rather than inventing a taxonomy — the collection stays yours, and stays consistent, without a filing session.',
    shots: []
  },
  {
    slug: 'spacewars',
    name: 'SpaceWars',
    kind: 'Game',
    tagline: 'Hex tactical space combat where facing and momentum decide the fight.',
    pipeline: ['hex position + heading', 'momentum turn', 'firing geometry', 'damage resolution'],
    stack: ['Python', 'Panda3D', 'Pyglet'],
    status: { key: 'active', label: 'Active' },
    started: '2025',
    lastTouched: '2026-07',
    commits: 111,
    files: '122 modules',
    repoPath: 'github.com/PeterNociar/SpaceWars',
    accent: '#E5C15A',
    problem:
      'Most space combat games let a ship pivot freely and shoot in any direction, which removes the decision that makes tactical combat interesting: where you are pointing, and what that costs you next turn.',
    does: [
      'Move ships on a hex grid with momentum — a turn is paid for, not free.',
      'Constrain weapons by firing geometry: an arc is the width of the cone, an aiming axis is where the mount points.',
      'Resolve bearing in the model\'s own hex space, independent of how the board is drawn.',
      'Fit ships out through hardpoint slots that decide what a hull can carry.'
    ],
    detail:
      'The combat model is kept strictly separate from the renderer, which is what made the ongoing move from Pyglet to Panda3D a swap of the view rather than a rewrite. The vocabulary is pinned down in the repo — bearing, firing arc, aiming axis, placement, hardpoint slot each mean exactly one thing in code and in the rules.',
    shots: []
  },
  {
    slug: 'pictiler',
    name: 'pictiler',
    kind: 'Desktop application',
    tagline: 'Cuts a big image into printable pages you can tile back together.',
    pipeline: ['image', 'placed page frames', 'cropped tiles', 'multi-page PDF'],
    stack: ['Python', 'Kivy', 'borb', 'Pillow'],
    status: { key: 'v1', label: 'v1 — working' },
    started: '2022',
    lastTouched: '2022-06',
    commits: 22,
    files: '3 modules',
    repoPath: 'local only — never pushed',
    accent: '#9AA9B8',
    problem:
      'Printing something larger than A4 on a home printer means splitting it into pages by hand and hoping the pieces line up on the wall.',
    does: [
      'Drop page-sized frames onto an image and drag them where the crops should fall.',
      'Rotate a frame between portrait and landscape, or switch page format.',
      'Draw corner marks on every frame so the printed sheets can be trimmed and aligned.',
      'Crop each frame and write the set out as one multi-page PDF.'
    ],
    detail:
      'An early Kivy project, finished and left alone. Frames are drawn straight into the canvas as instruction groups, and the PDF is assembled with borb, one page per placed frame.',
    shots: [
      { file: '01-frame-portrait.png', caption: 'A4 portrait tile, cropped from the source image' },
      { file: '02-frame-landscape.png', caption: 'A4 landscape tile from the same source' }
    ]
  }
];
