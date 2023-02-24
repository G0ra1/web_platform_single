<template>
  <draggable
    class="widget-group"
    tag="div"
    :list="Grid"
    item-key="key"
    :group="{ name: 'dragGroup', put: true }"
    ghost-class="ghost"
    :sort="true"
    :move="dragMove"
    @end="dragEnd"
    :animation="200"
  >
    <template #item="{ element: item }">
      <div class="grid-item" v-if="item.tagName === 'n-grid'" >
        <!-- <NwFieldAnchorTarget :label="item.label" :target="item.key" /> -->
        <!-- 这里需要对象化 -->
        <n-grid v-bind="new Widget(item, 'default').options.value">
          <template
            v-for="gi in item.slots.default.map((d: any) => new Widget(d, 'default'))"
            :key="gi.key"
          >
            <n-gi v-bind="gi.options.value">
              <FieldWidget :value="gi.config.value" :grid="item" :grids="Grid" />
            </n-gi>
          </template>
        </n-grid>
      </div>
      <div class="grid-item" v-else >
        <FormatWidget :value="item" :grids="Grid" />
      </div>
    </template>
  </draggable>
</template>

<script lang="tsx">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  h,
  onMounted,
  provide,
  toRaw,
} from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NwIcon, RequestPaging, VxeHelper, request } from "@platform/main";

import { Widget } from "../../model/widget";

import type { WidgetNS } from "../../model/widget.d";

import FieldWidget from "./field.vue";
import FormatWidget from "./format.vue";
// 行拖拽

//

import { designer } from "../../store/index"

export default defineComponent({
  props: ["value"],
  components: {
    NwIcon,
    FieldWidget,
    FormatWidget
  },
  setup(props, context) {
    const { ActiveWidget, ActiveWidgetControl } = designer;
    const GridWidgets = computed(() => {
      return props.value!.map((d: WidgetNS.Config) => new Widget(d, "default"));
    });

    const Grid = computed(() => {
      return props.value;
    });
    return {
      ActiveWidget,
      Grid,
      GridWidgets,
      Widget,
      dragMove(...p: any) {
        // console.log("====dragMove====", p);
      },
      dragEnd() {
        if (ActiveWidgetControl.value) {
          ActiveWidgetControl.value!.refresh!()
        }
        
        // 这里
      }
    };
  },
});
</script>

<style lang="less">
.widget-group {
  padding: 20px;
}
// .ghost {
//   height: 0px !important;
//   border: 1px solid var(--n-red3);
//   width: 100% !important;
//   overflow: hidden;
//   background-color: var(--n-red3);
//   &::after {
//     content: none;
//   }
 
// }
</style>
