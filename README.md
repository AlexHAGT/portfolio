## How to run it

https://alexhagt.github.io/portfolio/ (English version: https://alexhagt.github.io/portfolio/en/)

**On a laptop:** the site is plain HTML, CSS and JavaScript, with no build step and nothing to install except Python 3.

```
python -m http.server -d site
```

Then open http://localhost:8000 in a browser. (Opening `site/index.html` directly also shows the page, but the local server is closer to the real hosting.)

**Hosting:** the site is hosted on GitHub Pages. Only the `site/` folder is published. Every `git push` to the `main` branch starts a GitHub Action (`.github/workflows/pages.yml`) that publishes `site/` again: the change is online about a minute later.
