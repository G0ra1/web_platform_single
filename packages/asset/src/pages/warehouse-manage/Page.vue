<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header class="nw-layout-header">
      <h1>仓库管理</h1>
    </n-layout-header>
    <n-layout class="nw-page1" has-sider>
      <n-layout-sider :width="350" style="border-right: 1px solid #ddd" :content-style="{
        'overflow-x': 'hiden',
      }">
        <n-input-group style="padding: 24px 5px 24px 5px; box-sizing: border-box">
          <n-input size="small" v-model:value="searchOrgName" clearable :style="{ width: '100%' }"
            placeholder="请输入组织名称" />

          <n-button type="info" style="height: 34px; padding: 0 8px; margin-right: 10px" size="small">
            <NwIcon name="icon-sousuo1" :size="20"></NwIcon>
          </n-button>
          <!-- <n-button
            type="info"
            @click="creatorg12"
            style="height: 34px; padding: 0 8px"
            size="small"
          >
            <NwIcon name="icon-n-y-add" :size="20"></NwIcon
          ></n-button> -->
        </n-input-group>
        <n-spin :show="treeSpinShow">
          <n-tree block-line :data="orgTree" key-field="id" label-field="orgName" children-field="kids"
            :on-update:selected-keys="menuSelected" :pattern="searchOrgName" :show-irrelevant-nodes="false"
            :render-suffix="renderSuffix" selectable />
        </n-spin>
      </n-layout-sider>
      <n-layout-content>
        <NwTable1 ref="tableRef" defaultKey="orgName" :columns="columns" v-bind="vbind">
          <template v-slot:header-left="{ selected }"> </template>
          <template #header-right>
              
              <n-button type="info" size="small" style="margin-right: 5px" @click="handleShow()"
                :disabled="selectedOrgType != 2">新建仓库</n-button>
            <!-- </n-input-group> -->
          </template>
          <template v-slot:search-form="{ searchFormData, searchFormData2 }">
            <n-form :model="searchFormData" label-placement="left" :label-width="80" size="small">
              <n-grid :cols="17" :x-gap="24">
                <n-form-item-gi :span="4" label="仓库名称" path="orgName">
                  <n-input placeholder="请输入仓库名称" v-model:value="searchFormData.orgName" />
                </n-form-item-gi>
                <n-form-item-gi :span="4" label="仓库类型" path="orgLevel">
                  <n-select v-model:value="searchFormData.orgLevel" :options="[
                    { label: '仓库', value: 1 },
                    { label: '位置信息', value: 2 },
                    { label: '虚拟仓库', value: 3 },
                  ]">
                  </n-select>
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </template>
        </NwTable1>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="visible" :to="pageRef && pageRef.$el" width="960px" :height="200">
    <n-drawer-content :title="action === 'create' ? '新建' : '编辑'" :header-style="{
      padding: '10px',
      'font-size': '16px',
      'font-weight': 'bold',
    }" :footer-style="{
  padding: '10px',
}">
      <NwFormViewerAsync ref="formRef" />
      <!-- <nw-form-view ref="formRef"  src="/incloud-biz-asset/asset-warehouse-manage-form" /> -->
      <template #footer>
        <n-button type="info" size="small" style="margin-right: 5px" @click="handleSave">保存</n-button>
        <n-button size="small" @click="handleCancel">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <VersionAction ref="versionAction" @update:callback="
    () => {
      getTableV(data);
    }
  "></VersionAction>
  <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" title="确认" content="请确认删除此记录"
    positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
  <n-modal v-model:show="orgModal">
    <n-card style="width: 800px; height: 500px" :bordered="false" size="huge" role="dialog" aria-modal="true"
      class="orgCard" :title="warehouseName">
      <goodsShelf ref="goodsShelfRef" :isForms="false" :warehouseName="warehouseName" :warehouseId="warehouseId">
      </goodsShelf>
      <template #footer>
        <n-button type="info" size="small" @click="handleSaveGoodsShelf">保存</n-button>
        <n-button size="small" @click="orgModal = false">取消</n-button>
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
import goodsShelf from "./goodsShelf.vue";
import proDetails from './proDetails.vue'
import { getWarehouse, saveShelfs } from './api/index.js'
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
import { NwIcon, NwFunctionPredefine, NwFormViewerAsync } from '@platform/main'
import {
  action,
  vbind,
  visible,
  dataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
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
  selectedOrgType,
  handleSave
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
    goodsShelf,
    NTooltip,
    proDetails,
    NwFunctionPredefine,
    NwFormViewerAsync
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
        field: "", title: "仓库名称", showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span onClick={() => { showDetails(row) }} style="color:#1d7ced;cursor: pointer;">{row.warehouseName}</span>
          }
        }
      },
      {
        field: "orgName", title: "责任主体", showHeaderOverflow: true,
        showOverflow: true
      },
      { field: "deptName", title: "责任部门", showHeaderOverflow: true },
      { field: "respondUserName", title: "责任人", showHeaderOverflow: true },
      {
        field: "", title: "仓库类型", showHeaderOverflow: true, showOverflow: true, slots: {
          default: ({ row }) => {
            return <span>{row.houseType == '1' ? '仓库' : row.houseType == '3' ? '位置信息' : '虚拟仓库'}</span>
          }
        }
      },
      { field: "address", title: "地点", showHeaderOverflow: true },
      { field: "remark", title: "备注", showHeaderOverflow: true, showOverflow: true },
      {
        field: "",
        title: "操作",
        fixed: 'right',
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            if (row.houseType == '1') {
              // 这里处理货架逻辑

              

              return [
                <div>
                  <NTooltip trigger={"hover"}>
                    {{
                      trigger: props => {
                        return <NwIcon name="icon-n-y-huojia" style="cursor: pointer;" size={18} onClick={() => { showShelf(row) }} />
                      },
                      default: props => {
                        return '货架详情'
                      }
                    }}
                  </NTooltip>
                  <NTooltip trigger={"hover"}>
                    {{
                      trigger: props => {
                        return <NwIcon name="icon-n-y-editpage" style="cursor: pointer;margin-left:5px;" size={18} onClick={() => { handleShow(row) }} />
                      },
                      default: props => {
                        return '编辑'
                      }
                    }}
                  </NTooltip>


                  <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                    <NwIcon name="icon-n-y-qita" color="#010101" style="cursor: pointer;margin-left:5px;" size={18} />
                  </NDropdown>

                </div>,
              ];
            }else{
              return [
                <div>
                  <NTooltip trigger={"hover"}>
                    {{
                      trigger: props => {
                        return <NwIcon name="icon-n-y-editpage" style="cursor: pointer;margin-left:5px;" size={18} onClick={() => { handleShow(row) }} />
                      },
                      default: props => {
                        return '编辑'
                      }
                    }}
                  </NTooltip>
                  <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                    <NwIcon name="icon-n-y-qita" color="#010101" style="cursor: pointer;margin-left:5px;" size={18} />
                  </NDropdown>

                </div>,
              ];
            }

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
    const goodsShelfRef = ref(null)
    const showShelf = (row) => {
      warehouseName.value = row.warehouseName
      warehouseId.value = row.id
      getWarehouse(row.id).then(res => {
        goodsShelfRef.value.setTableData(res.shelfList)
      })
      editGoodsShelf()
    }
    const handleSaveGoodsShelf = () => {
      saveShelfs({ shelfList: goodsShelfRef.value.getTableData() }).then(res => {
        message.success("保存成功");
        orgModal.value = false
      })
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
          <NwIcon name="icon-bianji3" style="marginRight:10px" onClick={(e) => { e.stopPropagation(); editGoodsShelf(option) }} size={16}></NwIcon>
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
    const editGoodsShelf = (o) => {
      orgModal.value = true
    }
    const proDetailsRef = ref(null)
    const showDetails = (row) => {
      proDetailsRef.value.show(row)
    }
    const creatorg12 = () => {
      orgModal.value = true
      dataModel.value = {}
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
      creatorg12,
      pOptions,
      editGoodsShelf,
      saveParentId,
      message,
      treeSpinShow,
      selectedOrgType,
      warehouseName,
      warehouseId,
      goodsShelfRef,
      handleSaveGoodsShelf,
      showDetails,
      proDetailsRef
    };
  },
});
</script>
<style lang="less">
.nw-page1 {
  height: calc(100% - 36px);

  .nw-table-content {}
}

.orgCard {
  .n-card-header {
    padding: 10px;
  }

  .n-card__content {
    padding: 10px;
  }

  .n-card__footer {
    text-align: right;
    padding: 10px;

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
