<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <div class="process-overview" style="border: 1px solid #ccc;">
    <div class="process-overview-header">
      <template v-if="props.calledElement">
        <div>
          <!-- <nw-icon :name="props" /> -->
          {{props.childProcdefName}}
          <!-- ({{props.calledElement}}) -->
        </div>
        <div class="version">v{{props.calledElementVersion}}</div>
      </template>
      
      <template v-if="!props.calledElement">
        <div>
          未选择流程
        </div>
      </template>
    </div>
    <div class="process-overview-body">
      <div class="xtext">这里应该是缩略图</div>
    </div>
  </div>
  <process-modal ref="processModalRef" @update:callback="callback" />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NTag
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import ProcessModal from './modal.vue'
export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    ProcessModal,
    NTag
  },
  props:{
    childProcdefName: {
      type: String,
      default: ''
    },
    calledElementVersion: {
      type: String,
      default: ''
    },
    calledElement: {
      type: String,
      default: ''
    },
  },
  setup (props, context) {
    // 模态展示
    const visible = ref(false)
    const processModalRef = ref(null)

    return {
      props,
      visible,
      processModalRef,
      show () {
        processModalRef.value.show(props.value)
      },
      callback (d) {
        console.log('==callback==', d)
        // cb
        context.emit('update:calledElement', d.camundaProcdefKey)
        context.emit('update:calledElementVersion', d.procdefVersion)
        context.emit('update:cmdChildLogProcdefId', d.camundaProcdefId)
        context.emit('update:ctmChildLogProcdefId', d.id)
        context.emit('update:childProcdefName', d.procdefName)
      }
      
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
.process-overview {
  width: 100%;
  &-header {
    padding: 3px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    .version {
      height: 14px;
      line-height: 14px;
      border-radius: 12px;
      background: #f56c6c;
      padding: 0 5px;
      color: #fff;
    }
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
    background: #fff;
    overflow: hidden;
    .xtext {
      color: #ccc;
    }
  }
}

.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
}
</style>