<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>课程列表</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="tableRef"   @update:callback="(v) => {
         handleSelect(v)

         }" :isShow='true'></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
        <template v-slot:header-left="{ selected }">
          <!-- <nw-wf  :getParams="WfGetParams"
             :disabled="{
                'lessonAdj': selected.length !==1 || selected[0] &&  selected[0].status !== 1
             }"
          ></nw-wf> -->
           <NwFunctionPredefine
            code="COURSE_ADD"
            descr="左上预留位置按钮1"  
          />
          <span style='width:5px;display:inline-block'></span>
           <NwFunctionPredefine
            code="COURSE_EDIT"
            descr="左上预留位置按钮1"  
          />
           <!-- <NwFunctionPredefine
            code="COURSE_Edit"
            descr="左上预留位置按钮2"  
          /> -->
          <n-popconfirm
            @positive-click="handDel(selected[0])"
            positive-text="确定"
            negative-text="取消"
          >
            <template #trigger>
              <n-button style="border-radius:4px;margin-left:5px" 
                :disabled="selected.length  !== 1 ||  selected.some(d=>d.auditStatus !== 0)" size="small"
                 type="error">删除</n-button
              >
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm>
          
        </template>
         <template #header-right>
         
        
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form :model="searchFormData">
            <n-grid :cols="3" x-gap="12">
              <n-grid-item>
                  <n-form-item label="课程名称" path="lesssonName">
                    <n-input v-model:value="searchFormData.lesssonName" @keydown.enter.prevent />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="所属分类" path="typeName">
                        <n-tree-select
                          :options="types"
                          size="small"
                          placeholder="请选择"
                          v-model:value="searchFormData.typeCode"
                          filterable
                          clearable
                        />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item label="课程标签" path="labelCode">
                     <nw-dic
                      :request="{XHR:dictItemLists, params: 'STUDY_COURSE_TYPE',}"
                      v-model:value="searchFormData.labelCode"
                      placeholder
                      size="small"
                      :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                    />
                  </n-form-item>
              </n-grid-item>
              <n-grid-item>
                  <n-form-item path="isIndex" label="热门">
                      <n-select
                           
                          v-model:value="searchFormData.isIndex"
                          placeholder="请选择"
                          :options="[
                            {label:'是',value:1},
                            {label:'否',value:0},
                          ]"
                          size="small" 
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
                <n-form-item path="status" label="课程状态">
                    <n-select
                         
                        v-model:value="searchFormData.status"
                        placeholder="请选择"
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
       title="课程详情"
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
        src="/web-study/forms/study-course-form.html"
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
   NImage,
   NSwitch,
    NGrid,
  NGridItem,
  NDropdown,
  NTreeSelect,
} from "naive-ui";
import HistoryCourse from "./historyCourse.vue"
import AdjustmentEntry from './adjustmentEntry.vue'
import { NwIcon, NwFunctionPredefine, NwDic } from '@platform/main'
import NwFormView from "../../components/nw-form-view/index.vue";
import { detail, dictItemLists,courseClassification } from './api'
import {
  action,
  vbind,
  visible,
  dataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
  isShowIndex,
  isEnableChange,
  isOrEnable,
  handDel,
  
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
     NImage,
     NSwitch,
      NGrid,
      NwDic,
    NGridItem,
    NTreeSelect,
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
      { field: "lessonName", title: "课程名称",
        slots: {
          default: ({ row }) => {
            return [
              <span style="color:#2080f0;cursor:pointer" onClick={()=>handleShow(row)}>
                {row.lessonName}
              </span>,
            ];
          },
        }
      },
      { field: "typeName", title: "分类" },
      { field: "labelName", title: "标签" },
      
      { field: "imgUrl", title: "封面",
         slots: {
          default: ({ row }) => {
            return [
              <NImage src={row.imgUrl} height="30" width="50" style="padding:3px"  />,
            ];
          },
        }
      },
      { field: "createTime", title: "创建时间" },
      { field: "createUserName", title: "创建人" },
      { field: "isIndex", title: "热门",
        slots: {
          default: ({ row }) => {
            return [
               <NSwitch
                  size="small"
                  value={row.isIndex ? true : false}
                  onUpdate:value={()=>{isShowIndex(row)}}
              />
            
            ];
          },
        }
      },
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
      { field: "status", title: "课程状态",
         slots: {
          default: ({ row }) => {
            return [
              <span>
                {[
                  {value:0,name:'未生效'},
                  {value:1,name:'已生效'},
                  {value:2,name:'调整中'},
                ].filter(d=>d.value == row.status)[0].name}
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
      { field: "hits", title: "浏览次数" },
     
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
    const searchFormData = ref({})
    const types = ref([])
    const handleSelect = (v) =>{
     isEnableChange(v)
    }
    onMounted(() => {
      courseClassification('lesson').then((r)=>{
         const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.dictName
                        row.key = row.dictCode 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.dictName
                        row.key = row.dictCode
                    }
                })
          }
          getStr(r)
          types.value = r
       })
    })
    return {
      action,
      vbind,
      options,
      visible,
      types,
      formRef,
      pageRef,
      tableRef,
      handleShow,
      handleSelect,
      handDel,
      historyCourse,
      adjustmentEntry,
      isShowIndex,
      isEnableChange,
      isOrEnable,
      dataModel,
      columns,
      searchFormData,
      WfGetParams: async (key, ) => {
        if(tableRef.value && key === 'lessonAdj'){
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

<style lang="less" scoped>
/deep/ .n-drawer{
  z-index: 99999;
}
</style>
