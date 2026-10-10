# Zaro-Website
Mocking up a website for Zaro Software LLC

A static site in plain HTML, CSS and JavaScript, with no build step.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home (the logo links here) |
| `cutreel.html` | CutReel product page |
| `soundsplice.html` | SoundSplice product page (draft copy, placeholder visuals) |
| `downloads.html` | Downloads for every app |
| `info.html` | Guides, FAQ and support |
| `legal.html` | Privacy, terms, licenses and trademarks (placeholder text) |
| `media-kit.html` | Logos, icons, screenshots, colours and descriptions (linked from the footer only) |

## Run it locally

```bash
python -m http.server 8123
```

Then open http://localhost:8123.

## Editing

- **Releases:** edit `assets/js/downloads-data.js`. Each app has a version, a changelog link,
  a URL for each platform, and a list of resource cards. Set a platform's `url` to `null` to
  show "Coming soon". To add another app, add another entry.
- **Logo:** `assets/img/brand/zaro-logo.svg` (wordmark) and `zaro-mark.svg` (favicon) are
  placeholders. Replace the files and keep the names. The media kit has its own copies in
  `assets/media-kit/zaro/` (white and dark wordmarks, the mark, and PNG versions), so replace
  those too.
- **Media kit:** files live in `assets/media-kit/`. After adding or replacing any of them, run
  `python scripts/build-media-kit.py` to rebuild the "Download everything" zip (it also
  bundles the CutReel screenshots).
- **SoundSplice screenshots:** every `.placeholder` block in `soundsplice.html` shows its
  `data-label`. Swap each one for an `<img>` the way `cutreel.html` does. The app icon
  (`assets/img/brand/soundsplice-icon.svg`) is a placeholder too.
- **Header and footer:** edit the `SITE` object at the top of `assets/js/layout.js`. It holds
  the nav links, the Donate link, the social links, the legal links and the company name, and
  every page builds its header and footer from it. Each page only has empty
  `<header data-layout="header">` / `<footer data-layout="footer">` placeholders.
- **Placeholders in `layout.js`:** the Donate button and the YouTube, X, Instagram and LinkedIn
  icons point to `#`.
- **Accent colours** are set in `:root` in `assets/css/site.css` (`--zaro`, `--cutreel`,
  `--soundsplice`). Each page picks one with a `theme-*` class on `<body>`.

CutReel images come from `CutReel/docs/showcase` and live in `assets/img/cutreel/`.
