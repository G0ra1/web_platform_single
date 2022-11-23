<template>
  <draggable
      class="widget-group"
      tag="div"
      :list="props.value"
      item-key="key"
      :group="{name: 'dragGroup', pull: 'clone', put: false}"
      :clone="handleWidgetClone"
      ghost-class="ghost"
      :sort="false"
      :move="checkMove"
      @end="() => {}"
  
  >
      <template #item="{ element: ctn }">
          <div class="widget-item">
              <NwIcon :name="ctn.icon" :size="26" />
              <div class="text">{{ctn.label}}</div>
          </div>
      </template>
  </draggable>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NScrollbar, useMessage } from "naive-ui";
import { NwIcon, RequestPaging, VxeHelper, request, NwTable } from "@platform/main";

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    NScrollbar,
    NwIcon,
  },
  setup(props, context) {
    return {
      props,
      handleWidgetClone () {

      },
      checkMove () {

      }
    };
  },
});
</script>

<style lang="less" scoped>
.widget-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  > .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    flex: 0 1 32px;
    align-items: center;
    > .title {
      font-size: 14px;
      font-weight: bold;
      text-indent: 10px;
    }
  }

  > .content {
    flex: 1;
    .widget-group {
        display: flex;
        padding: 0 6px;
        flex-wrap: wrap;
    }
  }
}
.widget-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 60px;
  cursor: pointer;
  margin-top: 10px;
  // background-color: red;
  > .text {
  }
  &:hover {
    box-shadow: 0 0 6px rgba(0,0,0,.3);
  }
}
</style>
