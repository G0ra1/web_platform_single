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
        // 新建接口
        export function create(params) {
            return request({
                url: '',
                method: 'post',
                data: params
            })
        }
        // 删除接口
        export function del(id) {
            return request({
                url: '',
                method: 'delete',
            })
        }
        // 编辑接口
        export function edit(params) {
            return request({
                url: '',
                method: 'put',
                data: params
            })
        }
        // 查询接口
        export function query(data) {
            return request({
                url: '',
                method: 'get',
            })
        }
        `
      },
      {
        type: 'file',
        name: '/src/store.js',
        contents: `import { ref, nextTick } from 'vue'
        import { query, create, edit, del } from './api/index.js'
        export const formRef = ref(null)
        export const pageRef = ref(null)
        export const tableRef = ref(null)
        export const visible = ref(false)
        export const action = ref('create')
        export const vbind = {
            request: {
                XHR: query, // promise 请求函数
                pageMethod: (current, size) => ({
                    page: {
                    current,
                    size,
                    },
                })
            },
            response: {
                dataMethod: (res) => res,
                pageMethod: () => {}
            }
        }
        
        export const handleShow = (row) => {
            action.value = row ? 'edit' : 'create'
            visible.value = true
            nextTick().then(() => {
              formRef.value.setValue(row || {})
            })
        }
        
        export const handleSave = () => {
          
            (action.value === 'create' ? create : edit)({
                dictId: '1458608540775092226',
                isTrusted: true,
                ...formRef.value.getValue()
            }).then(res => {
                visible.value = false
                tableRef.value.commitQuery();
            })
        }
        
        export const handleCancel = () => {
            visible.value = false
        }
        
        export const handleDel = (id) => {
            del(id).then(() => {
                tableRef.value.commitQuery();
            });
        }`
      },
      {
        type: 'file',
        name: '/src/Page.vue',
        contents: `<template>
        <n-layout class="nw-page" ref="pageRef">
          <n-layout-header>
            <h1>标题</h1>
            <div class="nw-page-header-right">
              <NwTableFun :table="tableRef"></NwTableFun>
            </div>
          </n-layout-header>
          <n-layout-content>
            <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
              <template v-slot:header-left="{ selected }">
                <n-button type="info" size="small" style="margin-right: 5px" @click="handleShow()"
                  >添加</n-button
                >
              </template>
              <template #header-right>
              </template>
              <template v-slot:search-form="{ searchFormData, searchFormData2 }">
                <n-form :model="searchFormData"> </n-form>
              </template>
            </NwTable>
          </n-layout-content>
        </n-layout>
        <n-drawer
          v-model:show="visible"
          :to="pageRef && pageRef.$el"
          width="600px"
          :height="200"
          placement="right"
        >
          <n-drawer-content
            :title="action === 'create' ? '新建' : '编辑'"
            :header-style="{
              padding: '10px',
              'font-size': '16px',
              'font-weight': 'bold',
            }"
            :footer-style="{
              padding: '10px',
            }"
          >
            <nw-form-view
              ref="formRef"
              src="/html/model/vue-runtime.html?formId="
            />
            <template #footer>
              <n-button type="info" size="small" style="margin-right: 5px" @click="handleSave"
                >保存</n-button
              >
              <n-button size="small" @click="handleCancel">取消</n-button>
            </template>
          </n-drawer-content>
        </n-drawer>
      </template>
      
      <script lang="jsx">
      import { defineComponent, reactive, ref, h } from "vue";
      import nt from "/@/components/nw-table/index.js";
      import {
        NDrawer,
        NDrawerContent,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NThemeEditor,
        NButton,
        NInputGroup,
        NInput,
        NForm,
        NFormItem,
        NPopconfirm,
        useMessage,
      } from "naive-ui";
      import NwFormView from "/@/components/nw-form-view/index.vue";
      import {
        action,
        vbind,
        visible,
        formRef,
        pageRef,
        tableRef,
        handleShow,
        handleSave,
        handleCancel,
        handleDel,
      } from "./store.js";
      
      export default defineComponent({
        components: {
          NwTable: nt.NwTable,
          NwTableFun: nt.NwTableFun,
          NDrawer,
          NDrawerContent,
          NLayout,
          NLayoutHeader,
          NLayoutContent,
          NLayoutFooter,
          NThemeEditor,
          NButton,
          NInputGroup,
          NInput,
          NForm,
          NFormItem,
          NPopconfirm,
          NwFormView,
        },
        setup() {
          const columns = reactive([
            { type: "checkbox", width: 35 },
            {
              field: "column1",
              title: "列1",
            },
            {
              field: "",
              title: "操作",
              showHeaderOverflow: true,
              slots: {
                default: ({ row }) => {
                  return [
                    <div>
                      <a
                        style="color:#2d8cf0;cursor: pointer;display:inline-block"
                        onClick={() => {
                          handleShow(row);
                        }}
                      >
                        {"编辑"}
                      </a>
                      <NPopconfirm
                        onPositive-click={(e) => {
                          handleDel(row.id);
                        }}
                        positive-text="确定"
                        negative-text="取消"
                      >
                        {{
                          trigger: () => (
                            <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">
                              {"删除"}
                            </a>
                          ),
                          default: () => "是否删除当前项?",
                        }}
                      </NPopconfirm>
                    </div>,
                  ];
                },
              },
            },
          ]);
          return {
              action,
            vbind,
            visible,
            formRef,
            pageRef,
            tableRef,
            columns,
            handleShow,
            handleSave,
            handleCancel
          };
        },
      });
      </script>
      `,
      },
      {
        type: 'file',
        name: '/src/App.vue',
        contents: `<script setup>
        import { NMessageProvider } from 'naive-ui'
        import Page from './Page.vue'
        </script>
        <template>
            <n-message-provider>
                <Page />
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