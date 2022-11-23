<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 500px;"
    :show-icon="false"
    :mask-closable="false"
    :closable="false"
    
  >
    <template #header>
      流程模型验证
    </template>
    <div class="v-msgs">
      <div class="v-msg" v-for="(item, i) in msg" :key="i">
        <nw-icon
          :name="item.icon"
          :size="16"
          style="margin-right: 5px;"
          color="#e91e63"
        />{{item.text}}
      </div>
    </div>
    <template #action>
      <n-button
        type="default"
        size="small"
        @click="visible = false"
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
  visible,
  msg
 } from "../../../store/verification"

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
      visible,
      msg
    };
  },
};
</script>
<style lang="less">
.v-msgs {

}
.v-msg {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
