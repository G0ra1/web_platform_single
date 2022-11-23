<template>
  <div :class="{
    'widget-shell': true,
    'active': props.value === ActiveWidget
  }"
    @click.stop="(e) => handleWidget(e)"
    @mouseenter="hoverWidget"
  >
    <div class="label">{{props.value.type}}</div>
    <slot>
    </slot>
  </div>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, getCurrentInstance } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NwIcon, RequestPaging, VxeHelper, request, NwTable,
} from '@platform/main'

import { designer } from '../../store/index'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    NwIcon
  },
  setup(props, context) {
    const handleWidget = (e) => {
      console.log(props.value)
      designer.handleActiveWidget(props.value)
      // alert(1)
      // designer.handleActiveWidget()
    }
    return {
      props,
      ActiveWidget: designer.ActiveWidget,
      handleWidget,
      hoverWidget (e) {
        // e.stopPropagation()
        // console.log('-=-=', e)
      }
    }
  }
})

</script>

<style  lang='less' scoped>
.widget-shell {
  position: relative;
  border: 1px dashed var(--gray3);
  padding: 19px;
  box-sizing: border-box;
  // pointer-events: none;
  // outline: 2px solid red;
  // &-hover {
  //   // background-color: red;

  // }
    // &:hover {
    //   outline: 2px solid red;
    // }
  &.active {
    outline: 2px solid var(--n-red4);
    >.label {
      color: var(--gray2);
      background-color: var(--light-gray3);
    }
  }
  &.hover {
    border: 1px solid var(--gray3);
  }
  >.label {
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 12px;
    line-height: 1;
    color: var(--gray4);
    // background-color: var(--light-gray3);
    padding: 1px 2px;
  }
}
</style>
