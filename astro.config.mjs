import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://angepasstlab.com',
  output: isDev ? 'server' : 'static',
  integrations: [
    tailwind(),
    sitemap(),
    markdoc(),
    ...(isDev ? [keystatic(), react()] : []),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
