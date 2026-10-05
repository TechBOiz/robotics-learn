import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeBaseLinks } from './src/lib/rehype-base-links.mjs';

// GitHub Pages serves a project site from /<repo-name>/.
// The deploy workflow sets SITE_URL and BASE_PATH from the Pages settings,
// so these defaults only matter for local builds.
const site = process.env.SITE_URL ?? 'https://techboiz.github.io';
const base = process.env.BASE_PATH ?? '/everything-robotics';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, [rehypeBaseLinks, { base }]],
  },
});
