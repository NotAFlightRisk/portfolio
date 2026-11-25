<h1 align="center">Portfolio</h1>
<p align="center">
<i>Every app I've built, with screenshots, live links and an API so other sites can list them too</i>
<br />
<b>🌐 <a href="https://portfolio.peng.ly/">portfolio.peng.ly</a></b><br />
</p>

<p align="center">
<a href="https://portfolio.peng.ly/"><img src="https://portfolio.peng.ly/og.png" width="800" alt="The portfolio's home page, with featured apps up top and a shelf of apps per category" /></a>
</p>

## About

It's the one list of our apps. Each one gets a page with screenshots (in light and dark, to match your theme), what it does, and links to try it and star it. Everything's also served as JSON, so [peng.ly](https://peng.ly) and anything else can pull the list from here instead of keeping their own copy.

---

## API

No key needed, and CORS is open. The [API page](https://portfolio.peng.ly/api) has an example response.

| Endpoint                                                                     | What you get                             |
| ---------------------------------------------------------------------------- | ---------------------------------------- |
| [`/api/apps.json`](https://portfolio.peng.ly/api/apps.json)                  | Every app, most starred first            |
| [`/api/apps/<name>.json`](https://portfolio.peng.ly/api/apps/fineprint.json) | One app, by its repo name                |
| [`/api/categories.json`](https://portfolio.peng.ly/api/categories.json)      | The categories, with their apps in order |

---

## Adding an app

1. Add `data/apps/<repo-name>.yml` (copy one of the others) - the file name is the repo name under [NotAFlightRisk](https://github.com/NotAFlightRisk)
2. Drop its logo in `static/logos/<repo-name>.svg`
3. List the pages to screenshot under `screenshots:`, then run `npm run screenshots <repo-name>`

To put it in the carousel up top, add `featured: true`, plus `order: 1` (2, 3 and so on) if you want it in a particular spot. Anything without an order goes after the ones with.

Stars, language, licence and topics come from GitHub when it builds, and it rebuilds every morning to keep up.

The screenshots script drives a headless Chromium. If Playwright can't find one, point `CHROMIUM_PATH` at it, or run `npx playwright-core install chromium` first.

---

## Development

You'll need [Node](https://nodejs.org/) 22.18 or newer. It's a static [SvelteKit](https://svelte.dev/docs/kit) site.

```bash
git clone git@github.com:NotAFlightRisk/portfolio.git
cd portfolio
npm install
npm run dev
```

The other scripts you'll want are `npm run check` (types), `npm test` (checks the data files) and `npm run build`. Set `GITHUB_TOKEN` when you build if you're doing it a lot, as GitHub only allows 60 calls an hour without one.

Pushes to `main` deploy to Cloudflare by themselves.

---

## Credits

##### Contributors

[![contributors badge](https://readme-contribs.as93.net/contributors/NotAFlightRisk/portfolio?shape=squircle)](https://github.com/NotAFlightRisk/portfolio/graphs/contributors)

---

<!-- License + Copyright -->
<p  align="center">
  <a href="https://github.com/NotAFlightRisk"><img width="64" src="https://pixelflare.cc/iain/gif/penguin-dance.gif" /></a><br>
  <sup>
    <i>Licensed under <a href="../LICENSE">MIT</a>, © <a href="https://peng.ly">NotAFlightRisk</a> 2026</i>
  </sup>
</p>

<!--
oooh, hello there! hope you're having a nice day :)
   |\__      |\___
 (:> __)X  (:o ___(
   |/        |/
-->
