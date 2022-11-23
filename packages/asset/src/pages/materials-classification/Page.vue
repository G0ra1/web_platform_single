<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>物资分类</h1>
    </n-layout-header>
    <n-layout class="nw-page1" has-sider>
      <n-layout-sider :width="350" style="border-right: 1px solid #ddd" :content-style="{
        'overflow-x': 'hiden',
      }">
        <n-input-group style="padding: 24px 5px 24px 5px; box-sizing: border-box">
          <n-input size="small" v-model:value="searchOrgName" clearable :style="{ width: '100%' }"
            placeholder="请输入分类名称" />

          <n-button type="info" style="height: 34px; padding: 0 8px; margin-right: 10px" size="small">
            <NwIcon name="icon-sousuo1" :size="20"></NwIcon>
          </n-button>
          <n-button type="info" @click="() => { creatClassification() }" style="height: 34px; padding: 0 8px"
            size="small">
            <NwIcon name="icon-add-bold" :size="20"></NwIcon>
          </n-button>
        </n-input-group>
        <n-spin :show="treeSpinShow">
          <n-tree block-line :data="orgTree" key-field="id" label-field="classifyName" children-field="kids"
            :on-update:selected-keys="menuSelected" :pattern="searchOrgName" :show-irrelevant-nodes="false"
            :render-suffix="renderSuffix" selectable />
        </n-spin>
      </n-layout-sider>
      <n-layout-content>
        <NwTable1 ref="tableRef" defaultKey="itemName" :columns="columns" v-bind="vbind">
          <template v-slot:header-left="{ selected }"> </template>
          <template #header-right>
            <n-input-group style="box-sizing: border-box;width:auto">
              <!-- <n-upload
                :action="uploadUrl"
                accept="*/*"
                :show-file-list="false"
                :headers="{
                  Authorization: `${tokenType} ${token}`,
                }"
                @finish="handleFinish"
                @change="handChange"
                @error="handleError"
                @before-upload="beforeUpload"
              >
                <n-button size="small" style="margin-right: 10px" type="info">
                  <NwIcon name="icon-add-bold" :size="15" />导入
                </n-button>
              </n-upload> -->
              <n-button type="info" size="small" style="margin-right: 5px" @click="handleShow()"
                :disabled="selectedOrgType != 2">新增物资</n-button>
            </n-input-group>
          </template>
          <template v-slot:search-form="{ searchFormData, searchFormData2 }">
            <n-form :model="searchFormData" label-placement="left" :label-width="80" size="small">
              <n-grid :cols="17" :x-gap="24">
                <n-form-item-gi :span="4" label="物资名称" path="itemName">
                  <n-input placeholder="请输入仓库名称" v-model:value="searchFormData.itemName" />
                </n-form-item-gi>
                <n-form-item-gi :span="4" label="物资编码" path="itemCode">
                  <n-input placeholder="请输入仓库名称" v-model:value="searchFormData.itemCode" />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </template>
        </NwTable1>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <!-- <n-drawer v-model:show="visible" :to="pageRef && pageRef.$el" width="960px" :height="200">
    <n-drawer-content :title="action === 'create' ? '新建' : '编辑'" :header-style="{
      padding: '10px',
      'font-size': '16px',
      'font-weight': 'bold',
    }" :footer-style="{
  padding: '10px',
}">
      <nw-form-view ref="formRef" src="/html/forms/asset-materials-classification-form.html" />
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
  <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" title="确认" content="请确认删除此记录"
    positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
  <n-modal v-model:show="classificationModal">
    <n-card style="width: 450px; height: 500px" :bordered="false" size="huge" role="dialog" aria-modal="true"
      class="classificationCard" :title="warehouseName">
      <nw-form-view ref="editClassRef" src="/html/forms/asset-materials-editClass-form.html" />
      <template #footer>
        <n-button type="info" size="small" @click="handleSaveeditClass">保存</n-button>
        <n-button size="small" @click="classificationModal = false">取消</n-button>
      </template>
    </n-card>
  </n-modal>
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
  <proDetails ref="proDetailsRef"></proDetails>
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


