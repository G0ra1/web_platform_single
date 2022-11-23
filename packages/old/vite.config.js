import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import generateHtmlFile from './build/generate/generateHtmlFile.js';
import generateRollupOptionsInput from './build/generate/generateRollupOptionsInput.js';

let path = require('path');
// 192.168.1.21
//192.168.1.195
const IP = "192.168.0.196:8000"

const { resolve } = require('path')
const fs = require('fs')

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
import proxy from '../../config/server/proxy'

const baseName = 'web-old'
export default async ({ command, mode }) => {
  // npm_lifecycle_event 运行脚本名称
  // 生成html代码
  const pageItems = generateHtmlFile();
  // 生成输出配置
  const RollupOptionsInput = generateRollupOptionsInput(pageItems)
  return defineConfig({
    
    base: `/${baseName}`,
    plugins: [ vue() ],
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    define: {
      'process.env': process.env
    },
    build: {
      outDir: `../../dist/${baseName}`,
      rollupOptions: {
        input: {
          ...RollupOptionsInput
        },
        output: {
          manualChunks(id) { // 分包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    // 路径别名
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/@asset\//,
          replacement: pathResolve('src-asset') + '/',
        }
      ]
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
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ],
      },
    },
    server: {
      port: 7999,
      host: "0.0.0.0",
      proxy: {
        ...proxy
      }
    }
  })
}