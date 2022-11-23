<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0 5px 5px 5px"
    :show-icon="true"
    :mask-closable="false"
    :closable="false"
  >
    <template #icon>
      <nw-icon name="icon-model-form" :size="16" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        表达式
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
   
    <template #action> </template>
  </n-modal>
</template>
<script lang="jsx">
import { h, reactive, ref, watch } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NSteps,
  NStep,
  NGrid,
  NTree,
  NButton,
  NConfigProvider,
  NModal,
  NForm,
  NFormItem,
  NFormItemGi,
  NInput,
  NSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
} from "naive-ui";
import { NwIcon, NwDic } from '@platform/main';
import {
  visible
 } from "../../../store/modal-init-control"
export default {
  props: {},
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NSteps,
    NStep,
    NGrid,
    NTree,
    NButton,
    NwIcon,
    NConfigProvider,
    NModal,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NFormItemGi,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NwDic,
    NSpin
  },
  setup() {
    return {
      visible
    };
  },
};
</script>
<style lang="less">
.init-modal-layout {
  &-sider {
    .n-layout-sider-scroll-container {
      padding: 8px;
      background: #2b2b2b;
      font-size:12px
    }
  }
  &-content {
    background: #1e1e1e;
  }
  &-footer {
    padding: 5px 5px 0 0;
    text-align: right;
    .control-btn {
      margin-right: 5px;
    }
  }
  
}

.step-layout {
    height: 100%;
    background: #1e1e1e !important;
    &-header {
        padding: 8px;
        height: 35px;
        background: none !important;
        font-size: 16px;
        font-weight: bold;
        color: #ccc !important;
    }
    &-content {
        height: calc(~'100% - 35px');
        width: 100%;
        background: none !important;
    }
}
</style>