import editClass from "./editClass.vue";

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
  NSpin,
  NTooltip
} from "naive-ui";
import { cloneDeep } from 'lodash';
import { NwIcon, Cookies } from '@platform/main'
import {
  action,
  vbind,
  visible,
  dataModel,
  editClassDataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
  handleCancel,
  handleDel,
  itemClassifyListFn,
  orgTree,
  menuSelected,
  searchOrgName,
  treeSelectId,
  classificationModal,
  saveParentId,
  pOptions,
  treeSpinShow,
  selectedOrgType,
  handleSave,
  creatClassification,
  handleSaveeditClass,
  editClassRef,
  handleDelItemClassify
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
    NDropdown,
    NModal,
    NGrid,
    NFormItemGi,
    NDatePicker,
    NTree,
    NCard,
    NUpload,
    NSpin,
    editClass,
    NTooltip,
    proDetails
  },
  setup() {
    const range = ref([Date.now(), Date.now()])
    const message = useMessage()
    watch(() => range.value, (v) => {
      if (v[0] && v[1]) {
        tableRef.value.searchFormCache.value.startTime = format(v[0], 'yyyy-MM-dd') + " " + "00:00:00";
        tableRef.value.searchFormCache.value.endTime = format(v[1], 'yyyy-MM-dd') + " " + "23:59:59";
      }
    })
    const columns = reactive([
      { type: "seq", width: 50, minWidth: 50 },

      {
        field: "", title: "物资名称", width: 120, showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span onClick={() => { showDetails(row) }} style="color:#1d7ced;cursor: pointer;">{row.itemName}</span>
          }
        }
      },
      { field: "itemCode", title: "物资编码", width: 120, showHeaderOverflow: true, showOverflow: true, },
      { field: "descshort", title: "物资编码短描述", width: 160, showHeaderOverflow: true, showOverflow: true, },
      { field: "desclong", title: "物资编码长描述", width: 160, showHeaderOverflow: true, showOverflow: true, },
      { field: "unitName", title: "物资单位", width: 120, showHeaderOverflow: true, showOverflow: true, },
      { field: "state", title: "状态", width: 120, showHeaderOverflow: true },
      // { field: "remark", title: "备注", showHeaderOverflow: true, showOverflow: true },
      {
        field: "",
        title: "操作",
        fixed: 'right',
        minWidth: 120,
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <div>

                <NTooltip trigger={"hover"}>
                  {{
                    trigger: props => {
                      return <NwIcon name="icon-bianji3" style="cursor: pointer;margin-left:5px;" size={18} onClick={() => { handleShow(row) }} />
                    },
                    default: props => {
                      return '编辑'
                    }
                  }}
                </NTooltip>


                <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                  <NwIcon name="icon-qita" color="#010101" style="cursor: pointer;margin-left:5px;" size={18} />
                </NDropdown>

              </div>,
            ];
          },
        },
      },
    ]);
    const delId = ref('')
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
    const warehouseName = ref('')
    const warehouseId = ref('')

    const showDelModal = ref(false)
    const onPositiveClick = () => {
      handleDel(delId.value);
    }
    const onNegativeClick = () => {

    }
    const renderSuffix = ({ option }) => {
      if (option.id != treeSelectId.value) {
        return <span></span>
      } else {
        return <span>
          <NwIcon name="icon-bianji3" style="marginRight:10px" onClick={(e) => { e.stopPropagation(); creatClassification(option) }} size={16}></NwIcon>
          <NPopconfirm
            onPositive-click={(e) => { e.stopPropagation(); handleDelItemClassify(option.id) }}
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
    const proDetailsRef = ref(null)
    const showDetails = (row) => {
      proDetailsRef.value.show(row)
    }

    watch(dataModel, (d) => {
    });
    onMounted(() => {
      itemClassifyListFn()
    })
    const loading = ref(false)
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("导入成功");
        getTableV()
        itemClassifyListFn()
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
      editClassDataModel,
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
      itemClassifyListFn,
      orgTree,
      menuSelected,
      searchOrgName,
      treeSelectId,
      renderSuffix,
      classificationModal,
      creatClassification,
      pOptions,
      saveParentId,
      message,
      treeSpinShow,
      selectedOrgType,
      warehouseName,
      warehouseId,
      editClassRef,
      handleSaveeditClass,
      showDetails,
      proDetailsRef,
      handleDelItemClassify
    };
  },
});
</script>
<style lang="less">
.nw-page1 {
  height: calc(100% - 36px);

  .nw-table-content {}
}

.classificationCard {
  .n-card-header {
    padding: 10px;
  }

  .n-card__content {
    padding: 10px;
  }

  .n-card__footer {
    text-align: right;
    padding: 10px;
    height: 40px;

    .n-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .n-button--default-type {
      right: 70px;
    }
  }
}
</style>
