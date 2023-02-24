
<template>
  <div class="wrapper-logo">
    <img :src="logo" width="38">
  </div>
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
  },
  setup() {
    const logo = ref<string>(window.localStorage.getItem('logo-img') || '')
    return {
      logo
    }
  }
})

</script>

<style scoped>

</style>
