<template>
  <n-layout class="nw-layout-full">
      <n-layout-header>
        <div class="title">功能编辑</div>
      </n-layout-header>
      <n-layout-content>
        <div class="content">
          
            <n-scrollbar style="">
              <div style="width: 800px;margin: 0 auto">
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
                  <NwCodeMirror :disabled="false" :value="buttonsCode" @update:value="updateButtons" />
                  <n-divider title-placement="left">
                    脚本
                  </n-divider>
                  <NwOpenapiPick @callback="InterfacesCallback" />
                  <fun-script />
              </div>
            </n-scrollbar>
          <!-- <div class="fe-layout-content-left">
            <function-demo />
          </div>
          <div class="fe-layout-content-right">
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
          </div> -->
        </div>
        <!--  -->
      </n-layout-content>
      <n-layout-footer>
        <div style="padding: 0 5px;">
        <n-button type="info" size="small" style="margin-right: 5px;" @click="handleShowPreview">预览</n-button>
        </div>
        <div style="padding: 0 5px;">
        <n-button type="info" size="small" style="margin-right: 5px;" @click="saveFun">保存</n-button>
        <n-button size="small" @click="handleCancel">关闭</n-button>
        </div>
      </n-layout-footer>
  </n-layout>
  <!-- <n-drawer v-model:show="previewVisible" width="100%">
  </n-drawer> -->
  
  <nw-function-viewer
    ref="previewFunctionViewRef"
    @cancel="onPreviewCancel"
    @complete="onPreviewComplete"
  />
</template>

<script lang="jsx">
import { defineComponent, ref, computed, nextTick, h } from 'vue'

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
  NDrawer,
  NInput,
  NScrollbar,
  useDialog
} from 'naive-ui'
import FunctionDemo from './components/function-demo/index.vue'
import FunBasic from './components/fun-basic/index.vue'
import FunContent from './components/fun-content/index.vue'
import FunScript from './components/fun-script/index.vue'
import { basic, content, script, buttons, saveFun, init, actionInit } from './store/index'
import testData from './store/test'
// import NwFunctionView from '/src-model/components/function-view/index.vue'

import { NwOpenapiPick, NwCodeMirror, NwFunctionViewer } from '@platform/main'

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
    NInput,
    NDrawer,
    NScrollbar,
    NwFunctionViewer
    // NwFunctionView
  },
  setup() {
    const dialog = useDialog()
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
        // 预览之前录入测试参数
        const paramsStr = ref('[{}]')
        const errorStr = ref('')
        const previewDialog = dialog.warning({
          title: '输入测试参数',
          content: () => {
            return [
            <div style="padding: 5px;">
              <NInput
              value={paramsStr.value}
              onUpdateValue={(d) => { paramsStr.value = d }}
              type="textarea" style="height: 100px;" ></NInput>
            </div>]
          },
          action: () => {
            return [
              <div style="color: red">{errorStr.value}</div>,
              <NButton type="primary" onClick={() => {
                try {
                  
                  const params = JSON.parse(paramsStr.value)
                  // 关闭
                  previewDialog.destroy()
                  previewFunctionViewRef.value.show({
                    ...basic.value,
                    ...content.value,
                    buttons: JSON.stringify(buttons.value),
                    script: JSON.stringify(script.value),
                  }, params)
                } catch (error) {
                  errorStr.value = 'JSON解析错误'
                }
              }}>确定</NButton>
            ]
          }
        });
        

        // 组装
        // console.log('buttons.value==', buttons.value)
        // const configData = {
        //   basic: basic.value,
        //   content: content.value,
        //   script: script.value,
        //   buttons: buttons.value,
        // }
        // console.log('configData==', configData, JSON.stringify(configData))

        // previewFunctionViewRef.value.init(configData, {})
        // nextTick().then(() => {
        //   previewVisible.value = true
        // })
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


      },
      handleCancel () {
        window.parent.dispatchEvent(new Event('hashchange'))
      }
    }
  },
})
</script>

<style lang="less" scoped>

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .left {
      display: flex;
      flex: 0 0 400px;
      // flex: 1;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }

</style>
