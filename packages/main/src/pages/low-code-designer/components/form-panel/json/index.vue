<template>
  <div class="page" >
    <NwCodeMirror :value="JsonStr" />
  </div>
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

import { NwIcon, RequestPaging, VxeHelper, request, NwCodeMirror } from "@platform/main";

import { designer } from "../../../store/index";

export default defineComponent({
  components: {
    NwIcon,
    NwCodeMirror
  },
  setup(props, context) {
    const {
      SourceWidget
    } = designer
    return {
      JsonStr: computed(() => {
        return JSON.stringify(SourceWidget.value, null, 2)
      })
    }
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
      position: relative;
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
      > .n-form {
        height: 100%;
        > .n-tabs {
          height: 100%;
          display: flex;
          flex-direction: column;
          > .n-tabs-pane-wrapper {
            flex: 1;
            > .n-tab-pane {
              height: 100%;
              box-sizing: border-box;
              > .n-scrollbar {
                padding: 0 10px;
                box-sizing: border-box;
              }
            }
          }
        }
        > .n-scrollbar {
          // padding: 20px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
