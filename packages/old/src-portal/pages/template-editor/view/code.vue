<template>
  <n-layout class="code-layout" has-sider position="static" >
    <n-layout-sider
    class="code-layout-left"
    bordered
    collapse-mode="width"
    :collapsed-width="0"
    :width="200"
    >
      <n-layout-header 
        class="code-layout-left-header"
      >
        组件资源
      </n-layout-header>
      <n-layout-content
        class="card-parts"
        :native-scrollbar="false"
      >
        <parts />
      </n-layout-content>
      <n-layout-header 
        class="code-layout-left-header"
      >
        门户资源
      </n-layout-header>
      <n-layout-content class="card-page" :native-scrollbar="false">
        <page-tree />
      </n-layout-content>
    </n-layout-sider>
    <n-layout-content class="code-layout-content" :native-scrollbar="false" >
      <div class="code-layout-content-tabs">
        <div class="left">
          <Editing />
        </div>
        <div class="right">
          <n-button text title="实时预览" style="margin-right:5px;">
          <NwIcon
            class="cbtn"
            name="icon-genzong"
            :size="18"
            @click="handleCurr"
            :color="isCurrDebug ? '#ff5722' : '#ccc'"
            
          />
          </n-button>
          <n-button text title="保存所有" style="margin-right:5px;">
          <NwIcon
            class="cbtn"
            name="icon-save"
            :size="18"
            @click="handleSaveAll"
            
          />
          </n-button>
          <!-- <n-button text title="运行">
          <NwIcon
            class="cbtn"
            name="icon-yunxing"
            :size="18"
            @click="handleRun"
            
          />
          </n-button> -->
          <n-button text title="运行">
          <NwIcon
            class="cbtn"
            name="icon-yunxing"
            :size="18"
            @click="handleRunNewWin"
            
          />
          </n-button>
        </div>
      </div>
      <!-- 这里放编辑器 -->
      <Editor v-if="viewActive === 'code'" />
      <Design v-if="viewActive === 'design'" />
      <!-- 这里放切换 -->
      <div class="nw-layout-footer-action-bar">
        <div
          :class="{
            'item-code': true,
            'nw-layout-footer-action-bar-item': true,
            'select': viewActive === 'design'
          }"
          @click="viewActive = 'design'"
        >设计</div>
        <div
          :class="{
            'item-code': true,
            'nw-layout-footer-action-bar-item': true,
            'select': viewActive === 'code'
          }"
          @click="viewActive = 'code'"
        >CODE</div>
      </div>
    </n-layout-content>
    <n-layout-sider
      class="code-layout-right"
      :width="225"
      border
      collapse-mode="width"
      :collapsed-width="0"
      :collapsed="attributesSiderCollapsed"
    >
      <Params />
    </n-layout-sider>
    <n-layout-sider
    class="code-layout-right"
    :width="1000"
    border
    collapse-mode="width"
    :collapsed-width="0"
    :collapsed="collapsedR"
    >
      <render-frame
        ref="renderFrame"
        @close="collapsedR = true"
      />
    </n-layout-sider>
  </n-layout>
</template>
<script>
import { ref, reactive, nextTick } from 'vue'
import { cloneDeep } from 'lodash'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton
} from 'naive-ui'

import jsBeautify from 'js-beautify'
// import * as monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import NwIcon from '/@/components/nw-icon/index.vue'
import RenderFrame from '../../template-render/index.vue'
import {
  website,
  saveToWebSite,
  viewActive,
  attributesSiderCollapsed,

  addEditorEventListener,
  removeEditorEventListener
} from '../store'
import { get } from 'lodash'

import PageTree from '../components/side/source.vue'
import Parts from '../components/side/parts.vue'

import Editing from '../components/header/editing.vue'

import Editor from './editor/index.vue'
import Design from './design/index.vue'

import Params from '../components/side/params.vue'
// const mode = {
//   template: 'html',
//   script: 'javascript',
//   css: 'css'
// }

