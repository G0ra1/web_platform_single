<template>
  <div :class="{
    'form-item': true,
    'active': FieldCompWidget.key === ActiveWidget?.key
  }"  @click="(e) => { e.stopPropagation(); handle()}">
    <n-form-item
      v-bind="FieldWidget.options.value"
    >
      <template v-if="isCustomDesigner">
      
        <component
          :is="`dw-${FieldCompWidget.tagName}`"
          :value="FieldCompWidget.config.value"
        >
        </component>
      </template>
      <template v-else>
        <component
          :is="FieldCompWidget.tagName"
          v-bind="FieldCompWidget.options.value"
        >
        </component>
      </template>

    </n-form-item>
    <div class="control" v-if="ActiveWidgetControl">
      <div class="btn top" v-if="ActiveWidgetControl.isMoveToUpGrid" @click="(e) => {e.stopPropagation(); ActiveWidgetControl!.moveToUpGrid!()}">
        <nw-icon name="icon-n-y-back" :size="10" />
      </div>
      <div class="btn bottom" v-if="ActiveWidgetControl.isMoveToDownGrid" @click="(e) => {e.stopPropagation(); ActiveWidgetControl!.moveToDownGrid!()}">
        <nw-icon name="icon-n-y-back" :size="10" />
      </div>
      <div class="btn left" v-if="ActiveWidgetControl.isExchangeLeft" @click="(e) => {e.stopPropagation(); ActiveWidgetControl!.exchangeLeft!()}">
        <nw-icon name="icon-n-y-jiaohuan" :size="10" />
      </div>
      <div class="btn right" v-if="ActiveWidgetControl.isExchangeRight" @click="(e) => {e.stopPropagation(); ActiveWidgetControl!.exchangeRight!()}">
        <nw-icon name="icon-n-y-jiaohuan" :size="10" />
      </div>
      <div class="btn remove"  @click.stop="ActiveWidgetControl?.remove">
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
import { WidgetControl, WidgetFormatControl } from "../../model/designer";

import type { WidgetNS } from "../../model/widget.d";
// 行拖拽

//

export default defineComponent({
  props: ["value", "grid", "grids"],
  components: {
    NwIcon,
  },
  setup(props, context) {
    const { handleActiveWidget, ActiveWidget, ActiveWidgetControl } = designer;
    const GiWidget: any = props.value!
    // computed(() => !!GiWidget.value.internalOptions?.isCustomDesigner)
    const FieldWidget = new Widget(GiWidget.slots.default[0], "default")
    console.log('==========GiWidget.value========', GiWidget)
    const FieldCompWidget = new Widget(GiWidget.slots.default[0].slots.default[0], "default")
    const isCustomDesigner = FieldCompWidget.config.value.isCustomDesigner
    return {
      ActiveWidgetControl,
      isCustomDesigner,
      ActiveWidget,
      GiWidget,
      FieldWidget,
      FieldCompWidget,
      handle () {
        handleActiveWidget(FieldCompWidget.config.value, props.value, props.grid, props.grids) 
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
