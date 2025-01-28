import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import mkcert from'vite-plugin-mkcert'

export default defineConfig({
    server: {
    },
    build: {
    lib: {
      entry: resolve(__dirname, './src/lib/jsQRGB.ts'),
      name: 'JsQRGB',
      fileName: 'jsqrgb',
    },
    rollupOptions: {
      external: ['jsqr', 'qrcode'],
      output: {
        globals: {
          qrcode: 'qrcode',
          jsqr: 'jsqr',
        },
      },
    },
  },
  plugins: [dts(), mkcert()],
})