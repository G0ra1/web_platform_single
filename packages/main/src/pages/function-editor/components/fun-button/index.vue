<template>
  <div>
    
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import {

  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NTabs,
  NTabPane,
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
  NTreeSelect,
  NCheckbox,
  NRadio,
  NRadioGroup,
  NSpin,
  NDivider
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { buttons } from '../../store/index'

export default defineComponent({
  name: "Basic",
  components: {
      
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NTabs,
    NTabPane,
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
    NTreeSelect,
    NCheckbox,
    NRadio,
    NRadioGroup,
    NSpin,
    NDivider,
    NwIconPick,
    NwPickForm
  },
  setup() {
    return {
      buttons
    }
  },
})
</script>

<style lang="less" scoped>
</style>
