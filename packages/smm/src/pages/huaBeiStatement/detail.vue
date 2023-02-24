<template>

  <n-config-provider
    abstract
    :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1500px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
  
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-bumen2" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        日报详情
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <div style="height:700px">
      <n-form
        :model="dataModel"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="180"
        size="small"
        class="LForm"
      >
        <n-grid :cols="24" :x-gap="24" class="LFormNg">
          <n-form-item-gi :span="24" label="" path="">
            <h5 class="card-title">基本信息</h5>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="填报日期" path="fillInTime" class="LFormTable">
            <n-date-picker
              style="width: 100%"
              v-model:formatted-value="dataModel.fillInTime"
              value-format="yyyy-MM-dd"
              type="date"
              disabled
            />
          </n-form-item-gi>

          <n-form-item-gi :span="12" label="填报人" path="createUserName" class="LFormTable">
            <n-input
              placeholder="填报人"
              disabled
              v-model:value="dataModel.createUserName"
            />
          </n-form-item-gi>

          
          <n-form-item-gi :span="24" label="" path="code">
            <h5 class="card-title">输气量汇总</h5>
          </n-form-item-gi>
          <!-- <n-form-item-gi :span="24" label="处理中心进气量(Nm3/d)" path="processCenterInGas" class="LFormTable">
          
            <n-input-number
              placeholder="0"
              style="width: 100%"
              disabled
              v-model:value="dataModel.processCenterInGas"
            />
          </n-form-item-gi> -->

          <n-form-item-gi label="炳然代输气量(Nm3/d)" path="bingranOutGas" :span="24" class="LFormTable">
            <n-input-number
              placeholder="0"
              style="width: 100%"
              disabled
              v-model:value="dataModel.bingranOutGas"
            />
          </n-form-item-gi>
          <!-- <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
            <vxe-grid
              ref="smmSxGasDailyOutGrid"
              v-bind="smmSxGasDailyOutListOption"
              style="
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 100%;
              "
            >
              <template #outName_default="{ row, column }">
                <span>{{ row.outName }}</span>
              </template>
             
              <template #outGasNumber_default="{ row, column }">
                <span>{{ row.outGasNumber }}</span>
              </template>
              
            </vxe-grid>
          </n-form-item-gi> -->
          <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
            <vxe-grid
              ref="smmSxGasDailyOutsourcingListGrid"
              v-bind="smmSxGasDailyOutsourcingListOption"
              style="
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 100%;
              "
            >
              <template #outsourcingName_default="{ row, column }">
                <span>{{ row.outsourcingName }}</span>
              </template>
              
              <template #outsourcingGasNumber_default="{ row, column }">
                <span>{{ row.outsourcingGasNumber }}</span>
              </template>
             
            </vxe-grid>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="" path="" class="LFormTable">
            <vxe-grid
              ref="smmSxGasDailyCooperateListGrid"
              v-bind="smmSxGasDailyCooperateListOption"
              style="
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 100%;
              "
            >
              <template #cooperateName_default="{ row, column }">
                <span>{{ row.cooperateName }}</span>
              </template>
              
              <template #cooperateGasNumber_default="{ row, column }">
                <span>{{ row.cooperateGasNumber }}</span>
              </template>
              
            </vxe-grid>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="" path="" class="LFormTable">
            <vxe-grid
              ref="smmSxGasDailySelfListGrid"
              v-bind="smmSxGasDailySelfListOption"
              style="
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 100%;
              "
            >
              <template #selfName_default="{ row, column }">
                <span>{{ row.selfName }}</span>
              </template>
              
              <template #selfGasNumber_default="{ row, column }">
                <span>{{ row.selfGasNumber }}</span>
              </template>
             
            </vxe-grid>
          </n-form-item-gi>

          <n-form-item-gi :span="24" label="" path="code" class="LFormTable">
            <vxe-grid
              ref="smmSxGasDailySellListGrid"
              v-bind="smmSxGasDailySellListOption"
              style="
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                width: 100%;
              "
            >
              <template #sellName_default="{ row, column }">
                <span>{{ row.sellName }}</span>
              </template>
              
              <template #sellGasNumber_default="{ row, column }">
                <span>{{ row.sellGasNumber }}</span>
              </template>
             
            </vxe-grid>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
    <div class="nw-modal-action">
      
      <n-button  size="small"
      @click="visible = false" >关闭</n-button>
    </div>
  </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, watch } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NBadge,
  NSpin,
  NModal,
  NSelect,
  NSwitch,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputNumber,
  NDatePicker,
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { detailForm } from './api/index'

