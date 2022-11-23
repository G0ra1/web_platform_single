<template>
  <!-- <n-message-provider>
    <n-notification-provider> -->
      <n-spin :show="editorSpinVisible">
        <div style="display:block; height: 100vh" >
          <n-layout class="nw-layout" position="absolute">
            <n-layout-header class="nw-layout-header">
              <v-menu />
              <v-title />
              <div></div>
              <!-- 模板标题 -->
            </n-layout-header>
            <!-- 设计模式 -->
            <n-layout-content class="nw-layout-body">
              <!-- <v-design v-show="viewActive === 'design'" /> -->
              <v-code />
            </n-layout-content>
            <!-- <n-layout-footer class="nw-layout-footer" >
                <div class="nw-layout-footer-action-bar">
                  <div
                    :class="{
                      'nw-layout-footer-action-bar-item': true,
                      'select': viewActive === 'design'
                    }"
                    @click="handleView('design')"
                  >
                    设计
                  </div>
                  <div
                    :class="{
                      'nw-layout-footer-action-bar-item': true,
                      'select': viewActive === 'preview'
                    }"
                    @click="handleView('preview')"
                  >
                    预览
                  </div>
                  <div
                    :class="{
                      'item-code': true,
                      'nw-layout-footer-action-bar-item': true,
                      'select': viewActive === 'code'
                    }"
                    @click="handleView('code')"
                  >
                    CODE
                  </div>
                </div>
            </n-layout-footer> -->
          </n-layout>
        </div>
      </n-spin>
    <!-- </n-notification-provider>
  </n-message-provider> -->
</template>
<script>
import { h, ref, reactive, nextTick } from 'vue'
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
  NButton,
  useMessage,
  useDialog
} from 'naive-ui'
import VCode from './view/code.vue'
// import VDesign from './view/design.vue'
// import VPreview from './view/preview.vue'
import VMenu from './components/header/menu.vue'
import VTitle from './components/header/title.vue'
import { parseQuery } from '/@/utils'
import {
  editorSpinVisible,
  modalVisible,
  requestQueryTemplate,
  openPageByKey,
  initBasicData,
  providerWindow
} from './store'
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
    VCode,
    VMenu,
    VTitle
  },
  props:{
    value: {
      type: String,
      default: `<template><\/template><script><\/script><style><\/style>`
      // default: () => ({
      //   template: '',
      //   script: 'export default {}',
      //   css: ''
      // })
    }
  },
  setup(props){
    // 初始化放入公共信息提示对象
    providerWindow.message = useMessage()
    providerWindow.dialog = useDialog()
    // 初始化数据------
    // 这里判断是否为新增
    const urlParams = parseQuery(window.location.search.substr(1))

    initBasicData(urlParams.action, urlParams.id).then(() => {
      openPageByKey('index')
    })
    // 默认打开框架页和首页
    nextTick().then(() => {
      openPageByKey('index')
    })
    return {
      editorSpinVisible,
    }
  }
}
</script>

<style lang='less'>
@import "./style/index.less";
// html,
// body {
//   margin:0;
//   padding: 0;
//   height: 100%;
// }
// #app {
//   position:relative;
//   width: 100%;
//   height: 100%;
// }
</style>