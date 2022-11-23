
<template>
    <div class="back">
        <app-in />
    </div>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
} from "naive-ui";

import AppIn from './app-in.vue'


export default defineComponent({
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    AppIn
  },
  setup () {
    return {
        
    }
  }
})

</script>

<style lang="less">

</style>
