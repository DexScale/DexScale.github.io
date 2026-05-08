// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * GitHub project pages are served under `/<repo>/`, not site root. Vite + TanStack must use the same base
 * or JS/CSS will 404. User/org site from a `username.github.io` repo uses `/`.
 *
 * Override anytime: `VITE_STATIC_BASE=/my-repo/` npm run build
 */
const staticSiteBase = (): string => {
  const explicit = process.env.VITE_STATIC_BASE?.trim();
  if (explicit) {
    return explicit.endsWith("/") ? explicit : `${explicit}/`;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) return "/";
  const name = repo.split("/")[1];
  if (!name) return "/";
  if (/^[a-z0-9_-]+\.github\.io$/i.test(name)) return "/";
  return `/${name}/`;
};

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// `cloudflare: false`: the Cloudflare Vite plugin emits `dist/server/index.js`, but prerender's
// preview server expects `server.js` — disabling it restores the Node SSR bundle used at build
// time to crawl routes. Deploy the **static** output under `dist/client/` (HTML + assets) to any CDN/static host.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
    },
  },
  vite: {
    base: staticSiteBase(),
  },
});
