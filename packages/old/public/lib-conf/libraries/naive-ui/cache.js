// 表单files
const cache = {
    version: '1.0',
    componentLibName: 'naive-ui',
    fileDir: [
      {
        type: 'dir', 
        name: '/public'
      },
      {
        type: 'dir',
        name: '/src'
      },
      {
        type: 'dir',
        name: '/src/api'
      },
      {
        type: 'file',
        name: '/src/api/index.js',
        contents: `// api
        import { request } from '@platform/main'
        `
      },
      {
        type: 'file',
        name: '/src/store.js',
        contents: `import { ref, reactive } from 'vue'
        export const dataModel = reactive({})
        `
      },
      {
        type: 'file',
        name: '/src/Form.vue',
        contents: `<template>
        <n-form
            :model="model"
            :rules="rules"
            ref="formRef"
            label-placement="left"
            :label-width="160"
            size="small"
            :style="{
            maxWidth: '640px'
            }"
        >
            <n-form-item label="Input" path="inputValue">
            <n-input placeholder="Input" v-model:value="model.inputValue" />
            </n-form-item>
        </n-form>
        </template>
        <script>
            import { defineComponent, ref } from 'vue'
            import {
            useMessage,
            NForm,
            NGrid,
            NFormItem,
            NFormItemGi,
            NSelect,
            NInput,
            NTransfer,
            NRadio,
            NRadioGroup,
            NRadioButton,
            NSwitch,
            NDatePicker,
            NMessageProvider
            } from 'naive-ui'

            export default defineComponent({
                components: {
                NForm,
                NGrid,
                NFormItem,
                NFormItemGi,
                NSelect,
                NInput,
                NTransfer,
                NRadio,
                NRadioGroup,
                NRadioButton,
                NSwitch,
                NDatePicker,
                NMessageProvider
                },
                setup () {
                    const formRef = ref(null)
                    return {
                        formRef,
                        model: ref({
                            inputValue: null
                        }),
                        rules: {
                            inputValue: {
                                required: true,
                                trigger: ['blur', 'input'],
                                message: '请输入 inputValue'
                            }
                        }
                    }
                }
            })
        </script>
        <style>
        </style>
        `,
      },
      {
        type: 'file',
        name: '/src/App.vue',
        contents: `<script setup>
        import { NMessageProvider } from 'naive-ui'
        import Form from './Form.vue'
        </script>
        <template>
            <n-message-provider>
                <Form />
            </n-message-provider>
        </template>
        <style>
        </style>
        `,
      },
      {
        type: 'file',
        name: '/src/main.js',
        contents: `import { createApp } from 'vue'
        import App from './App.vue'
        createApp(App).mount('#app')
        `,
      },
      {
        type: 'file',
        name: '/index.html',
        contents: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite App</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.js"></script>
          </body>
        </html>
        `,
      },
      {
        type: 'file',
        name: '/.gitignore',
        contents: `node_modules
        .DS_Store
        dist
        dist-ssr
        *.local`,
      },
      {
        type: 'file',
        name: '/package.json',
        contents: `{
          "name": "basic-project",
          "version": "0.0.0",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "serve": "vite preview"
          },
          "dependencies": {
            "vue": "^3.2.16"
          },
          "devDependencies": {
            "@vitejs/plugin-vue": "^1.9.3",
            "vite": "^2.6.4",
            "naive-ui": "^2.16.2"
          }
        }`,
      },
      {
        type: 'file',
        name: '/vite.config.js',
        contents: `import { defineConfig } from 'vite'
        import vue from '@vitejs/plugin-vue'
        export default defineConfig({
          plugins: [vue()]
        })`,
      },
    ]
  }

console.log(JSON.stringify(cache))