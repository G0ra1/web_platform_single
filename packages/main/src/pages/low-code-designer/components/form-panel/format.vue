<template>
  <div :class="{
    'form-item': true,
    'active': FieldCompWidget.key === ActiveWidget?.key
  }"  @click="(e) => { e.stopPropagation(); handle()}">
    <component
      :is="FieldCompWidget.tagName"
      v-bind="FieldCompWidget.options.value"
    >
    </component>
    <div class="control" v-if="ActiveWidgetControl">
      <div class="btn remove"  @click="ActiveWidgetControl?.remove">
        <nw-icon name="icon-n-y-thinclose" :size="8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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

import { designer } from "../../store/index";
import { compileConfig } from "../../utils/index";

import { Widget } from "../../model/widget";

import type { WidgetNS } from "../../model/widget.d";
// 行拖拽

//

export default defineComponent({
  props: ["value", "grids"],
  components: {
    NwIcon,
  },
  setup(props, context) {
    const { handleActiveWidget, ActiveWidget, ActiveWidgetControl } = designer;
    const FieldCompWidget: Widget = new Widget(props.value!, "default")
    const isCustomDesigner = FieldCompWidget.config.value.isCustomDesigner
    return {
      ActiveWidgetControl,
      isCustomDesigner,
      ActiveWidget,
      FieldCompWidget,
      handle () {
        handleActiveWidget(FieldCompWidget.config.value, undefined, undefined, props.grids) 
      },
      // 直接实现删除
      remove () {

      }
    };
  },
});
</script>

<style lang="less">
.form-panel {
  box-sizing: border-box;
  height: 100%;
  > .header {
    height: 32px;
    box-sizing: border-box;
    border-bottom: var(--border);
  }
  > .content {
    height: calc(~"100% - 32px");
    padding: 20px;
    box-sizing: border-box;
    background: var(--light-gray5);
    > .page {
      height: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      // background: #fff;
      // background-image: linear-gradient(90deg, rgba(60, 10, 30, .08) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .08) 3%, transparent 0);
      // background-size: 20px 20px;
      // background-position: 40%;
      background-repeat: repeat;
      background-color: #fff;
      // padding: 10px;
    }
  }
}
.form-item {
  position: relative;
  padding: 5px;
  cursor: move;
  border-radius: 4px;
  > .n-form-item {
    pointer-events: none;
  }
  &:hover {
    background: #f4f4f4;
  }
  &.active {
    background: #ddebff;
    >.control {
      display: block;
    }
  }
  >.control {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    >.btn {
      position: absolute;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      // border: 1px solid #ccc;
      border-radius: 10px;
      background: #fff;
      width: 16px;
      height: 16px;
      box-shadow: 0px 0px 2px 1px #000000b8;
      cursor: pointer;

      
      &.top {
        transform: rotate(90deg);
        left: calc(50% - 8px);
        top: -8px;
      }
      &.bottom {
        transform: rotate(-90deg);
        left: calc(50% - 8px);
        bottom: -8px;
      }
      &.left {
        left: -8px;
        top: calc(50% - 8px);
      }
      &.right {
        right: -8px;
        top: calc(50% - 8px);
      }
      &.remove {
        right: -8px;
        top: -8px;
      }
    }
  }
}
</style>
