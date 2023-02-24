import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import buildHtml from '../../config/build/buildHtml'
import proxy from '../../config/server/proxy'

import { baseName } from './setting'
import { resolve } from 'path'
import fs from 'fs'

export default async () => {
  return defineConfig({
    plugins: [vue()],
    base: `/${baseName}`,
    build: {
      // target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
      outDir: `../../dist/${baseName}`,
      // lib: {
      //   entry: resolve(__dirname, 'src/export.ts'),
      //   name: 'CommonNw',
      //   fileName: (format) => `commonnw.${format}.js`
      // },
      rollupOptions: {
        input: buildHtml(fs, (file: string) => resolve(__dirname, `./${file}`), baseName),
        // output: {
        //   manualChunks(id) { // 分包
        //     console.log(id)
        //     if (id.includes('node_modules')) {
        //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //     }
        //   }
        // }
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
        // sass: {
        //   javascriptEnabled: true,
        //   charset: false
        // }
      }
    },
    server: {
      port: 3003,
      host: "0.0.0.0",
      proxy: {
        ...proxy
      }
    }
  })
}
