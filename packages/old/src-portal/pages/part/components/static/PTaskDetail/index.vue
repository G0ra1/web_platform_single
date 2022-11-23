<template>
  <n-card class="portal-panel p-task-detail" :bordered="false" size="small">
    <template #header-extra>
      <n-select
        v-model:value="sysBizCode"
        @update:value="onChangeSysBizCode"
        size="small"
        :theme-overrides="{
          peers: {
            InternalSelection: {
              heightSmall: '22px',
              fontSizeSmall: '12px',
            },
          },
        }"
        style="width: 140px"
        :options="[
          {
            label: '所有系统',
            value: '',
          },
          {
            label: 'OA',
            value: 'OA',
          },
          {
            label: 'GEPS',
            value: 'GEPS',
          },
        ]"
      />
    </template>
    <template #header>
      <div class="p-task-detail-header">
        <div style="width: 80px">任务中心</div>
        <n-tabs
          class="p-task-detail-tabs"
          size="small"
          type="card"
          tab-style="min-width: 40px;"
          :pane-style="{
            display: 'none',
          }"
          v-model:value="tabSelect"
        >
          <n-tab-pane tab="待办" name="daiban" />
          <n-tab-pane tab="已办" name="yiban" />
          <n-tab-pane tab="发起" name="faqi" />
          <n-tab-pane tab="待阅" name="daiyue" />
          <n-tab-pane tab="已阅" name="yiyue" />
        </n-tabs>
      </div>
    </template>
    <div style="height: calc(100vh - 240px)">
      <vxe-grid
        v-if="tabSelect === 'daiban'"
        v-bind="gridOptionsDaiban"
        :ref="(d) => (refMap['daiban'] = d)"
      />
      <vxe-grid
        v-if="tabSelect === 'yiban'"
        v-bind="gridOptionsYiban"
        :ref="(d) => (refMap['yiban'] = d)"
      />
      <vxe-grid
        v-if="tabSelect === 'faqi'"
        v-bind="gridOptionsFaqi"
        :ref="(d) => (refMap['faqi'] = d)"
      />
      <vxe-grid
        v-if="tabSelect === 'daiyue'"
        v-bind="gridOptionsDaiyue"
        :ref="(d) => (refMap['daiyue'] = d)"
      />
      <vxe-grid
        v-if="tabSelect === 'yiyue'"
        v-bind="gridOptionsYiyue"
        :ref="(d) => (refMap['yiyue'] = d)"
      />
    </div>
  </n-card>
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  // console.log('===ej2btn===', GridComponent);
  import { h, defineComponent, ref, reactive,watch,onMounted } from 'vue'
  import { onBeforeRouteUpdate } from "vue-router";
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
  import cookies from "/@/utils/cookies.js";
  
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
      const openTargetPage = (url) => {
          const token = cookies.get("token");
          const tokenType = cookies.get("tokenType");
          window.open(`${url}&token=${tokenType} ${token}`)
      }
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
          pageSize: 10,
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
                    size: p[0].page.pageSize,
                    current:p[0].page.currentPage
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
      const gridOptionsYiban = reactive({
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
            //enabled: false
          pageSize: 10,
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
              console.log('====query====', p);
             
              return  request({
                url: `/portal/portalContentDoneTasks/list`,
                method: 'post',
                data: {
                  sysBizCode: sysBizCode.value,
                  page: {
                    size: p[0].page.pageSize,
                    current:p[0].page.currentPage
                  }
                }
              }).then(res => {
              console.log('====query==res==', res);
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
      // 发起
      const gridOptionsFaqi = reactive({
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
          // { field: "currentNodeName", title: "当前节点", width: 70 },
          // { field: "createUserName", title: "发起人", width: 70 }, //currentNodeName
          // { field: "createUserParentDeptName", title: "发起部门", showHeaderOverflow: true },
          // { field: "createTime", title: "发起时间", showHeaderOverflow: true, width: 140 },
          // { field: "createTime", title: "接收时间", showHeaderOverflow: true, width: 140 },
          { field: "sysBizClassify", title: "分类", width: 70 },
          { field: "sysBizCode", title: "系统", width: 80 },
        ],
        pagerConfig: {
            //enabled: false
          pageSize: 10,
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
            query: (res) => {
            console.log(res,'res..............')
              return  request({
                url: `/portal/portalContentMydraftTasks/list`,
                method: 'post',
                data: {
                  sysBizCode: sysBizCode.value,
                  page: {
                    size: res.page.pageSize,
                    current:res.page.currentPage
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
      // 待阅
      const gridOptionsDaiyue = reactive({
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
          // { field: "createUserName", title: "发起人", width: 70 }, //currentNodeName
          // { field: "createUserParentDeptName", title: "发起部门", showHeaderOverflow: true },
          // { field: "createTime", title: "发起时间", showHeaderOverflow: true, width: 140 },
          { field: "createTime", title: "接收时间", showHeaderOverflow: true, width: 140 },
          { field: "sysBizClassify", title: "分类", width: 70 },
          { field: "sysBizCode", title: "系统", width: 80 },
        ],
        pagerConfig: {
            //enabled: false
          pageSize: 10,
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
            query: (res) => {
             console.log(res.page.pageSize,'111111111111111')
              return  request({
                url: `/portal/portalContentUnreadTasks/list`,
                method: 'post',
                data: {
                  sysBizCode: sysBizCode.value,
                  page: {
                    size: res.page.pageSize,
                    current:res.page.currentPage
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
      // 已阅
      const gridOptionsYiyue = reactive({
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
          // { field: "createUserName", title: "发起人", width: 70 }, //currentNodeName
          // { field: "createUserParentDeptName", title: "发起部门", showHeaderOverflow: true },
          // { field: "createTime", title: "发起时间", showHeaderOverflow: true, width: 140 },
          { field: "createTime", title: "接收时间", showHeaderOverflow: true, width: 140 },
          { field: "sysBizClassify", title: "分类", width: 70 },
          { field: "sysBizCode", title: "系统", width: 80 },
        ],
        pagerConfig: {
            //enabled: false
          pageSize: 10,
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
            query: (res) => {
             
              return  request({
                url: `/portal/portalContentReadTasks/list`,
                method: 'post',
                data: {
                  sysBizCode: sysBizCode.value,
                  page: {
                    size: res.page.pageSize,
                    current:res.page.currentPage
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
      const timer = ref(0);
      watch(tabSelect,(nd,od)=>{
        clearInterval(timer.value)
        timer.value = setInterval(() => {
          if(window.sessionStorage.getItem('isTasksDetail')==1){
            refMap[tabSelect.value].commitProxy('query')
            window.sessionStorage.setItem('isTasksDetail', 0);
          }
        }, 1000);
      })
      onMounted(() => {
        timer.value = setInterval(() => {
          if(window.sessionStorage.getItem('isTasksDetail')==1){
            refMap[tabSelect.value].commitProxy('query')
            window.sessionStorage.setItem('isTasksDetail', 0);
          }
        }, 1000); 
      })
      onBeforeRouteUpdate(to=>{
        clearInterval(timer.value)
      })
      return {
        timer,
        refMap,
        sysBizCode,
        tabSelect,
        gridOptionsDaiban,
        gridOptionsYiban,
        gridOptionsFaqi,
        gridOptionsDaiyue,
        gridOptionsYiyue,
        onChangeSysBizCode (p) {
          clearInterval(timer.value)
          timer.value = setInterval(() => {
          if(window.sessionStorage.getItem('isTasksDetail')==1){
            refMap[tabSelect.value].commitProxy('query')
            window.sessionStorage.setItem('isTasksDetail', 0);
          }
        }, 1000);
          // console.log(refMap, p, refMap[tabSelect.value])
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
  margin-left: 416px;
  width: 1130px;
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