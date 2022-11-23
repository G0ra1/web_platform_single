<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>试卷列表</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="tableRef"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
        <template v-slot:header-left="{ selected =[] }">
          <!-- <nw-wf  :getParams="WfGetParams"
             :disabled="{
                'paperAdj':  selected.length !==1 || selected[0] &&  selected[0].status !== 1
             }"
          ></nw-wf> -->
           <NwFunctionPredefine
            code="PAPER_ADD"
            descr="左上预留位置按钮1"  
          />
           <NwFunctionPredefine
            code="PAPER_Edit"
            descr="左上预留位置按钮2"  
          />
          <n-popconfirm
            @positive-click="handDel(selected[0])"
            positive-text="确定"
            negative-text="取消"
          >
            <template #trigger>
              <n-button style="border-radius:4px" 
                :disabled="selected.length  !== 1 ||  selected.some(d=>d.auditStatus !== 0)" size="small"
                 type="error">删除</n-button
              >
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm>
            <n-dropdown
              trigger="hover"
              :options="options"
              placement="bottom-end"
                @select="handleSelect"
            >
              <n-button style="border-radius:4px;margin-left:5px" > 是否启用 </n-button>
            </n-dropdown>
        </template>
        
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form :model="searchFormData">
            <n-grid :cols="3" x-gap="12">
              <n-grid-item>
                  <n-form-item label="试卷名称" path="paperName ">
                    <n-input v-model:value="searchFormData.paperName " @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="试卷标签" path="typeCode">
                    <nw-dic
                      :request="{XHR:dictItemLists, params: 'STUDY_PAPER_TYPE',}"
                      v-model:value="searchFormData.typeCode"
                      placeholder
                      multiple
                      size="small"
                      :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                    />
                  </n-form-item>
              </n-grid-item>
              <!-- <n-grid-item>
                  <n-form-item path="isEnable " label="启用状态">
                      <n-select
                           
                          v-model:value="searchFormData.isEnable "
                          placeholder="请选择启用状态"
                          :options="[
                            {label:'启用',value:1},
                            {label:'禁用',value:0},
                          ]"
                          size="small" 
                    />
                  </n-form-item>
              </n-grid-item> -->
              <n-grid-item>
                <n-form-item path="status" label="试卷状态">
                    <n-select
                         
                        v-model:value="searchFormData.status"
                        placeholder="请选择试卷状态"
                        :options="[
                            {label:'调整中',value:2},
                            {label:'已生效',value:1},
                            {label:'未生效',value:0},

                          ]"
                        size="small" 
                  />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item path="auditStatus" label="审核状态">
                    <n-select
                         
                        v-model:value="searchFormData.auditStatus"
                        placeholder="请选择试审核状态"
                        :options="[
                            {label:'审批完成',value:2},
                            {label:'审批中',value:1},
                            {label:'草稿',value:0},

                          ]"
                        size="small" 
                  />
                </n-form-item>
            </n-grid-item>
           </n-grid>
          </n-form>
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-drawer
    v-model:show="visible"
    :to="pageRef && pageRef.$el"
    width="100%"
    :height="200"
    placement="right"
  >
    <n-drawer-content
      title="试卷详情"
      closable
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <nw-form-view
        ref="formRef"
        src="/html/forms/study-paper-form.html"
      />
      
    </n-drawer-content>
  </n-drawer>
  <HistoryCourse ref="historyCourse"></HistoryCourse>
  <AdjustmentEntry ref="adjustmentEntry"></AdjustmentEntry>
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, onMounted } from "vue";
import nt from "../../components/nw-table/index.js";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
  NSelect,
  NFormItemGi,
  NCard,
  NSwitch,
  NGrid,
  NDropdown,
  NGridItem,
} from "naive-ui";
import HistoryCourse from "./historyCourse.vue"
import AdjustmentEntry from './adjustmentEntry.vue'
import { NwIcon, NwFunctionPredefine, NwDic } from '@platform/main'
import { detail,dictItemLists } from './api'
import NwFormView from "../../components/nw-form-view/index.vue";

