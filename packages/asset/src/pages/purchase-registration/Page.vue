<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>采购登记</h1>
    </n-layout-header>
    <n-layout-content>
      <NwTable1 ref="tableRef" defaultKey="itemName" :columns="columns" v-bind="vbind">
        <template v-slot:header-left="{ selected }"> </template>
        <template #header-right>
          <!-- <NwFunctionPredefine
            code="TOP_LEFT_1"
            descr="左上预留位置按钮1"
          /> -->
          <NwFunctionPredefine
            code="TOP_LEFT_1"
            descr="左上预留位置按钮1"
          />
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form :model="searchFormData" label-placement="left" :label-width="80" size="small">
            <n-grid :cols="17" :x-gap="24">
              <n-form-item-gi :span="4" label="物资名称" path="itemName">
                <n-input placeholder="请输入物资名称" v-model:value="searchFormData.itemName" />
              </n-form-item-gi>

              <n-form-item-gi :span="4" label="物资编码" path="itemCode">
                <n-input placeholder="请输入物资编码" v-model:value="searchFormData.itemCode" />
              </n-form-item-gi>


            </n-grid>
          </n-form>
        </template>
      </NwTable1>
    </n-layout-content>
  </n-layout>
  <!-- <n-drawer v-model:show="visible" :to="pageRef && pageRef.$el" width="960px" :height="200">
    <n-drawer-content :title="action === 'create' ? '新建' : '编辑'" :header-style="{
      padding: '10px',
      'font-size': '16px',
      'font-weight': 'bold',
    }" :footer-style="{
  padding: '10px',
}">
      <nw-form-view ref="formRef" src="/html/forms/asset-acceptance-form.html" />
      <template #footer>
        <n-button type="info" size="small" style="margin-right: 5px" @click="handleSave">保存</n-button>
        <n-button size="small" @click="handleCancel">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer> -->
  <VersionAction ref="versionAction" @update:callback="
    () => {
      getTableV(data);
    }
  "></VersionAction>
  <proDetails ref="detailsRef"></proDetails>
  <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" title="确认" content="请确认删除此记录"
    positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
  <div style="
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    " v-show="loading">
    <n-spin :show="loading">
      <template #description> 正在导入 </template>
      <div style="height: 800px; width: 500px"></div>
    </n-spin>
  </div>
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, onMounted, watch } from "vue";
// import nt from "../../components/nw-table/index.js";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index4.vue";
import { format } from "date-fns";
import VersionAction from './versionAction.vue'
import proDetails from './proDetails.vue'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
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
  NDatePicker,
  NTree,
  NCard,
  NUpload,
  NSpin
} from "naive-ui";
import { cloneDeep } from 'lodash';
import { NwIcon, NwFunctionPredefine } from '@platform/main'
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
  mdmOrgListFn,
  orgTree,
  menuSelected,
  searchOrgName,
  treeSelectId,
  orgModal,
  saveParentId,
  pOptions,
  treeSpinShow,
  selectedOrgType
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
    NLayoutSider,
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
    NTree,
    NCard,
    NUpload,
    NSpin,
    NwFunctionPredefine
  },
  setup() {
    window.addEventListener('wfComplete', () => {
      tableRef.value.commitQuery();
    })
    const range = ref([Date.now(), Date.now()])
    const message = useMessage()
    watch(() => range.value, (v) => {
      if (v[0] && v[1]) {
        tableRef.value.searchFormCache.value.startTime = format(v[0], 'yyyy-MM-dd') + " " + "00:00:00";
        tableRef.value.searchFormCache.value.endTime = format(v[1], 'yyyy-MM-dd') + " " + "23:59:59";
      }
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
      { type: "seq", width: 50, minWidth: 50 },
      {
        field: "code", title: "申请单号", showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span onClick={() => { showDetails(row) }} style="color:#1d7ced;cursor: pointer;">{row.code}</span>
          }
        }
      },
      { field: "applyCode", title: "购置申请单号", showHeaderOverflow: true, showOverflow: true, },
      // { field: "", title: "采购物资", showHeaderOverflow: true, showOverflow: true, },
      { field: "sumTotalNumber", title: "采购数量", showHeaderOverflow: true, showOverflow: true, },
      { field: "sumTotalAmount", title: "合计金额", showHeaderOverflow: true, showOverflow: true, },
      { field: "explanation", title: "说明", showHeaderOverflow: true, showOverflow: true, },
      { field: "contractCode", title: "合同编号", showHeaderOverflow: true, showOverflow: true, },
      { field: "contractFileName", title: "合同名称", showHeaderOverflow: true, showOverflow: true, },
      { field: "supplierName", title: "供应商", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyUserName", title: "申请人", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyTime", title: "申请时间", showHeaderOverflow: true, showOverflow: true, },
      {
        field: "", title: "审核状态", width: 100, minWidth: 100, showOverflow: true,
        slots: {
          default: ({ row }) => {
            let a
            if (row.auditStatus == 0 || row.auditStatus == 1 || row.auditStatus == 5) {
              a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#1D68FF;margin-right: 5px;position: relative;
    top: -1px;"></span>
            }
            if (row.auditStatus == 2) {
              a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#13AB62;margin-right: 5px;position: relative;
    top: -1px;"></span>
            }
            if (row.auditStatus == 3 || row.auditStatus == 4) {
              a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#FF1D1D;margin-right: 5px;position: relative;
    top: -1px;"></span>
            }
            return [
              a,
              <span>
                {auditStatusMap[row.auditStatus]}
              </span>,
            ];
          },
        }
      },

      {
        field: "",
        title: "操作",
        fixed: 'right',
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            if (row.auditStatus != 0) return [<span></span>]
            return [
              <div>
                <span style="font-size: 14px;color: #E62525;cursor: pointer;" onClick={() => delFn(row)}>删除</span>
              </div>,
            ];
          },
        },
      },
    ]);
    const delId = ref('')
    const delFn = (row) => {
      showDelModal.value = true
      delId.value = row.id
    }
    const handleSelect = (key, row) => {
      switch (key) {
        case "history":
          showVersionAction(row)
          break;
        case "del":
          showDelModal.value = true
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
    const onPositiveClick = () => {
      handleDel(delId.value);
    }
    const onNegativeClick = () => {

    }
    const renderSuffix = ({ option }) => {
      return <span></span>
      if (option.id != treeSelectId.value) {
        return <span></span>
      } else {
        return <span>
          <NwIcon name="icon-bianji3" style="marginRight:10px" onClick={(e) => { e.stopPropagation(); editorg12(option) }} size={16}></NwIcon>
          <NPopconfirm
            onPositive-click={(e) => { e.stopPropagation(); handleDel(option.id) }}
            positive-text="确定"
            negative-text="取消"

          >
            {{
              trigger: () => <NwIcon name="icon-lajitong" onClick={(e) => { e.stopPropagation() }} size={16}></NwIcon>,
              default: () => '是否删除当前选项？'
            }}

          </NPopconfirm>

        </span>
      }

    }
    const editorg12 = (o) => {
      orgModal.value = true
      dataModel.value = cloneDeep(o)
    }
    watch(dataModel, (d) => {
    });
    onMounted(() => {
      mdmOrgListFn()
    })
    const loading = ref(false)
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("导入成功");
        getTableV()
        mdmOrgListFn()
      } else {
        message.error(msg);
      }
      loading.value = false;
    };
    const handleError = () => {
      loading.value = false;
      let { code, data, msg } = JSON.parse(event.target.response);
      console.log(code, data, msg);
      message.error(msg);
    };
    const beforeUpload = () => {
      showLoading()
    };
    const showLoading = () => {
      message.success("正在导入");
      loading.value = true;
    }
    const handChange = ({ file, fileList }) => {
      // model.files = fileList;
    };

    return {
      handleFinish,
      handleError,
      beforeUpload,
      handChange,
      loading,
      showLoading,
      handleDel,
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
      mdmOrgListFn,
      orgTree,
      menuSelected,
      searchOrgName,
      treeSelectId,
      renderSuffix,
      orgModal,
      pOptions,
      editorg12,
      saveParentId,
      message,
      treeSpinShow,
      selectedOrgType,
      delFn
    };
  },
});
</script>
<style lang="less">
.orgCard {
  .n-card__content {
    padding: 10px;

    .n-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .n-button--default-type {
      right: 85px;
    }
  }
}
</style>
