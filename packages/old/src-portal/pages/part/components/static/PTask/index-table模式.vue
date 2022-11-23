<template>
  <n-card class="portal-panel p-task" :bordered="false" size="small">
    <template #header-extra>
      <a href="javascript:void(0)" @click="handleMore">更多</a>
    </template>
    <template #header>
      <div class="p-task-header">
        <div style="width: 40px">任务</div>
        <n-tabs
          class="p-task-tabs"
          size="small"
          type="card"
          tab-style="min-width: 40px;"
          :pane-style="{
            display: 'none'
          }"
          v-model:value="sysBizCode"
          @update:value="onChangeBizCode"
        >
          <n-tab-pane
            tab="所有"
            name=""
          />
          <n-tab-pane
            tab="OA待办"
            name="OA"
          />
          <n-tab-pane
            tab="GEPS待办"
            name="GEPS"
          />
          <!-- <n-tab-pane
            tab="待办"
            name="daiban"
          />
          <n-tab-pane
            tab="已办"
            name="yiban"
          />
          <n-tab-pane
            tab="发起"
            name="faqi"
          />
          <n-tab-pane
            tab="待阅"
            name="daiyue"
          />
          <n-tab-pane
            tab="已阅"
            name="yiyue"
          /> -->
        </n-tabs>
      </div>
    </template>
    <div style="height: 250px;">
      <vxe-grid
        v-bind="gridOptions"
        ref="gridComponent"
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
    useMessage
  } from 'naive-ui'
  import { useRoute, useRouter } from 'vue-router'
  import cookies from "/@/utils/cookies.js";
  
  export default defineComponent({
    props: {
      moreUrl: {
        type: String,
        default: '/taskDetail',
      },
    },
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
      NFormItem
    },
    setup (props) {
      // 所属系统
      const sysBizCode = ref('')

      const gridComponent = ref(null)

      const router = useRouter()
      // -===========通用===========
      const gridOptions = reactive({
        rowId: 'id',
        size: 'mini',
        // stripe: true,
        border: false,
        resizable: true,
        height: 'auto',
        align: null,
        columns: [
          { type: "seq", title: "序号", width: 45 },
          {
            title: '标题',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return <a
                  href="javascript: void(0)"
                  onClick={() => {
                    const token = cookies.get("token");
                    const tokenType = cookies.get("tokenType");
                    window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
                  }}
                >
                  {{
                    default: () => row.procinsName, // row.reason,
                  }}
                </a>
              }
            }
          },
          { field: "currentNodeName", title: "当前节点", width: 70 },
          // { field: "createUserName", title: "发起人", width: 70 }, //currentNodeName
          // { field: "createUserParentDeptName", title: "发起部门", showHeaderOverflow: true },
          // { field: "createTime", title: "发起时间", showHeaderOverflow: true, width: 140 },
          { field: "createTime", title: "接收时间", showHeaderOverflow: true, width: 140 },
          { field: "sysBizClassify", title: "分类", width: 70 },
          { field: "sysBizCode", title: "系统", width: 80 },
        ],
        pagerConfig: {
          enabled: false
        },
        proxyConfig: {
          form: true,
          seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
          props: {
            list: 'list'
          },
          ajax: {
            // 接收 Promise
            query: (...p) => {
              console.log('====query====', p);
             
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
                  list: res.records
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
        gridComponent,
        sysBizCode,
        gridOptions,
        handleMore () {
          router.push(props.moreUrl)
        },
        onChangeBizCode (p) {
          sysBizCode.value = p
          gridComponent.value.commitProxy('query')
        }
      }
    }
  })
</script>
<style lang='scss'>
  $vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-task {
  &.n-card > .n-card__content {
    padding: 0;
  }
  > .n-card-header {
    border-bottom: none !important;
  }
  &-header {
    display: flex;
    position: relative;
  }
  &-tabs {
    position: absolute;
    left: 30px;
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