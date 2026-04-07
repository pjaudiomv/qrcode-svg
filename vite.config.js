import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/qrcode.js'),
            name: 'QRCode',
            formats: ['es'],
            fileName: () => 'qrcode.js',
        },
        sourcemap: true,
        minify: 'oxc',
    },
    test: {
        environment: 'node',
    },
})
