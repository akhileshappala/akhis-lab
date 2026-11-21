/** @type {import('next').NextConfig} */
// Static export for GitHub Pages. The basePath (/akhis-lab) is injected by the
// actions/configure-pages step in .github/workflows/deploy.yml during the Pages
// build, so it is intentionally NOT hard-coded here — local builds serve at /.
const nextConfig = {
  output: "export",
  trailingSlash: true,
};
module.exports = nextConfig;
