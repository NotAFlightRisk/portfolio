import { sentryVitePlugin } from '@sentry/vite-plugin';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

const plausible = process.env.PUBLIC_PLAUSIBLE_SCRIPT ?? '';
const pulse = plausible ? [new URL(plausible).origin as `${string}.${string}`] : [];
const sentry = process.env.PUBLIC_SENTRY_DSN ?? '';
const oops = sentry ? [new URL(sentry).origin as `${string}.${string}`] : [];
const uploadMaps = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_URL);

export default defineConfig({
  define: {
    'import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT': JSON.stringify(plausible),
    'import.meta.env.PUBLIC_SENTRY_DSN': JSON.stringify(sentry)
  },
  build: {
    sourcemap: uploadMaps && 'hidden',
    assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined)
  },
  plugins: [
    sveltekit({
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true
      },
      adapter: adapter(),
      // the 404 page is served at any depth, so assets need absolute paths
      paths: { relative: false },
      prerender: {
        entries: [
          '*',
          '/api/apps.json',
          '/api/categories.json',
          '/api/tags.json',
          '/sitemap.xml',
          '/robots.txt',
          '/llms.txt'
        ]
      },
      csp: {
        mode: 'hash',
        directives: {
          'default-src': ['self'],
          'script-src': ['self', ...pulse],
          'connect-src': ['self', ...pulse, ...oops],
          'img-src': ['self', 'data:', 'https:'],
          'style-src': ['self', 'unsafe-inline'],
          'font-src': ['self'],
          'base-uri': ['none'],
          'form-action': ['self']
        }
      }
    }),
    Icons({ compiler: 'svelte' }),
    uploadMaps &&
      sentryVitePlugin({
        telemetry: false,
        release: { create: false, finalize: false, setCommits: false, deploy: false },
        bundleSizeOptimizations: { excludeDebugStatements: true, excludeTracing: true },
        sourcemaps: {
          assets: '.svelte-kit/output/client/**',
          filesToDeleteAfterUpload: '.svelte-kit/output/**/*.map'
        }
      })
  ],
  test: {
    include: ['tests/**/*.test.ts']
  }
});
