<template>
  <n-card class="portal-panel p-task-detail" :bordered="false" size="small">
    <template #header>
      任务中心
    </template>
    <div style="height: calc(100vh - 240px)">
      <div>
        <div
        v-for="item in result"
        :key="item.id"
        >
          <div
          :style="`background: url(${item.imgSrc || ''}) center center no-repeat;background-color: #333`"
          ></div>
          <div></div>
        </div>
      </div>
        <n-pagination :item-count="101">
          <template #prefix="{ itemCount , startIndex }">
            从第 {{ startIndex }} 项开始, 共 {{ itemCount }} 项
          </template>
          <template #suffix="{ endIndex }"> 从第 {{ endIndex }} 项结束 </template>
        </n-pagination>
    </div>
  </n-card>
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  // console.log('===ej2btn===', GridComponent);
  import { h, defineComponent, ref, reactive } from 'vue'
  import { request } from '@platform/main'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NSpace,
    NSelect,
    NPagination,
    useMessage
  } from 'naive-ui'
  export default defineComponent({
    components: {
      NSpace,
      NDrawer,
      NDrawerContent,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      NInput,
      NForm,
      NSelect,
      NFormItem,
      NPagination
    },
    setup () {

      // const urlMap = 

      const sysBizCode = ref('')

      const tabSelect = ref('daiban')
      // 所有ref 实例
      const refMap = reactive({
        
      })
      return {
        result: []
      }
    }
  })
</script>
<style lang='scss'>
  $vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>

.p-task-detail {
  &.n-card > .n-card__content {
    padding: 0;
  }
  > .n-card-header {
    border-bottom: none !important;
  }
  &-header {
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  &-tabs {
    position: absolute;
    left: 70px;
    bottom: -6px;
    display: inline-block;
    width: auto;
    margin-left: 10px;
    z-index: 11;
    &.n-tabs {
      > .n-tabs-nav {
        line-height: 1;
        &.n-tabs-nav--card-type .n-tabs-tab {
          font-size: 12px;
          padding: 8px;
            background-color: #fff;
          &.n-tabs-tab--active {
            border-bottom: 1px solid #f8f8f9;
            background-color: #f8f8f9;
          }
        }
      }
      > .n-tab-pane {
        padding: 0;
      }
    }
  }
}
</style>