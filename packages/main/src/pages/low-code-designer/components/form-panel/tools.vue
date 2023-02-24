<template>
  <div class="tools">
    <div class="left tabs">
      <n-tabs v-model:value="switchType" :theme-overrides="{
        tabGapMediumBar: '15px'
      }" >
        <n-tab name="design">
          设计器
        </n-tab>
        <n-tab name="json">
          JSON
        </n-tab>
        <n-tab name="code">
          CODE
        </n-tab>
      </n-tabs>
    </div>
    <div class="right">
      <n-button text >
        <NwIcon name="icon-n-y-box" :size="20" />
      </n-button>
    </div>
  </div>
  
</template>

<script lang="ts">
import { ref, reactive, defineComponent, nextTick, h, onMounted, provide } from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NwIcon, RequestPaging, VxeHelper, request } from "@platform/main";

import { Tools } from '../../model/tools'

import { designer } from '../../store/index'
export default defineComponent({
  components: {
    NwIcon
  },
  setup(props, context) {
    const { Tools: { switchType } } = designer
    return { switchType };
  },
});
</script>

<style lang="less">
.tools {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;
  // justify-content: flex-end;
  justify-content: space-between;
  >.left,>.right {
    display: flex;
    align-items: center;
  }
  >.tabs {
    // height:100%;
    // position: absolute;
    // left: 5px;
    // bottom: -1px;
    >.tab {
      border: 1px solid #ccc;
      border-bottom: 1px solid #fff;
      background-color: #fff;
      margin-right: 5px;
      padding: 0 5px;
    }
  }
}
</style>
