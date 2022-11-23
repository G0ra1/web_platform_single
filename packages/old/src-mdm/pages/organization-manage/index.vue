<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>组织管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun
          v-if="!formVisible"
          :table="{
            toggleSearchForm,
          }"
        ></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <n-card
        class="portal-panel p-task"
        :bordered="false"
        size="small"
        style="height: 100%"
      >
        <template #header>
          <div class="p-task-header">
            <n-tabs
              class="p-task-tabs"
              size="small"
              type="card"
              tab-style="min-width: 40px;"
              :pane-style="{
                display: 'none',
              }"
              v-model:value="statuSize"
              @update:value="onChangeStatuSize"
            >
              <n-tab-pane tab="运营机构" name="1" />
              <n-tab-pane tab="已拆分机构" name="2" />
              <n-tab-pane tab="已撤销机构" name="3" />
            </n-tabs>
          </div>
        </template>
        <n-config-provider abstract :theme-overrides="theme">
          <n-layout class="nw-table" ref="tbody">
            <n-layout-header class="nw-table-header">
              <div class="nw-table-header-left">
                <slot name="header-left" :selected="selected">
                  <!-- <NButton
                    type="info"
                    size="small"
                    v-if="statuSize=='1'"
                    @click="synchrodata"
                    style="margin-right: 5px"
                    >同步当天机构和岗位</NButton
                  > -->
                </slot>

                {{ selected.length ? `已选择${selected.length}项` : "" }}
                <nw-icon
                  v-if="selected.length"
                  name="icon-cuowu"
                  color="red"
                  style="cursor: pointer"
                  title="取消全选"
                  @click="clearSelected"
                />
              </div>
              <div class="nw-table-header-right">
                <slot name="header-right">
                  <NButton
                    type="info"
                    size="small"
                    v-if="statuSize == '1'"
                    @click="addOrg.sonFn()"
                    style="margin-right: 5px"
                    >新设单位</NButton
                  >
                </slot>
              </div>
            </n-layout-header>

            <n-layout has-sider class="nw-table-content">
              <n-layout-content class="tableH">
                <vxe-grid
                  v-bind="gridOptions"
                  ref="gridComponent"
                  class="mytable-scrollbar"
                  v-on="gridEvent"
                >
                </vxe-grid>
              </n-layout-content>
            </n-layout>
          </n-layout>
          <n-drawer
            :show="searchFormVisible"
            width="100%"
            :height="200"
            placement="right"
            :to="$refs.tbody && $refs.tbody.$el"
          >
            <n-drawer-content
              title="高级搜索"
              :header-style="{
                padding: '10px',
                'font-size': '16px',
                'font-weight': 'bold',
              }"
              :footer-style="{
                padding: '10px',
              }"
            >
              <n-form :model="searchFormCache.value">
                <n-form-item path="orgName" label="机构名称">
                  <n-input
                    v-model:value="searchFormCache.value.orgName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-form>
              <template #footer>
                <n-button
                  type="info"
                  size="small"
                  style="margin-right: 5px"
                  @click="handleSearch"
                  >查询</n-button
                >
                <n-button
                  type="warning"
                  size="small"
                  style="margin-right: 5px"
                  @click="resetSearch"
                  >重置</n-button
                >
                <n-button size="small" @click="handleCancel">取消</n-button>
              </template>
            </n-drawer-content>
          </n-drawer>
        </n-config-provider>
      </n-card>
    </n-layout-content>
  </n-layout>
  <AddOrgan
    ref="addOrg"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></AddOrgan>
  <AddDept
    ref="addDept"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></AddDept>
  <EditAction
    ref="editAction"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></EditAction>
  <SplitOrgan
    ref="splitOrgan"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></SplitOrgan>
  <RepealOrgan
    ref="repealOrgan"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></RepealOrgan>
  <TransferOrg
    ref="transferOrg"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></TransferOrg>
  <SortAction
    ref="sortAction"
    :defaultKeys="defaultExpandedKeys"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></SortAction>
  <VersionAction
    ref="versionAction"
    @update:callback="
      () => {
        commitQuery();
      }
    "
  ></VersionAction>
</template>
<script lang='jsx'>
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NSpin,
  NModal,
  NButton,
  NSwitch,
  NSpace,
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NForm,
  NInput,
  NFormItem,
  NDropdown,
  NTabs,
  NTabPane,
  NCard,
  NPopconfirm,
  useMessage

} from 'naive-ui'
import { h, ref, reactive, defineComponent } from 'vue'
import theme from '/@/components/nw-table/theme.js'
import { cloneDeep } from 'lodash'
import NwIcon from '/@/components/nw-icon/index.vue'
import { request } from '@platform/main'

