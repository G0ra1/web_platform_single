<template>
  <div class="pro-properties-panel" style="padding-top: 4px;height: calc(100% - 4px)">
    <component ref="pv" v-if="actionElBusinessObject && tagName" :is="tagName" />
    <!-- <n-spin v-if="!actionElBusinessObject" class="spin">请选择一个元素</n-spin> -->
    <div v-if="!actionElBusinessObject" style="display: flex;height:100%;justify-content: center;align-items: center;">
      <nw-icon name="icon-kongkongde" :size="20" style="margin-right: 4px;" />请选择一个元素
    </div>
  </div>
</template>
<script lang="jsx">
import { h, reactive, ref, watch, computed, nextTick } from "vue";
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
import models from "./model/index"

import {
  actionEl,
  actionElBusinessObject
} from "../../store/bpmn"

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
    NSpin,
    ...models
  },
  setup() {
    const tagName = ref('')
    // watch(actionEl, () => {
    //   tagName.value = ''
    //   nextTick().then(() => {
    //     tagName.value = actionEl.value.tagName
    //   })
    // })
    watch(actionElBusinessObject, () => {
      // 这里
      tagName.value = ''
      nextTick().then(() => {
        tagName.value = (actionElBusinessObject && actionElBusinessObject.value)  ? actionElBusinessObject.value.$type.replace(':', '-') : ''
      })
    })
    return {
      actionElBusinessObject,
      actionEl,
      tagName
      // tagName: computed(() => {
      //   // 这里已经调用
      //   return actionElBusinessObject ? actionElBusinessObject.value.$type.replace(':', '-') : ''
      // })
    };
  },
};
</script>
<style lang="less">
.pro-properties-panel {
  &-content {
    height: calc(~'100vh - 84px');
    background: none
  }
}
</style>
