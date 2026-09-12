# Theme assets

One folder per theme. Folder names are the theme ids used in code, so don't
rename them without updating the theme config.

Drop into each theme folder:

```
themes/<theme>/
  mockup.png        Full-board mockup export at 2560x1440 ("TV - 1" style).
                    Used to pixel-measure positions/sizes; not shown on the TV.
  background.png    The board background, 2560x1440.
  doodles/          Each decoration as an individual export.
                    Prefer PNG at 2x over SVG — the Figma SVG exports embed a
                    huge PNG anyway, so direct PNGs are ~10x smaller.
  fonts/            Only if the theme uses a font we don't already have.
```

Naming: lowercase, hyphens instead of spaces (`candy-cane.png`, not
`Candy Cane.png`).

Current themes: og (the original chalkboard), halloween, thanksgiving,
christmas, valentines, st-pattys, usa, mothers-day, fathers-day.
