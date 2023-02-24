<template>
  <n-layout class="nw-layout-full" style="background: none">
    <n-layout-header bordered class="attr-header" style="height: 32px">
      {{ props.title }}
    </n-layout-header>
    <n-layout-content content-style="padding: 15px 10px;background: none">
      <slot></slot>
    </n-layout-content>
  </n-layout>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, getCurrentInstance } from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { NwIcon, RequestPaging, VxeHelper, request, NwTable } from "@platform/main";

import { designer } from "../../store/index";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
  components: {
    NwIcon,
  },
  setup(props, context) {
    return {
      props
    }
  },
});
</script>

<style lang="less" scoped>

</style>
