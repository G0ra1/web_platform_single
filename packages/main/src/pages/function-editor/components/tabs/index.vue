<template>
  
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
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { basic } from '../../store/index'

import { NwIconPick } from '@platform/main'

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
    NwIconPick
  },
  setup() {
    return {
      basic
    }
  },
})
</script>

<style lang="less" scoped>
</style>
