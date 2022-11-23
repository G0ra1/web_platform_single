<template>
  <div class="express-view">
    {{expStr}}
  </div>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  treeFun
} from "../../../../store/cache-expression"

export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon
  },
  props:{
    // 数据
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props){
    const expStr = computed(() => treeFun(props.value))
    return {
      expStr
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../style/vxe-table.less";
.express-view {
    position: relative;
    // border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    // height: calc(100% - 10px);
    padding: 5px;
    > .switch {

    }

    &-outlink {

        transition: .4s;
        -moz-transition: .4s; /* Firefox 4 */
        -webkit-transition: .4s; /* Safari and Chrome */
        -o-transition: .4s; /* Opera */
        position: absolute;
        left: 0px;
        top: -1px;
        z-index: 1;
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        border-right: none;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #fff;
        &.active {

            left: -50px;
            box-shadow: -1px 1px 6px #ccc;
        }
        
    }
    &-items {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 2;
        height: 100%;
        width: 100%;
        background: #fff;
    }
    &-code {
        height: 100%;
    }
}
</style>