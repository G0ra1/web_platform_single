<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>数据权限</h1>
    </n-layout-header>
    <n-layout-content>
      <NwTable1
        ref="tableRef"
        defaultKey="businessTypeName"
        :columns="columns"
        v-bind="vbind"
      >
        <template v-slot:header-left="{ selected }"> </template>
        <template #header-right>
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="handleShow()"
            >添加</n-button
          >
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form
            :model="searchFormData"
            label-placement="left"
            :label-width="80"
            size="small"
          >
            <n-grid :cols="17" :x-gap="24">
              <n-form-item-gi :span="4" label="业务类型" path="businessType">
                <NwDic
                  dictCode="manhourViewerType"
                  v-model:value="searchFormData.businessType"
                  v-model:label="searchFormData.businessTypeName"
                ></NwDic>
              </n-form-item-gi>
              <n-form-item-gi :span="4" label="查看者" path="userNameChs">
                <n-input-group>
                  <n-input v-model:value="searchFormData.userNameChs" />
                </n-input-group>
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </template>
      </NwTable1>
    </n-layout-content>
  </n-layout>
  <n-drawer
    v-model:show="visible"
    :to="pageRef && pageRef.$el"
    width="100%"
    :height="200"
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
      <NwFormViewerAsync
        ref="formRef"
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
  <VersionAction
    ref="versionAction"
    @update:callback="
      () => {
        getTableV(data);
      }
    "
  ></VersionAction>
  <proDetails ref="detailsRef"></proDetails>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="请确认删除此记录"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, onMounted,watch } from "vue";
// import nt from "/@/components/nw-table/index.js";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index3.vue";

import { NwDic, NwIcon, NwFormViewerAsync } from '@platform/main'

import {format } from "date-fns";
import VersionAction from './versionAction.vue'
import proDetails from './proDetails.vue'
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
  NDropdown,
  NModal,
  NGrid,
  NFormItemGi,
  NDatePicker
} from "naive-ui";
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
    NwTable1: NwTable,
    NwTableFun1: NwTableFun,
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
    VersionAction,
    NwIcon,
    proDetails,
    NDropdown,
    NModal,
    NGrid,
    NFormItemGi,
    NDatePicker,
    NwDic,
    NwFormViewerAsync
  },
  setup() {
    const range = ref([Date.now(), Date.now()])
    watch(()=>range.value,(v)=>{
      if(v[0]&&v[1]){
        tableRef.value.searchFormCache.value.startTime = format(v[0], 'yyyy-MM-dd')+ " " + "00:00:00";
        tableRef.value.searchFormCache.value.endTime = format(v[1], 'yyyy-MM-dd')+ " " + "23:59:59";
      }
    })
    const columns = reactive([
      { type: "seq", width: 35 },
      { field: "businessTypeName", title: "业务类型"},
      { field: "userNameCh", title: "查看人员", showHeaderOverflow: true },
      { field: "createUserName", title: "创建人", showHeaderOverflow: true },
      { field: "daterange.startTime-endTime", title: "创建时间", showHeaderOverflow: true,slots:{
        default:({row})=>{
          return <span>{row.createTime}</span>
        }
      } },
      // { field: "status", title: "启用状态", showOverflow: true,
      //   slots: {
      //       default: ({row}) => {
      //         return [
      //           <span>
      //             {row.status == 1 ? '启用' : '禁用'}
      //           </span>,
      //         ];
      //       },
      //     }
      // },
      {
        field: "",
        title: "操作",
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <div>
                <NwIcon name="icon-liulanliang" style="cursor: pointer;" size={18} onClick={()=>{ showDetails(row)}} />
                <NwIcon name="icon-n-y-editpage" style="cursor: pointer;margin-left:5px;" size={18} onClick={()=>{ handleShow(row)}} />
               <NDropdown onSelect={(key)=>handleSelect(key,row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                  <NwIcon name="icon-n-y-qita" color="#010101" style="cursor: pointer;margin-left:5px;" size={18} />
              </NDropdown>
                
              </div>,
            ];
          },
        },
      },
    ]);
    const delId = ref('')
    const handleSelect =(key,row)=>{
        switch (key) {
          case "history":
            showVersionAction(row)
            break;
          case "del":
            showDelModal.value  = true
            delId.value = row.id
            
            break;
          default:
            break;
        }
      }
      const dropdownOptions = [
        // {
        //   label: '历史',
        //   key: "history"
        // },
        {
          label: '删除',
          key: "del"
        },
      ]
    const versionAction = ref()
    const showVersionAction = (data) => {
      versionAction.value.show(data)
    }
    const getTableV = (data) => {
      tableRef.value.commitQuery();
    }
    const detailsRef = ref(null)
    const showDetails = (row) => {
      detailsRef.value.show(row)
    }
    const showDelModal = ref(false)
    const onPositiveClick = ()=>{
        handleDel(delId.value);
    }
    const onNegativeClick = ()=>{

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
      getTableV,
      versionAction,
      detailsRef,
      handleSelect,
      dropdownOptions,
      showDelModal,
      onPositiveClick,
      onNegativeClick,
      delId,
      range,
      showDetails
    };
  },
});
</script>
