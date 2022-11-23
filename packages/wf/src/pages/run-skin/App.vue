<template>
  <n-message-provider>
    <n-layout class="nw-layout-full">
      <n-layout-header bordered>
        <h3 style="padding-left: 10px">{{WfSendData.reason}}</h3>
      </n-layout-header>
      <n-layout-content>
        <n-layout has-sider sider-placement="right" style="height: 100%">
          <!-- 表单页签 -->
          <n-layout-content>
            <form-viewer ref="FormFrameRef" />
          </n-layout-content>
          <n-layout-sider bordered content-style="display: flex;flex-direction: column;">
            <n-scrollbar style="flex: 1">
              <procdef-info ref="ProcdefInfoRef" />
              <user-info ref="UserInfoRef" />
              <log-info ref="LogInfoRef" />
            </n-scrollbar>
            <div style="display: flex;justify-content: end ;padding: 5px;height: 32px;">
              <process-action
                ref="ProcessActionRef"
                :actionType="ParamAction"
              />
            </div>
          </n-layout-sider>
        </n-layout>
      </n-layout-content>
    </n-layout>
  </n-message-provider>
  <init-modal ref="StateModalRef" />
</template>

<script lang='tsx'>

import { h, defineComponent, ref, reactive, nextTick, getCurrentInstance } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  NMessageProvider,
  NScrollbar
} from "naive-ui";
import InitModal from './components/init-modal/index.vue'
import ProcdefInfo from './components/procdef-info/index.vue'
import UserInfo from './components/user-info/index.vue'
import LogInfo from './components/log-info/index.vue'

import ProcessAction from './components/process-action/index.vue'
import FormViewer from './components/form-viewer/index.vue'

import {
  init,
  ParamAction,
  StateModalRef,
  FormFrameRef,
  ProcdefInfoRef,
  UserInfoRef,
  LogInfoRef,
  ProcessActionRef,
  WfSendData
} from './store/index'


export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NMessageProvider,

    InitModal,
    FormViewer,
    ProcdefInfo,
    UserInfo,
    LogInfo,
    ProcessAction,
    NScrollbar
  },
  setup(props, context) {
    
    nextTick().then(() => {
      init()
    })
    return {
      ParamAction,
      WfSendData,
      StateModalRef,
      FormFrameRef,
      ProcdefInfoRef,
      UserInfoRef,
      LogInfoRef,
      ProcessActionRef
    };
  }
});
</script>
<style lang="less">
  @import url('./style/index.less');
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
</style>