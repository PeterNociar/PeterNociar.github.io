# Portfolio

Static personal site for Peter Nociar's projects. No framework, no build step,
no dependencies.

## Run it

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` from the filesystem also
works.

## Layout

```
index.html          page shell and static sections
css/style.css       all styling
js/projects.js      project data — the only file to edit for content changes
js/main.js          renders the board, the cards and the project sheets
assets/screenshots/ one folder per project, see MANIFEST.md
```

## Change the content

Everything a visitor reads about a project lives in one object in
`js/projects.js`. Add a project by appending an object with the same keys; the
board row, the card and the sheet all follow.

## Deploy

Push to a repository and turn on GitHub Pages (branch, root folder). Any static
host works — there is nothing to compile.
