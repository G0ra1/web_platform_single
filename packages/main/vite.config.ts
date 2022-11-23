import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import buildHtml from '../../config/build/buildHtml'
import proxy from '../../config/server/proxy'

import { resolve } from 'path'
import fs from 'fs'

import { baseName } from './setting'


export default async () => {
  return defineConfig({
    plugins: [vue()],
    base: `/${baseName}`,
    build: {
      outDir: `../../dist/${baseName}`,
      // lib: {
      //   entry: resolve(__dirname, 'src/export.ts'),
      //   name: 'CommonNw',
      //   fileName: (format) => `commonnw.${format}.js`
      // },
      rollupOptions: {
        input: buildHtml(fs, (file: string) =>  resolve(__dirname, `./${file}`), baseName),
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
        sass: {
          javascriptEnabled: true,
          charset: false
        }
      }
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      cors: true,
      hmr: true,
      proxy: {
        ...proxy,
        "/web-wf": {
            target: `http://127.0.0.1:3001/web-wf`,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/web-wf/, '/')
        },
        "/web-smm": {
            target: `http://127.0.0.1:3002/web-smm`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-smm/, '/')
        },
        "/web-old": {
            target: `http://127.0.0.1:7999/web-old`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-old/, '/')
        },
        "/web-asset": {
            target: `http://127.0.0.1:3003/web-asset`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-asset/, '/')
        },
        "/web-study": {
            target: `http://127.0.0.1:3004/web-study`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-study/, '/')
        },
        "/web-mdm": {
            target: `http://127.0.0.1:3005/web-mdm`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-mdm/, '/')
        },
        "/web-labour": {
            target: `http://127.0.0.1:3006/web-labour`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/web-labour/, '/')
        }
      }
    }
  })
}
