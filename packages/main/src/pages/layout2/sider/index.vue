
<template>
    <nw-logo />
    <nw-menu />
    <nw-system />
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NConfigProvider,
    NSpace,
    NTag,
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

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import NwLogo from './logo.vue'
import NwMenu from './menu.vue'
import NwSystem from './system.vue'
import { registerListener, init } from './store'

registerListener()
export default defineComponent({

  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwLogo,
    NwMenu,
    NwSystem
  },
  setup () {
    init()
    return {

    }
  }
})

</script>

<style scoped>

</style>