// 初始化语言规范
// self.MonacoEnvironment = {
//   getWorker(_, label) {
//     if (label === 'json') {
//       return new jsonWorker()
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return new cssWorker()
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return new htmlWorker()
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return new tsWorker()
//     }
//     return new editorWorker()
//   }
// }

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    RenderFrame,
    PageTree,
    Editing,
    Editor,
    Design,
    Parts,
    Params
  },
  props:{
  },
  setup(props){
    const newWindow = ref(null)
    const renderFrame = ref(null) // 预览frame
    const collapsedR = ref(true) // 右侧栏收缩
    // const viewActive = ref('code')

    // 执行预览
    const handleRun = () => {
      // 这里需要判断窗口是否独立弹出
      collapsedR.value = false
     
      // 运行时取出 template export defult 等
      // str.match(/^<template>([\s\S]*)<\/template>\n<script>/);
      // str.match(/<\/template>\n<script>\n([\s\S]*)\n<\/script>/)[1]

      // console.log('website', JSON.stringify(website));
      renderFrame.value.run(cloneDeep(website))

      // renderFrame.value.run({
      //   template: code.template.replace(/(^<template>)|(<\/template>$)/g,''),
      //   script: code.script.replace(/(^export default )/g,''),
      //   css: code.css
      // })
    }
    // 给编辑器设定数据
    const analysisVue = (template, script) => {
      // console.log(x2js)
      // const xmlstr = `<template>
      //   <div class="render-frame">
      //     <div
      //       class="render-frame-header"
      //     >
            
      //       <n-button
              
      //         :click="handleClose"
      //       ><nw-icon name="icon-guanbichuangkou" /> </n-button>
      //     </div>
      //     <iframe
      //       class="render-frame-content"
      //       ref="renderFrame"
      //       src="/html/portal/template-render.html"
      //     >

      //     </iframe>
      //     <div
      //       class="render-frame-header"
      //     >
            
      //     </div>
      //   </div>
      // </template>
      // `
      // console.log(xmlJs.xml2js(xmlstr))
    }
      // vue文件解析
      
    // 初始化编辑器
    nextTick().then(d => {
    })
    
    const handleRunNewWin = () => {
      // 将数据写入缓存
      window.PROTAL_TEMPATE_CODE_CACHE = cloneDeep(website)
      if (window.PROTAL_TEMPATE_WIN) {
        window.PROTAL_TEMPATE_WIN.postMessage(cloneDeep(website), '*')
      } else {
        window.PROTAL_TEMPATE_WIN = window.open(
          `/html/portal/template-render.html?debug=1#/index`,
          '_blank',
          'height=800,width=1000,screenY=0,screenX=300,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no'
        )

      }
      // newWindow.value.postMessage(cloneDeep(website), '*')
    }
    
    const isCurrDebug = ref(false)
    const handleCurr = () => {
      isCurrDebug.value = !isCurrDebug.value
      if (isCurrDebug.value) {
        handleRunNewWin()
        addEditorEventListener('CHANGE_MOD', (e) => {
            console.log('=======CHANGE_MOD=====', e)
            window.PROTAL_TEMPATE_WIN && window.PROTAL_TEMPATE_WIN.postMessage(cloneDeep(website), '*')
        })
      } else {
        removeEditorEventListener('CHANGE_MOD')
      }
    }
    return {
      handleCurr,
      isCurrDebug,
      attributesSiderCollapsed, // 侧菜单展示
      viewActive,
      renderFrame, // iframe dom
      collapsedR, // 右侧开启
      // 触发运行
      handleRun,
      handleRunNewWin,
      handleSaveAll () {
        saveToWebSite()
      },
      // 编辑器值设定
      analysisVue
    }
  }
}
</script>

<style lang='less'>
.code-layout {
  height: 100%;
  &-left {
    background: #2b2b2b !important;
    border-right: 1px solid #333 !important;
    &-header {
      background: unset !important;
      font-size: 12px !important;
      color: #ccc !important;
      // font-weight: bold !important;
      padding-left: 5px;
      border-bottom: 2px solid #1e1e1e;
    }
    .card-parts {
      display: flex;
      height: calc(~'100% - 348px');
      border-bottom: 1px solid #333;
      box-sizing: border-box;
      width: 100%;
      background: unset !important;
    }
    .card-page {
      display: flex;
      height: 300px;
      color: #ccc;
      flex-direction: column;
      background: unset !important;
    }
  }
  &-right {
    border-left: 1px solid #333 !important;
    background: #2b2b2b !important;
  }
  &-content {
    height: 100%;
    .n-scrollbar-content {
      height: 100%;
    }
    &-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 28px;
      background: #1e1e1e;
      >.left {
        display: inline-flex;
        // border-bottom: 1px solid #ccc;
        .cbtn {
          display: inline-block;
          padding: 2px 10px;
          cursor: pointer;
          background: #363636;
          color: #787878;
          // width: 90px;
          >.icon {
            color: #a95812;
          }
          &.active {
            background: #1e1e1e;
            color: #eee;
            // font-weight: bold;
            >.icon {
              color: #f1fa8c
            }
          }
        }
      }
      >.right {
        display: inline-flex;
        padding: 0 5px;
        .cbtn {
          color: #787878;
          cursor: pointer;
        }
        .cbtn:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>