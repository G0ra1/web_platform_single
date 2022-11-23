<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      功能编辑
    </n-layout-header>
    <n-layout-content content-style="display: flex;height: 100%;width: 100%;overflow: visible;">
      <div class="fe-layout-content-left">
        <function-demo />
      </div>
      <div class="fe-layout-content-right">
        <n-layout style="height: 100%" :native-scrollbar="false">
          <n-divider title-placement="left">
            基础信息
          </n-divider>
          <fun-basic />
          <n-divider title-placement="left">
            内容
          </n-divider>
          <fun-content />
          <n-divider title-placement="left">
            按钮
          </n-divider>
          <NwCodeMirror :value="buttonsCode" @update:value="updateButtons" />
          <n-divider title-placement="left">
            脚本
          </n-divider>
          <NwOpenapiPick @callback="InterfacesCallback" />
          <fun-script />
        </n-layout>
      </div>
    </n-layout-content>
    <n-layout-footer>
      <div class="left">
        <n-button type="info" size="small" style="margin-right: 5px;" @click="handleShowPreview">预览</n-button>
      </div>
      <div class="right">
        <n-button type="info" size="small" style="margin-right: 5px;" @click="saveFun">保存</n-button>
        <n-button size="small">关闭</n-button>
      </div>
    </n-layout-footer>
  </n-layout>
  <n-drawer v-model:show="previewVisible" width="100%">
    <!-- <nw-function-view
      ref="previewFunctionViewRef"
      @cancel="onPreviewCancel"
      @complete="onPreviewComplete"
    /> -->
  </n-drawer>
</template>

<script>
import { defineComponent, ref, computed, nextTick } from 'vue'

import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NSpin,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NDivider,
  NButton,
  NDrawer
} from 'naive-ui'
import FunctionDemo from './components/function-demo/index.vue'
import FunBasic from './components/fun-basic/index.vue'
import FunContent from './components/fun-content/index.vue'
import FunScript from './components/fun-script/index.vue'
import { basic, content, script, buttons, saveFun, init, actionInit } from './store/index'
import testData from './store/test'
// import NwFunctionView from '/src-model/components/function-view/index.vue'

import { NwOpenapiPick, NwCodeMirror } from '@platform/main'

export default defineComponent({
  name: "DSplitterDemoDirection",
  components: {
    NwOpenapiPick,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NSpin,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    FunctionDemo,
    NDivider,
    NwCodeMirror,
    FunBasic,
    FunContent,
    FunScript,
    NButton,
    NDrawer,
    // NwFunctionView
  },
  setup() {
    const previewVisible = ref(false)
    const previewFunctionViewRef = ref(null)
    actionInit()
    return {
      previewFunctionViewRef,
      theme: {

        Button: {
          heightSmall: '22px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
      },
      script,
      buttons,
      previewVisible,
      handleShowPreview() {
        previewVisible.value = true
        // 组装
        console.log('buttons.value==', buttons.value)
        const configData = {
          basic: basic.value,
          content: content.value,
          script: script.value,
          buttons: buttons.value,
        }
        console.log('configData==', configData, JSON.stringify(configData))

        nextTick().then(() => {
          previewFunctionViewRef.value.init(configData, {})
        })
      },
      buttonsCode: computed(() => {
        return JSON.stringify(buttons.value, null, '\t')
      }),
      updateButtons: (e) => {
        buttons.value = new Function(`return ${e}`)()
      },
      // 
      onPreviewCancel: () => {
        previewVisible.value = false
      },
      onPreviewComplete: () => {
        previewVisible.value = false
      },
      saveFun,
      InterfacesCallback(d) {
        console.log(d)
        const request = (reqParam) => `Request({
            url: '${d.mthPath}',
            method: '${d.mthMethod}',
            data: ${reqParam}
        })`


      }
    }
  },
})
</script>

<style lang="less">
 .fe-layout {
   &-header {
     display: flex;
     align-items: center;
     font-size: 16px;
     font-weight: bold;
     padding-left: 5px;
     height: 32px;
     border-bottom: 1px solid #ccc;
   }

   &-content {
     height: calc(~"100vh - 64px");

     &-left {
       width: 480px;
     }

     &-right {
       flex: 1;
       border-left: 1px solid #ccc;
       box-shadow: -2px 2px 5px 0px #ccc;
     }
   }

   &-footer {
     display: flex;
     justify-content: space-between;
     border-top: 1px solid #ccc;
     height: 42px;
     padding: 0 5px;

     .left {
       display: flex;
       align-items: center;
     }

     .right {
       display: flex;
       align-items: center;
     }
   }
 }
</style>
