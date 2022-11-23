<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>到货验收</h1>
    </n-layout-header>
    <n-layout-content>
      <NwTable1 ref="tableRef" defaultKey="itemName" :columns="columns" v-bind="vbind">
        <template v-slot:header-left="{ selected }">
          <NwFunctionPredefine
            code="TOP_LEFT_1"
            descr="左上预留位置按钮1"
          />
        </template>
        <template #header-right>
          <!-- <NwFunctionPredefine
            code="TOP_LEFT_1"
            descr="左上预留位置按钮1"
          /> -->
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
// import NwBtnWf from "../../components/nw-btn-wf/index.vue"
// import nt from "../../components/nw-table/index.js";
import {
  default as NwTable,
  NwTableFun,
} from "../../components/nw-table/index4.vue";
import { format } from "date-fns";
import VersionAction from './versionAction.vue'
import proDetails from './proDetails.vue'

import { NwIcon, Cookies, NwFunctionPredefine } from '@platform/main'
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
// import NwFormView from "../../components/nw-form-view/index.vue";
import { wuziType } from "./api/index.js";
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
    // NwFormView,
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
    // NwBtnWf,
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
        field: "code", title: "验收编号", showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span onClick={() => { showDetails(row) }} style="color:#1d7ced;cursor: pointer;">{row.code}</span>
          }
        }
      },
      { field: "", title: "采购登记单号", showHeaderOverflow: true, showOverflow: true, },
      {
        field: "assetSource", title: "物资来源", showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span>{wuziTypeList.value.find(d => d.dictItemCode == row.assetSource) ? wuziTypeList.value.find(d => d.dictItemCode == row.assetSource).dictItemName : ''}</span>
          }
        }
      },
      { field: "", title: "采购数量", showHeaderOverflow: true, showOverflow: true, },
      { field: "sumTotalNumber", title: "验收数量", showHeaderOverflow: true, showOverflow: true, },
      { field: "sumTotalAmount", title: "合计金额", showHeaderOverflow: true, showOverflow: true, },
      { field: "explanation", title: "说明", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyUserName", title: "验收人", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyUserDeptName", title: "验收部门", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyUserOrgName", title: "验收单位", showHeaderOverflow: true, showOverflow: true, },
      { field: "applyTime", title: "申请时间", showHeaderOverflow: true, showOverflow: true, },
      {
        field: "", title: "审核状态", showOverflow: true,
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
            // 移植问题 新的框架中是否含有这种接口逻辑，结合新的如何实现
            return [
              <div>
                <NwBtnWf
                  isNewPage={false}
                  camundaProcInsId={row.camundaProcinsId}
                  size="small"
                  type="primary"
                  text
                >
                  {{
                    default: () => <span style="font-size: 14px;color: #6B84FC;margin-right:20px;cursor: pointer;">编辑</span>
                  }}
                </NwBtnWf>
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
      wuziType().then(res => {
        wuziTypeList.value = res
      })
    })
    const loading = ref(false)
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
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
    const wuziTypeList = ref([])

    return {
      token,
      tokenType,
      handleFinish,
      handleError,
      beforeUpload,
      handChange,
      loading,
      showLoading,
      uploadUrl: `${window.apiBaseURL}/manhour/org/import`,
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
      delFn,
      wuziTypeList
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
