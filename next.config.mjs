/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages under https://<user>.github.io/learn-devops-with-ai
// we need a basePath. Locally (and on Vercel) we serve from root.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "learn-devops-with-ai";

const nextConfig = {
  output: "export",
  // Static export can't optimize images on the fly.
  images: { unoptimized: true },
  // Emit /path/index.html so GitHub Pages serves clean URLs.
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repo}` : "",
  },
};

export default nextConfig;
