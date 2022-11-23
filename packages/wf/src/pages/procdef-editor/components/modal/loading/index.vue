<template>
  <n-modal
    v-model:show="SndSaveVisible"
    preset="dialog"
    style="width: 400px;"
    :show-icon="false"
    :mask-closable="false"
    :closable="false"
    
  >
    <template #icon>
    </template>
    <template #header>
    处理中...
    </template>
    <div>
      <div v-for="(item, key) in SndSaveMsg" :key="key">
        {{item.text}}
      </div>

    </div>
    <template #action>
      <n-button
        type="default"
        size="small"
        @click="SndSaveVisible = false"
      >
        关闭
      </n-button>
    </template>
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
  SndSaveVisible,
  SndSaveMsg
 } from "../../../store/index"
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
      SndSaveVisible,
      SndSaveMsg
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
