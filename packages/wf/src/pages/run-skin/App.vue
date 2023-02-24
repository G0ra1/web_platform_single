<template>
  <n-layout class="nw-layout-full">
    <n-layout-header bordered style="height: 50px;">
      <h3 style="padding-left: 10px;color: rgba(1, 1, 1, 0.94);font-size: 18px;font-weight: 400;">{{WfSendData.reason}}</h3>
      <n-button text @click="closeAll"><nw-icon
        name="icon-n-y-close"
        color="grey"
        style="cursor:pointer"
        
      />
      </n-button>
    </n-layout-header>
    <n-layout-content >
      <form-viewer ref="FormFrameRef" />
    </n-layout-content>
    <n-layout-footer>
      <div style="display: flex;justify-content: space-between ;padding: 12px;width: 100%;">
        <div>
        </div>
        <div style="display: flex;">
          <n-button
            v-if="ParamAction !== 'create'"
            style="margin-right: 20px;"
            @click="LogModalRef.show(WfSendData.camundaProcinsId)"
            class="liuchengBtn"
          
          >
            流程日志
          </n-button>
          <process-action
            ref="ProcessActionRef"
            :actionType="ParamAction"
          />
        </div>
      </div>
    </n-layout-footer>
  </n-layout>
  <init-modal ref="StateModalRef" />
  <log-modal ref="LogModalRef" />
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
import { NwIcon } from "@platform/main"
import InitModal from './components/init-modal/index.vue'
import ProcdefInfo from './components/procdef-info/index.vue'
import UserInfo from './components/user-info/index.vue'
import LogInfo from './components/log-info/index.vue'

import ProcessAction from './components/process-action/index.vue'
import FormViewer from './components/form-viewer/index.vue'

import LogModal from './components/log-info/logModal.vue'

import {
  init,
  ParamAction,
  StateModalRef,
  FormFrameRef,
  ProcdefInfoRef,
  UserInfoRef,
  LogInfoRef,
  ProcessActionRef,
  WfSendData,
  onComplete
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
    NScrollbar,
    LogModal,
    NwIcon
  },
  setup(props, context) {
    const LogModalRef = ref<any>()
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
      ProcessActionRef,
      LogModalRef,
      closeAll () {
        
        onComplete('close')
      }
    };
  }
});
</script>
<style lang="less">
  @import url('./style/index.less');
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
</style>