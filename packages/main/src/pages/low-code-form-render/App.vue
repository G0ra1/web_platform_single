<template>
  <n-config-provider
    :theme-overrides="theme"
    abstract
  >
   
  </n-config-provider>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NwIcon, RequestPaging, VxeHelper, request, NwPickAny
} from '@platform/main'



import theme from './theme/index'

export default defineComponent({
  components: {
    NwIcon
  },
  setup(props, context) {
    return {
      theme
    }
  }
})

</script>

<style  lang='less' >
@import "./style/index.less";

</style>
