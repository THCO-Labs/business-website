import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  css: {
    // Tailwind v4 runs as a Vite plugin, so this project has no PostCSS config
    // of its own. Passing an empty object stops Vite searching parent
    // directories for one — otherwise the build depends on what happens to sit
    // above the checkout, which is neither reproducible nor the template's.
    postcss: {},
  },
  server: {
    // The preview is reached through the sandbox's signed external proxy, so
    // the dev server must bind every interface and must not reject the proxy's
    // Host header. Both are template concerns; the platform only supplies the
    // command and the port.
    host: true,
    port: 5173,
    allowedHosts: true,
  },
});
