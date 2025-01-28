import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
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
    plugins: [dts()],
})