import {
  NwTableFun
} from "/@/components/nw-table/index.vue"; 
import {  organList,rightList, creatOrg, syncGuFenOrgAndPostIncrement, backoutOrg } from './api'
import EditAction from './editAction.vue'
import AddOrgan from './addOrgan.vue'
import AddDept from './addDept.vue'
import SplitOrgan from './splitOrgan.vue'
import RepealOrgan from './repealOrgan.vue'
import TransferOrg from './transferOrg.vue'
import SortAction from './sortAction.vue'
import VersionAction from './versionAction.vue'

export default defineComponent({
  components: {
    NFormItem,
    NInput,
    NForm,
    NLayout,
    NwTableFun,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NSpin,
    NModal,
    NButton,
    NSwitch,
    NSpace,
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NwIcon,
    AddOrgan,
    AddDept,
    EditAction,
    SplitOrgan,
    RepealOrgan,
    TransferOrg,
    NDropdown,
    NTabs,
    NTabPane,
    NCard,
    SortAction,
    NPopconfirm,
    VersionAction
  },
  setup (props, ...p) {
    const searchFormCache = reactive({
      value: {},
      items: []
    })
    const statuSize = ref('1')
    const message = useMessage();

    const searchFormActive = ref(false) // 是否已经触发了高级查询
    const searchFormVisible = ref(false) // 查询表单展示
    // const searchFormType = ref('none')
    const gridComponent = ref(null) // 表格el
    const selected = ref([]) // 单选多选
    const dropdownOptions = [
        {
          label: '排序',
          key: "sortOrg"
        },
        {
          label: '机构拆分',
          key: "showSplitOrgan"
        },
        {
          label: '机构撤销',
          key: "showRepealOrgan"
        },
        {
          label: '机构划转',
          key: "showTransferOrg"
        },
    ]
    const addOrg = ref();     //addOrg 要和AddOrgan组件上的class名相同
    const addDept = ref();
    const editAction = ref(); 
    const splitOrgan = ref();
    const repealOrgan = ref();
    const transferOrg = ref()
    const sortAction = ref()
    const defaultExpandedKeys = ref([])
    const lvTypes = reactive([
        { label: '建设公司', value: 1 },
        { label: '分公司', value: 2 },
        { label: '项目部', value: 3 },
        { label: '部门', value: 4 },
     
    ])
    const oaLvTypes = reactive([
      { label: 'OA机构', value: 1 },
      { label: 'OA部门', value: 2 },
    ])
    const showVersionAction = (data) => {
      versionAction.value.sonFn(data)
    }
    const versionAction = ref()
    const handleSelect =(key,row)=>{
        switch (key) {
          case "showDept":
            addDept.value.sonFn(row)
            break;
          case "showSplitOrgan":
            splitOrgan.value.sonFn(row)
            break;
          case "showRepealOrgan":
            repealOrgan.value.sonFn(row)
            break;
          case "showTransferOrg":
            transferOrg.value.sonFn(row)
            break;
          case "sortOrg":
            sortAction.value.sonFn(row)
            break;
          default:
            break;
        }
      }
    const synchrodata = ()=>{
        syncGuFenOrgAndPostIncrement().then(res=>{
          message.success("同步成功");
        })
      }
       const backoutOrgN = (id)=>{
          backoutOrg(id).then(res=>{
             message.success("恢复成功");
            gridComponent.value.commitProxy('query')
          })
      }
     const columns = reactive([
         { field: '', title: '机构名称',showHeaderOverflow: true, width: 300, treeNode:true,
             slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       editAction.value.sonFn(row)
                      }
                    }>{row.orgName}</a>
                  </span>,
                ];
              },
            }
           },
          { field: 'parentOrgFullName', title: '所属机构', showHeaderOverflow: true, width: 250,showOverflow: true, },
          // { field: 'parentDeptFullName', title: '所属部门', showHeaderOverflow: true, width: 200 },
          { field: 'orgType', title: '机构类型', showOverflow: true, width: 100,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.orgType == 1 ? "组织" : "部门"}</span>,
                ];
              },
          } },
          //  { field: 'lvType', title: 'GEPS级别类型', showOverflow: true, width: 100,
          //   slots: {
          //     default: ({ row }) => {
          //       return [
          //         <span>{row.lvType? lvTypes.filter(d=>d.value==row.lvType)[0].label : '' }</span>,
          //       ];
          //     },
          // } },
          //  { field: 'oaLvType', title: 'OA级别类型', showOverflow: true, width: 100,
          //   slots: {
          //     default: ({ row }) => {
          //       return [
          //         <span>{row.oaLvType? oaLvTypes.filter(d=>d.value==row.oaLvType)[0].label : '' }</span>,
          //       ];
          //     },
          // } },
          { field: 'gfOrgcode', title: '外设机构', showOverflow: true, width: 100,
             slots: {
              default: ({ row }) => {
                return [
                  <span>{row.gfOrgcode? '否' : '是' }</span>,
                ];
              },
          }},


          { field: 'satrapName', title: '负责人', showOverflow: true, width: 100 },
          { field: 'orgAddr', title: '机构地址', showOverflow: true, width: 250 },
          { field: 'registerRegisterTime', title: '成立时间', showOverflow: true, width: 250 },
          {
            field: '',
            title: '操作',
            showHeaderOverflow: true,
            width: 200,
            slots: {
              default: ({row}) => {
                if(row.parentId=="0"){
                  return [
                   <div>
                    <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={(e)=>{addDept.value.sonFn(row)}}>{"新设下级部门"}</a>
                    <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px" onClick={(e)=>{showVersionAction(row)}}>{"历史"}</a>

                   </div>
                  ]
                } else {
                   return [
                   <div>
                      <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={(e)=>{addDept.value.sonFn(row)}}>{"新设下级部门"}</a>
                      <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px" onClick={(e)=>{showVersionAction(row)}}>{"历史"}</a>
                      <NDropdown   onSelect={(key)=>handleSelect(key,row)} trigger={"hover"} showArrow={true} options={ dropdownOptions}>
                        <NButton  type="text" style="color:#2d8cf0;cursor: pointer;">...</NButton>
                      </NDropdown>
                   </div>
                ];
                }
               
              },
            }
          },

        ])
     const columns1 = reactive([
          { field: '', title: '机构名称',showHeaderOverflow: true, 
             slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       showEditAction(row)
                      }
                    }>{row.orgName}</a>
                  </span>,
                ];
              },
            }
           },
          { field: 'parentOrgFullName', title: '所属机构', showHeaderOverflow: true,  },
          { field: 'parentDeptFullName', title: '所属部门', showHeaderOverflow: true,  },
          { field: 'orgType', title: '机构类型', showOverflow: true, 
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.orgType == 1 ? "组织" : "部门"}</span>,
                ];
              },
          } },
           { field: 'lvType', title: 'GEPS级别类型', showOverflow: true, width: 100,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.lvType? lvTypes.filter(d=>d.value==row.lvType)[0].label : '' }</span>,
                ];
              },
          } },
           { field: 'oaLvType', title: 'OA级别类型', showOverflow: true, width: 100,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.oaLvType? oaLvTypes.filter(d=>d.value==row.oaLvType)[0].label : '' }</span>,
                ];
              },
          } },
          { field: 'gfOrgcode', title: '外设机构', showOverflow: true, width: 100,
             slots: {
              default: ({ row }) => {
                return [
                  <span>{row.gfOrgcode? '否' : '是' }</span>,
                ];
              },
          }},
          { field: 'updateTime', title: '撤销时间', showOverflow: true,  },
          {
            field: '',
            title: '操作',
            showHeaderOverflow: true,
            width: 200,
            slots: {
              default: ({row}) => {
                return [
                    <NPopconfirm
                          onPositive-click={(e)=>{backoutOrgN(row.id)}}
                          positive-text="确定"
                          negative-text="取消"
                        
                        >
                          {{
                            trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"恢复机构"}</a>,
                            default:()=> '是否恢复当前机构?'
                          }}
                        
                    </NPopconfirm>
               
                ]
              },
            }
          },
        ])
      const columns2 = reactive([
          { field: '', title: '机构名称',showHeaderOverflow: true,  
             slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       showEditAction(row)
                      }
                    }>{row.orgName}</a>
                  </span>,
                ];
              },
            }
           },
          { field: 'parentOrgFullName', title: '所属机构', showHeaderOverflow: true,},
          { field: 'parentDeptFullName', title: '所属部门', showHeaderOverflow: true, },
          { field: 'orgType', title: '机构类型', showOverflow: true,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.orgType == 1 ? "组织" : "部门"}</span>,
                ];
              },
          } },
           { field: 'lvType', title: 'GEPS级别类型', showOverflow: true, width: 100,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.lvType? lvTypes.filter(d=>d.value==row.lvType)[0].label : '' }</span>,
                ];
              },
          } },
           { field: 'oaLvType', title: 'OA级别类型', showOverflow: true, width: 100,
            slots: {
              default: ({ row }) => {
                return [
                  <span>{row.oaLvType? oaLvTypes.filter(d=>d.value==row.oaLvType)[0].label : '' }</span>,
                ];
              },
          } },
          { field: 'gfOrgcode', title: '外设机构', showOverflow: true, width: 100,
             slots: {
              default: ({ row }) => {
                return [
                  <span>{row.gfOrgcode? '否' : '是' }</span>,
                ];
              },
          }},
          { field: 'updateTime', title: '拆分时间', showOverflow: true, },
        ])
    // 表格配置
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      stripe: true,
      border: false,
      resizable: true,
      height: 'auto',
      align: null,
      columns: columns,
      pagerConfig: {
        enabled:false,
      },
      backoutOrgN,
      treeConfig:{
        children: 'kids',
        hasChild: 'hasKids',
      },
      proxyConfig: {
        form: true,
        seq: false, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
         list: 'list'
        },
        ajax: {
          query: (...p) => {
              return  request({
                url: `/main/mdmOrg/list`,
                method: 'post',
                data: {
                  ...searchFormCache.value,
                  ...{isDefault:0,status:statuSize.value},
                  page: {
                    size: 10
                  }
                }
              }).then(res => {
                defaultExpandedKeys.value=[res[0].id]
                return {
                  list:statuSize.value=='1'? ((res[0] && res[0].id=='0') ? res[0].kids :res) : res
                }
              })
          }
        }
      },
     
    })
    // 事件注册
    const gridEvent = reactive({
      pageChange: (...p) => {
        console.log('pageChange...', p)
      },
      radioChange: ({
        row
      }) => {
        console.log('radioChange...', p)
        // 这里改为
        selected.value = [ row ]
      },
     
    })
   
    return {
      versionAction,
      showVersionAction,
      defaultExpandedKeys,
      sortAction,
      addOrg,
      editAction,
      message,
      addDept,
      splitOrgan,
      repealOrgan,
      transferOrg,
      statuSize,
      synchrodata,
      // 变量
      selected,
      searchFormCache,
      gridComponent,
      theme, // 风格
      searchFormActive, // 是否开启高级查询
      searchFormVisible,
      gridOptions,
      gridEvent,
      handlePageChange: () => {},
      onChangeStatuSize (p) {
          statuSize.value = p
          if(statuSize.value=='1'){
            gridOptions.treeConfig = {
              children: 'kids',
              hasChild: 'hasKids',
            }
            gridOptions.columns = columns
          } else if(statuSize.value=='3'){
            gridOptions.columns = columns1
            gridOptions.treeConfig = null
          } else {
            gridOptions.columns = columns2
            gridOptions.treeConfig = null
          }
          gridComponent.value.commitProxy('query')
      },
      refreshColumn () {
        gridComponent.value.reloadColumn(gridOptions.columns)
      },
      pageChange: (...p) => {
        console.log('pageChange...', p)
      },
      commitProxy: (...p) => {
        gridComponent.value.commitProxy(...p)
      },
      // 发起查询请求
      commitQuery: () => {
        gridComponent.value.commitProxy('query')
      },
      // 
      toggleSearchForm () { // 切换高级查询
        searchFormVisible.value = !searchFormVisible.value // 切换
        if (searchFormVisible.value) {
          searchFormActive.value = true
        } else if (!searchFormCache.items.length) {
          searchFormActive.value = false
        } else {
          searchFormActive.value = true
        }
      },
      setVisibleSearchForm (v) {
        searchFormVisible.value = v
      },
      handleSearch () {
        // 这里建立查询条件items
        searchFormCache.items = []
     
        gridComponent.value.commitProxy('query')
        searchFormVisible.value = false
      },
      // 重置查询，取消高级查询状态
      resetSearch () {
        searchFormCache.value = {}
        searchFormCache.items = []
        gridComponent.value.commitProxy('query')
        searchFormVisible.value = false
        searchFormActive.value = false
      },
      // 点取消
      handleCancel () {
        searchFormVisible.value = false
        // 判断是否含有条件
        if (!searchFormCache.items.length) {
          searchFormActive.value = false
        }
      },
      // 设置select
      clearSelected () {
        selected.value = []
        gridComponent.value.setAllCheckboxRow(false)
      }
    }
  }
})
</script>

<style lang='less'>
.p-task {
  &.n-card > .n-card__content {
    padding: 0;
  }
  > .n-card-header {
    height: 38px;
    padding: 5px;
    border-bottom: none !important;
  }
  &-header {
    display: flex;
    position: relative;
  }
  &-tabs {
    display: inline-block;
    width: auto;
    // margin-left: 10px;
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

// 表格样式
.nw-table {
  height: calc(~"100% - 0px");

  &-header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 5px;
    border: 1px solid #e6e9f0;
    border-bottom: 2px solid #188ae2;
    // &-left {
    //   // float: left;
    // }
    // &-right {
    //   // float: right;
    // }
  }
  &-content {
    height: calc(~"100% - 40px");
  }
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>