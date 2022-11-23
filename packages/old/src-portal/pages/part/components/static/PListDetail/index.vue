<template>
  <n-card class="portal-panel p-task-detail" :bordered="false" size="small">
    <template #header>
      任务中心
    </template>
    <div style="height: calc(100vh - 240px)">
      <vxe-grid
        v-bind="gridOptionsDaiban"
        :ref="d => refMap['daiban'] = d"
      />
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
      NFormItem
    },
    setup () {

      // const urlMap = 

      const sysBizCode = ref('')

      const tabSelect = ref('daiban')
      // 所有ref 实例
      const refMap = reactive({
        
      })
      // 待办
      const gridOptionsDaiban = reactive({
        rowId: 'id',
        size: 'mini',
        // stripe: true,
        border: false,
        resizable: true,
        height: 'auto',
        align: null,
        columns: [
          { type: "seq", width: 40 },
          { field: "sysBizCode", title: "所属系统" },
          { field: "createUserName", title: "发起人", width: 70 },
          { field: "createUserParentDeptName", title: "部门", showHeaderOverflow: true },
          {
            title: '标题',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return <a
                  href="javascript: void(0)"
                  onClick={() => {
                    window.open(row.sysBizUrl)
                  }}
                >
                  {{
                    default: () => row.reason,
                  }}
                </a>
              }
            }
          },
          { field: "handleStartTime", title: "接收时间", showHeaderOverflow: true }
        ],
        pagerConfig: {
          pageSize: 20,
          pageSizes: [ 10, 20, 30]
        },
        proxyConfig: {
          form: true,
          seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
          props: {
            result: 'result',
            total: 'total'
          },
          ajax: {
            // 接收 Promise
            query: (...p) => {
              return  request({
                url: `/portal/portalContentTodoTasks/list`,
                method: 'post',
                data: {
                  sysBizCode: sysBizCode.value,
                  page: {
                    size: 10
                  }
                }
              }).then(res => {
                return {
                  result: res.records,
                  total: res.total
                }
              })
            }
          }
        },
        checkboxConfig: {
          // trigger: 'row',
          // reserve: true
        },
        radioConfig: {
          // trigger: 'row',
          reserve: true
        }
      })
      return {
        refMap,
        sysBizCode,
        tabSelect,
        gridOptionsDaiban,
        gridOptionsYiban,
        gridOptionsFaqi,
        gridOptionsDaiyue,
        gridOptionsYiyue,
        onChangeSysBizCode (p) {
          // console.log(refMap, p, refMap[tabSelect.value])
          refMap[tabSelect.value].commitProxy('query')
        }
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