import {
  action,
  vbind,
  visible,
  dataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
  isOrEnable,
  isEnableChange,
  handDel
} from "./store.js";
export default defineComponent({
  components: {
    NwTable: nt.NwTable,
    NwTableFun: nt.NwTableFun,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NSelect,
    NFormItemGi,
    NwIcon,
    NCard,
    HistoryCourse,
    AdjustmentEntry,
    NSwitch,
    NGrid,
    NGridItem,
    NwDic,
    NDropdown,
    NwFormView,
    NwFunctionPredefine
  },
  setup() {
    window.addEventListener('wfComplete', () => {
      tableRef.value.commitQuery();
    })
    const historyCourse = ref()
    const adjustmentEntry = ref()
    const options =ref( [
       {
        label: '全部',
        key: '',
        props: {
          onClick: () => {
          }
        }
      },
      {
        label: '启用',
        key: 1,
        props: {
          onClick: () => {
          }
        }
      },
      {
        label: '停用',
        key: 0,
        props: {
          onClick: () => {
          }
        }
      }
    ])
    const auditStatusMap = {
      0: "草稿",
      1: '运行中',
      2: '完成',
      3: '挂起',
      4: '终止',
      5: '知会',
    }
    const columns = reactive([
      { type: 'checkbox', width: 35 },
      { field: "paperName", title: "试卷名称",
        slots: {
          default: ({ row }) => {
            return [
              <span style="color:#2080f0;cursor:pointer" onClick={()=>handleShow(row)}>
                {row.paperName}
              </span>,
            ];
          },
        }
      },
      { field: "typeName", title: "试卷标签" },
      { field: "paperType", title: "试卷类型",
            slots: {
                default: ({row}) => {
                  return [
                    <span>
                      {(row.paperType )? [
                          {label:'练习题',value:'0'},
                          {label:'考试题',value:'1'},
                          {label:'',value:''},
                         
                        ].filter(d=>(row.paperType.split(',')).indexOf(d.value) > -1).map(item=>item.label).join(',') : ''
                      }
                    </span>,
                  ];
                },
              }
      },
      { field: "paperCode", title: "出题类型", showHeaderOverflow: true,
         slots: {
                default: ({row}) => {
                  return [
                    <span>
                      { (row.paperCode ||(row.paperCode ==0 )) ? [
                          {label:'固定试卷',value:0},
                          {label:'随机试卷',value:1},
                          {label:'',value:''},
                         
                        ].filter(d=>d.value == row.paperCode)[0].label : ''
                      }
                    </span>,
                  ];
                },
              }
       },
      { field: "paperTotalScore", title: "试卷总分" }, 
      { field: "specialExamQualifiedScore", title: "合格分数" },
      { field: "createTime", title: "创建时间" },
      { field: "createUserName", title: "创建人" },
      { field: "isEnable", title: "启用状态",
        slots: {
          default: ({ row }) => {
            return [
               <NSwitch
                  size="small"
                  value={row.isEnable ? true : false}
                  onUpdate:value={()=>{isOrEnable(row)}}
              />
            
            ];
          },
        }
      },
      { field: "status", title: "试卷状态",
         slots: {
          default: ({ row }) => {
            return [
              <span>
                { (row.status ||  row.status ==0) ?([
                  {value:0,name:'未生效'},
                  {value:1,name:'已生效'},
                  {value:2,name:'调整中'},
                ].filter(d=>d.value == row.status)[0].name) : ''}
              </span>,
            ];
          },
        }
      },
      { field: "auditStatus", title: "审核状态",
         slots: {
          default: ({ row }) => {
            return [
              <span>
                {[
                  {value:0,name:'草稿'},
                  {value:1,name:'审批中'},
                  {value:2,name:'审批完成'},
                ].filter(d=>d.value == row.auditStatus)[0].name}
              </span>,
            ];
          },
        }
      },
          
      {
        field: '',
        width: 200,
        title: '操作',
        showHeaderOverflow: true,
          slots: {
          default: ({row}) => {
            return [
              <div>
                <span style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                      historyCourse.value.sonFn(row)
                    }}>查看历史</span>
                <span style="color:#2d8cf0;cursor: pointer;margin-left:3px" onClick={(e)=>{
                      adjustmentEntry.value.sonFn(row)
                    }}>调整记录</span>
              </div>
              
            ];
          },
        }
      },
   
    ]);
    const searchFormData = ref({projectCode:"",projectName:""})
    const resetSearch = () => {
      // searchFormData.value = { proStartTime: +new Date(getCurrentMonthFirst()), proEndTime: +new Date(getCurrentMonthLast()) }
      searchFormData.value.projectName = ""
      searchFormData.value.taskName = ""

      tableRef.value.resetSearch()
    }
    const queryTable = () => {
      tableRef.value.searchFormCache.value = {
        ...searchFormData.value,
      }

      tableRef.value.commitQuery();
    }
    const handleSelect = (v) =>{
     isEnableChange(v)
    }
    onMounted(() => {
    })
    return {
      action,
      vbind,
      handleShow,
      dictItemLists,
      visible,
      options,
      handDel,
      handleSelect,
      historyCourse,
      adjustmentEntry,
      formRef,
      pageRef,
      tableRef,
      dataModel,
      columns,
      resetSearch,
      isOrEnable,
      isEnableChange,
      queryTable,
      searchFormData,
      WfGetParams: async (key, ) => {
        if(tableRef.value && key === 'paperAdj'){
           const obj = await detail(tableRef.value.selected[0].id).then((r)=>{
              return r
            })
            return obj
        } else {
          return {}
        }
      
      }
    };
  },
});
</script>
