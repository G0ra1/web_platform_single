<template>
  <n-modal
    class="nw-modal"
    v-model:show="handleVisible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    bordered
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>驳回</div>
    </template>
    <div class="handle-body" style="height: 300px">
      <vxe-grid
        v-bind="bind"
        ref="gridRef"
        style="width: 100%"
      >
      </vxe-grid>
    </div>
    <div class="handle-body" style="height: 100px; padding: 5px;">
      <n-input v-model:value="OpinionText" type="textarea" placeholder="驳回意见" />
    </div>
    <template #action>
      <div style="padding: 5px">
        <n-button :disabled="!ActiveNode" type="info" size="small" style="margin-right: 5px" @click="sendSubmit">
          提交
        </n-button>
        <n-button size="small" @click="handleVisible = false">取消</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSpace,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NDivider,
  NDrawer,
  NTabs,
  NTabPane
} from "naive-ui";
import {
  NwIcon,
  request
} from "@platform/main";

import {
  handleVisible,
  sendSubmit,
  NodeList,
  ActiveNode,
  OpinionText
} from '../store'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSpace,
    NCheckbox,
    NRadioGroup,
    NRadio,
    NDivider,
    NDrawer,
    NTabs,
    NTabPane
  },
  props: {},
  emits: ["callback"],
  setup(props: any, context: any) {
    const bind = reactive({
        rowId: 'id',
        size: 'mini',
        border: false,
        resizable: true,
        height: 'auto',
        align: null,
        data: NodeList,
        columns: [
          {
            field: 'nodeName',
            title: '节点名称'
          },
          {
            field: 'userNameCh',
            title: '办理人'
          },
          {
            field: 'description',
            title: '办理意见'
          },
          {
            field: 'updateTime',
            title: '办理时间'
          },
          {
            title: '操作',
            showHeaderOverflow: true,
            width: '70px',
            slots: {
              default: ({row}: any) => {
                
                return [
                  <NButton
                    size="tiny"
                    style="margin-right: 5px;"
                    type={ActiveNode.value === row ? 'success' : 'primary'}
                    onClick={() => {
                      if (ActiveNode.value === row) {
                        ActiveNode.value = null
                      } else {
                        ActiveNode.value = row
                      }
                    }}
                  >{{
                    default: () => ActiveNode.value === row ? '已选择' : '选择'
                  }}</NButton>
                ];
              },
            }
          }
        ]
      })
    return {
      handleVisible,
      sendSubmit,
      OpinionText,
      ActiveNode,
      bind
    };
  },
};
</script>

<style lang="less" scoped>
.handle-body {
  display: flex;
  border-bottom: 1px solid #ccc;
  .handle-body-tabs {
    display: flex;
    flex-direction: column;
    flex: 1;
    .handle-body-tab-pane {
      padding-top: 0;
      flex: 1
    }
  }
}

</style>
