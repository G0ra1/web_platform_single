<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
      测试合并行树形表
    </n-layout-header>
    <n-layout-content>
      <vxe-grid
        v-bind="bind"
        ref="gridRef"
      >
      </vxe-grid>
    </n-layout-content>
  </n-layout>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
} from 'naive-ui'

import { NwIcon, RequestPaging, VxeHelper, NwFunctionAccess, NwFunctionPredefine } from '@platform/main'

import datax from './data'

import { 
  hierarchy as d3Hierarchy,
  max as d3Max
} from 'd3'


const treeRootNode = d3Hierarchy({
  kids: datax.data,
  id: '0'
}, (d: any) => d.kids)


// 获取所有叶节点
const leaveNode = treeRootNode.leaves()

// 记录最大列
let maxColumn = 0

// 遍历所有叶节点 生成行数据
const data:any = leaveNode.map((d: any) => {

  const row = d.ancestors() // 获取叶节点的所有父级
  .reverse()                // 翻转
  .slice(1)                 // 去掉第一个根节点
  .map((d: any) => {
    let span = 0 // 记录一个默认合并值为0，代表单元格隐藏
    if (!d.data._span) {  // 查看该对象是否计算过合并值
      span = d.data._span = d.leaves().length
    }
    
    return {       // 生成列数据
      menuName: d.data.menuName,  // 记录菜单信息
      span   // 记录合并行数量 该数量为当前节点的所有叶节点数量
    }
  })
  // 记录最大列数
  if (row.length > maxColumn) maxColumn = row.length

  return row
})
// 生成列配置
const columns: Array<any> = []
for (let i = 0; i < maxColumn; i ++) {
  columns.push({
    title: '',
    slots: {
      default: ({ row }: any) => {
        return row[i] ? row[i].menuName : '';
      },
    }
  })
}

// 合并单元格方法
const spanMethod = ({
    rowIndex,
    columnIndex,
    visibleData
}: any) => {
  const cell = visibleData[rowIndex][columnIndex]
  if (cell) {
    return { rowspan: cell.span, colspan: 1 }
  } else {
    return { rowspan: 1, colspan: 1 }
  }
  
}
export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwFunctionAccess,
    NwFunctionPredefine
  },
  setup () {
    const bind: any = {
        showHeader: false,
        rowId: 'id',
        size: 'mini',
        border: true,
        resizable: true,
        height: 'auto',
        align: null,
        spanMethod,
        data,
        columns
      }
    return {
      bind
    }
  }
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
