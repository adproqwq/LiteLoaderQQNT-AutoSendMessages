import { defineConfig } from 'electron-vite';
import { defineConfig as defineViteConfig } from 'vite';
import { resolve } from 'path';
import viteChecker from 'vite-plugin-checker';
import viteCp from 'vite-plugin-cp';
import viteZipPack from 'unplugin-zip-pack/vite';
import PluginManifest from './manifest.json';

const SRC_DIR = resolve(__dirname, './src');
const OUTPUT_DIR = resolve(__dirname, './dist');

const BaseConfig = defineViteConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
});

const ConfigBuilder = (type: 'main' | 'preload') => defineViteConfig({
  ...BaseConfig,

  plugins: [
    viteChecker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint --cache --fix ./src/**/*.{js,cjs,mjs,ts,jsx,tsx}',
      },
    }),
  ],
  build: {
    minify: true,
    outDir: resolve(OUTPUT_DIR, `./${type}`),
    lib: {
      entry: resolve(SRC_DIR, `./${type}/index.ts`),
      formats: [ 'cjs' ],
      fileName: () => 'index.js',
    },
  },
});

export default defineConfig({
  main: ConfigBuilder('main'),
  preload: ConfigBuilder('preload'),
  renderer: defineViteConfig({
    ...BaseConfig,

    plugins: [
      viteChecker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint --cache --fix ./src/**/*.{js,cjs,mjs,ts,jsx,tsx}',
        },
      }),
      viteCp({
        targets: [
          { src: './manifest.json', dest: 'dist' },
          { src: './src/pages', dest: 'dist/pages' },
          { src: './assets', dest: 'dist/assets' },
        ],
      }),
      viteZipPack({
        in: OUTPUT_DIR,
        out: resolve(__dirname, `./${PluginManifest.slug}.zip`),
      }),
    ],
    build: {
      minify: 'esbuild',
      outDir: resolve(OUTPUT_DIR, './renderer'),
      lib: {
        entry: resolve(SRC_DIR, './renderer/index.ts'),
        formats: [ 'es' ],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        input: resolve(SRC_DIR, './renderer/index.ts'),
      },
    },
  }),
});