<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>专题管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="tableRef"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
        <template v-slot:header-left="{ selected }">
          <nw-wf></nw-wf>
        </template>
        
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
         
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-drawer
    v-model:show="visible"
    :to="pageRef && pageRef.$el"
    width="50%"
    :height="200"
    placement="right"
  >
    <n-drawer-content
      :title="action === 'create' ? '新建' : '编辑'"
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
        src="/html/forms/study-special-form.html"
      />
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleSave"
          >保存</n-button
        >
        <n-button size="small" @click="handleCancel">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
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
  NFormItemGi
} from "naive-ui";
import NwFormView from "../../components/nw-form-view/index.vue";
import { NwIcon } from '@platform/main'
import {
  action,
  vbind,
  visible,
  dataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
  handleSave,
  handleCancel,
  handleDel,
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
    NwFormView,
    NSelect,
    NFormItemGi,
    NwIcon,
  },
  setup() {
    window.addEventListener('wfComplete', () => {
      tableRef.value.commitQuery();
    })
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
      { field: "specialName", title: "专题名称" },
      { field: "typeName", title: "分类名称" },
      { field: "specialStartTime", title: "开始时间" },
      { field: "specialEndTime", title: "结束时间" },
      {
        field: "applyType", title: "审核状态", showOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <span>
                {auditStatusMap[row.auditStatus]}
              </span>,
            ];
          },
        }
      },
      {
        field: "auditStatus", title: "变更类型", showOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <span>
                {row.applyType==0?'新增' : '修改'}
              </span>,
            ];
          },
        }
      },
      { field: "createTime", title: "申请时间" },
      { field: "createUserName", title: "申请人" },

      {
        field: '',
        width: 200,
        title: '操作',
        showHeaderOverflow: true,
          slots: {
          default: ({row}) => {
            return [
              <div>
                <NPopconfirm
                  onPositive-click={(e)=>{handDel([row])}}
                  positive-text="确定"
                  negative-text="取消"
                  
                >
                  {{
                    trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                    default:()=> '是否删除当前选项?'
                  }}
                  
                </NPopconfirm>

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
    onMounted(() => {
    })
    return {
      action,
      vbind,
      visible,
      formRef,
      pageRef,
      tableRef,
      dataModel,
      columns,
      handleShow,
      handleSave,
      handleCancel,
      resetSearch,
      queryTable,
      searchFormData
    };
  },
});
</script>
