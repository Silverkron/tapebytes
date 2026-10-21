# Deploy TapeBytes with GitHub Pages

[Documentation](README.md) · [Development](development.md)

## GitHub Actions and GitHub Pages

Commit the source files, including `.github/workflows/static-pages.yml`, and push them to the repository's `main` branch.

On each push to `main`, the workflow:

1. Builds the static site and runs the tests.
2. Updates a separate **`gh-pages`** branch containing only the generated site.
3. Uploads the static site as a workflow artifact.

Deployment is a separate, explicit action. Routine pushes do not deploy the site. The workflow uses the repository's `GITHUB_TOKEN`; no personal access token is needed. Repository rules must allow the workflow to write to `gh-pages`. Treat that branch as generated output rather than editing it manually.

### Publish when ready

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Configure the custom domain and its DNS records, and enable HTTPS when available.
3. Indexing is enabled by default. If an existing repository variable `INDEXABLE` is `0`, remove it or set it to `1` for the public site.
4. In **Actions → Build static site → Run workflow**, select `main` and enable **Publish the generated site to GitHub Pages**.

The deployment job publishes the same artifact saved to `gh-pages`. It uses an explicit Pages deployment rather than relying on a branch push to trigger publication. See [GitHub's custom Pages workflows documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Domain and SEO configuration

The default origin is `https://tapebytes.lucasciacca.com`, with no path prefix, as defined in `site.config.json`. The build generates a `CNAME` file for this domain. DNS and GitHub Pages domain settings must still be configured separately.

Optional repository variables are set under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Purpose |
| --- | --- |
| `SITE_ORIGIN` | HTTPS origin without a path; overrides the configured domain. |
| `BASE_PATH` | Deployment prefix, such as `/tape-vault`; use `/` for the domain root. |
| `INDEXABLE` | Defaults to `1` (indexing enabled). Set to `0` only for non-public preview builds. |

For a repository hosted under a GitHub Pages path instead of the custom domain:

```sh
SITE_ORIGIN=https://OWNER.github.io BASE_PATH=/REPOSITORY INDEXABLE=1 npm run build
npm test
```

Localized page titles and descriptions are stored under the `seo.*` and `desc.*` keys in the translation files. The generator embeds canonical links, reciprocal `hreflang` links, Open Graph and Twitter metadata, and structured data directly in each HTML page. It also creates `sitemap.xml` and `robots.txt`.

Indexing is enabled by default; the 404 page remains excluded. No client-side rendering is required for search engines to read the page content or metadata.

Every localized page also has a static Markdown version at `index.md` alongside its `index.html` (for example `/it/guide/index.md`). HTML pages link to these versions using `rel="alternate"` and `type="text/markdown"`. The Markdown content comes from the rendered page, including the guide and its limitations, with absolute links that respect the configured domain and base path.

`llms.txt` lists all 25 Markdown pages grouped by language, and `llms-full.txt` includes their complete content. These are discovery aids for AI bots. `robots.txt` allows all crawlers by default and points to the XML sitemap, which lists the canonical HTML pages and their language alternatives.


Repository Markdown is rendered by GitHub; it does not support the same metadata controls as the generated website.
