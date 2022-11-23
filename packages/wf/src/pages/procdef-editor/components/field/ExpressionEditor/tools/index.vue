<template>
  <div class="graph-tools">
    <div class="graph-tools-left">
      <div class="graph-tools-btn" title="树形（详细）" @click="setLayout('tree-fat')">
        <nw-icon name="icon-n-y-tree-fat" :size="20" />
      </div>
      <div class="graph-tools-btn" title="簇布局" @click="setLayout('cluster')">
        <nw-icon name="icon-n-y-layout-cluster" :size="20" />
      </div>
      <div class="graph-tools-btn" title="树形（简单）" @click="setLayout('tree-thin')">
        <nw-icon name="icon-n-y-layout-tree-thin" :size="20" />
      </div>
      <div class="graph-tools-hr" >&nbsp;</div>
      <div class="graph-tools-btn" title="直线" @click="setDiagonal('Line')">
        <nw-icon name="icon-n-y-xianduan" :size="18" />
      </div>
      <div class="graph-tools-btn" title="折线" @click="setDiagonal('RightAngle')">
        <nw-icon name="icon-n-y-zhexian" :size="18" />
      </div>
      <div class="graph-tools-btn" title="曲线" @click="setDiagonal('Smooth')">
        <nw-icon name="icon-n-y-quxian" :size="18" />
      </div>
      <div class="graph-tools-hr" >&nbsp;</div>
    </div>
    <div class="graph-tools-right">
      <div class="graph-tools-btn" title="取消编辑表达式" @click="cancelEdit">
        <nw-icon name="icon-n-y-cancel-edit" :size="18" />
      </div>
    </div>
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
  graphRef,
  treeFun,
  clearEditing
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
    return {
      setLayout (l) {
        graphRef.value.setLayout(l)
        graphRef.value.drawn()
      },
      setDiagonal (l) {
        graphRef.value.setDiagonal(l)
        graphRef.value.drawn()
      },
      cancelEdit() {
        clearEditing()
        graphRef.value.editExp = null
        graphRef.value.drawn()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.graph-tools {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2px;
  background: #cccccc4d;
  justify-content: space-between;
  &-btn:hover, &.action {
    border: 1px solid #ccc;
    background: #fff;
  }
  &-btn {
    border: 1px solid #cccccc00;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:2px;
    cursor: pointer;
    &.disabled {
      cursor:not-allowed;
      color: rgb(163, 161, 161);
    }
  }
  &-hr {
    width: 1px;
    overflow: hidden;
    background: #ccc;
    margin: 0 3px;
  }
  &-left, &-right {
    display: flex;
  }
}
</style>