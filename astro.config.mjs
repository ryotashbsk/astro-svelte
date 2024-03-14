import { defineConfig, passthroughImageService } from 'astro/config';
import svelte from '@astrojs/svelte';
import icon from 'astro-icon';
import compress from 'astro-compress';
import crypto from 'crypto';
// import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  publicDir: './static',
  build: {
    inlineStylesheets: 'never'
  },
  server: {
    open: true,
    host: true
  },
  preview: {
    open: true
  },
  image: {
    service: passthroughImageService()
  },
  integrations: [
    svelte(),
    icon({
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: 'prefixIds',
            params: {
              prefix: () => crypto.randomUUID()
            }
          }
        ]
      }
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true
    })
    // partytown({
    //   config: {
    //     forward: ['dataLayer.push']
    //   }
    // })
  ],
  image: {
    remotePatterns: [
      {
        protocol: 'https'
      }
    ],
    domains: ['']
  },
  vite: {
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@use 'src/styles/import' as *;`
        }
      }
    },
    build: {
      cssCodeSplit: true // falseにするとsvelteのcssが2重で出力される
    },
    esbuild: {
      drop: import.meta.env.PROD ? ['console', 'debugger'] : []
    }
  },
  devToolbar: {
    enabled: false
  },
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    contentCollectionCache: true
  }
});