import theme from '../../components/theme'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NBadge,
    NwIcon,
    NSwitch,
    NTabs,
    NTabPane,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputNumber,
    NDatePicker,
    NSelect,
  },
  props:{
  },
  setup(props, context){
    const visible = ref(false)
    const dataModel = ref({})
    const sonFn = (row) =>{
        visible.value = true
        detailForm(row.camundaProcinsId).then((r)=>{
            dataModel.value = {...r}
        })
    }
    const sumNum = (list, field) => {
      if (list && list.length <= 0) return 0
      let count  = 0
      list.forEach((item) => {
        console.log(item)
        console.log(field)
        if (item[field]) {
          count += Number(item[field])
        }
      })
      return count
    }
    const smmSxGasDailyOutListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyOutList,
      showFooter: true,
      toolbarConfig: null,
     
      columns: [
        {
          title: "场站",
          field: "outName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "outName_default", edit: "outName_edit" },
        },

        {
          title: "气量(Nm3/d)",
          field: "outGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "outGasNumber_default",
            edit: "boutGasNumber_edit",
          },
        },
       
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "outGasNumber") {
              sums.push(Number(sumNum(data, "outGasNumber")));
              
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailyOutsourcingListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyOutsourcingList,
      showFooter: true,
      toolbarConfig: null,
      columns: [
        {
          title: "采购来源  ",
          field: "outsourcingName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            default: "outsourcingName_default",
          },
        },

        {
          title: "气量(Nm3/d)",
          field: "outsourcingGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "outsourcingGasNumber_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "outsourcingGasNumber") {
              sums.push(Number(sumNum(data, "outsourcingGasNumber")));
             
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailyCooperateListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailyCooperateList,
      showFooter: true,
      toolbarConfig: null,
      columns: [
        {
          title: "合作名称",
          field: "cooperateName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            default: "cooperateName_default",
          },
        },

        {
          title: "气量(Nm3/d)",
          field: "cooperateGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "cooperateGasNumber_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "cooperateGasNumber") {
              sums.push(Number(sumNum(data, "cooperateGasNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailySelfListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailySelfList,
      showFooter: true,
      toolbarConfig: null,
      columns: [
        {
          title: "区域",
          field: "selfName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: { default: "selfName_default",},
        },

        {
          title: "气量(Nm3/d)",
          field: "selfGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "selfGasNumber_default",
          },
        },
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "selfGasNumber") {
              sums.push(Number(sumNum(data, "selfGasNumber")));
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
    const smmSxGasDailySellListOption = ref({
      rowId: "id",
      rowKey: false,
      keepSource: true,
      size: "mini",
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmSxGasDailySellList,
      showFooter: true,
      toolbarConfig: null,
     
      columns: [
        {
          title: "客户",
          field: "sellName",
          minWidth: 200,
          editRender: {},
          slots: { default: "sellName_default",  },
        },

        {
          title: "气量(Nm3/d)",
          field: "sellGasNumber",
          minWidth: 150,
          editRender: {},
          slots: {
            default: "sellGasNumber_default",
          },
        },
      
      ],
      footerMethod({ columns, data }) {
        const sums = [];
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push("合计");
          } else {
            if (column.field === "sellGasNumber") {
              sums.push(Number(sumNum(data, "sellGasNumber")));
             
            } else {
              sums.push("-");
            }
          }
        });
        // 返回一个二维数组的表尾合计
        return [sums];
      },
    });
  
    const smmSxGasDailyOutGrid = ref()
    const smmSxGasDailyOutsourcingListGrid = ref()
    const smmSxGasDailyCooperateListGrid = ref()
    const smmSxGasDailySelfListGrid = ref()
    const smmSxGasDailySellListGrid = ref()
    watch(() => dataModel.value.smmSxGasDailySellList, (d) => {
      if (smmSxGasDailySellListGrid.value) {
        smmSxGasDailySellListGrid.value.loadData(d)
      }


    })
    watch(() => dataModel.value.smmSxGasDailySelfList, (d) => {
      if (smmSxGasDailySelfListGrid.value) {
        smmSxGasDailySelfListGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmSxGasDailySellList, (d) => {
      if (smmSxGasDailyCooperateListGrid.value) {
        smmSxGasDailyCooperateListGrid.value.loadData(d)
      }
    })
    watch(() => dataModel.value.smmSxGasDailyOutsourcingList, (d) => {
      if (smmSxGasDailyOutsourcingListGrid.value) {
        smmSxGasDailyOutsourcingListGrid.value.loadData(d)
      }
    })
    // watch(() => dataModel.value.smmSxGasDailyOutList, (d) => {
    //   if (smmSxGasDailyOutGrid.value) {
    //     smmSxGasDailyOutGrid.value.loadData(d)
    //   }
    // })
    return {
        visible,
        dataModel,
        sonFn,
        smmSxGasDailyOutListOption,
        smmSxGasDailyOutsourcingListOption,
        smmSxGasDailyCooperateListOption,
        smmSxGasDailySelfListOption,
        smmSxGasDailySellListOption,
        smmSxGasDailyOutGrid,
        smmSxGasDailyOutsourcingListGrid,
        smmSxGasDailyCooperateListGrid,
        smmSxGasDailySelfListGrid,
        smmSxGasDailySellListGrid,
    }
  }
}
</script>

<style lang='less' scoped>
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}

.nw-spin-full {
  height: 100%;
  
  :deep(.n-spin-content) {
    height: 100%
  }
}


</style>