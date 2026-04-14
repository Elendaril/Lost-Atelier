# Lost Atelier

## Development

- `npm install`
- `npm run dev`

## GitHub Pages

This project includes a GitHub Actions workflow that builds and deploys the app to GitHub Pages on every push to `main`.

### One-time GitHub setup

1. Open your repository on GitHub.
2. Go to `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.

### How deployment works

- The workflow lives at `.github/workflows/deploy-pages.yml`.
- Vite reads `BASE_PATH` during the Pages build so assets resolve correctly from `/<repo-name>/`.
- Every push to `main` triggers a fresh deploy. You can also run it manually from the `Actions` tab.

### Local production build

For a normal local production build:

```bash
npm run build
```
