<template>
  <n-layout class="nw-layout" style="background: none">
    <n-layout-header bordered class="attr-header" style="height: 32px;">
      {{ActiveWidget.label}}
    </n-layout-header>
    <n-layout-content content-style="padding: 15px 10px;background: none">
      <component :is="`dw-attr-${ActiveWidget.tagName}`"></component>
    </n-layout-content>
  </n-layout>

</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, provide } from 'vue'

import {
  NwIcon, RequestPaging, VxeHelper, request,
} from '@platform/main'

import { designer } from '../../store/index'
import { compileConfig } from '../../utils/index'

export default defineComponent({
  components: {
  },
  setup(props, context) {
    const {
      ActiveWidget
    } = designer
    
    // console.log('ActiveWidget', ActiveWidget)
    return {
      ActiveWidget
    }
  }
})

</script>

<style  lang='less'>
.attr-header {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5px;
}
</style>
