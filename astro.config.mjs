import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Pages are static by default; routes opt into SSR with `export const prerender = false`.
  adapter: vercel(),
  integrations: [react()],
  // Astro 7 defaults to 'jsx' whitespace handling; keep the previous output.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
