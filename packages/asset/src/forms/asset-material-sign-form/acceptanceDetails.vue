<template>
  <n-grid>
    <n-grid-item :span="24">
      <n-spin :show="spinShow">
        <vxe-table ref="detailTable" max-height="300" show-overflow border :data="detailList"
          :column-config="{ resizable: true }" :row-config="{ keyField: 'rowId' }" :edit-config="{
            trigger: 'click',
            mode: 'row',
            enabled: true,
            showIcon: true,
            autoClear: false,
          }" @cell-click="clickCell" @edit-actived="editActived">
          <vxe-column type="seq" title="序号" fixed="left" width="60"></vxe-column>
          <vxe-column field="itemCode" title="物资编码" width="135">
          </vxe-column>
          <vxe-column field="itemName" title="物资名称" width="135">
          </vxe-column>
          <vxe-column field="itemType" title="物资类型" width="135">
          </vxe-column>
          <vxe-column field="descshort" title="物资描述" width="135">
          </vxe-column>
          <vxe-column field="assetsCode" title="资产编号" width="135">
          </vxe-column>
          <vxe-column field="qualityAssuranceLevel" title="质保等级" width="135">
          </vxe-column>
        </vxe-table>
      </n-spin>
    </n-grid-item>
  </n-grid>

</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted, nextTick, h, watch } from 'vue';
import { cloneDeep } from 'lodash'
import fileUploadButton from "../../components/fileUploadButton/index.vue";
import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NTree,
  NSpin,
  NButton,
  NInputGroup,
  NFormItemGi,
  NDatePicker,
  NInputNumber,
  useMessage,
  NImage
} from "naive-ui";
import { dictItemLists } from "./api/index.js";
import warehousePick from "../../components/warehousePick/index.vue";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";
import { NwIcon } from '@platform/main'
import { format } from "date-fns";
export default defineComponent({
  components: {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NTree,
    NSpin,
    NButton,
    NInputGroup,
    NwIcon,
    NFormItemGi,
    NDatePicker,
    NInputNumber,
    warehousePick,
    warehouseShelfPick,
    fileUploadButton,
    NImage
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    partyaCode: {
      type: String,
      default: ''
    },
  },

  setup(props, context) {
    const message = useMessage();
    const showModal = ref(false);
    const spinShow = ref(false);
    const detailTable = ref(null);
    const searchValue = ref('')
    const detailList = ref([])
    const taxRateList = ref([])
    const rowModel = ref({})
    const rowDateModel = ref({})
    const showModal1 = ref(false)
    const unitList = ref([{
      unitName: '1',
    }, {
      unitName: '2'
    }])
    const setTableValue = (d) => {
      detailList.value = d
      detailTable.value.loadData(detailList.value)
    }
    const getTableValue = () => {
      return detailTable.value.getTableData().fullData
    }
    const searchEvent = () => {
    }
    const selectedAssRow = ref()
    const selectRow = ref({})
    const editRow = (row) => {
      selectRow.value = row
      showModal1.value = true
      rowModel.value = cloneDeep(row)
      rowDateModel.value = {}
      if (rowModel.value.productionDate) {
        rowDateModel.value.productionDate = +new Date(rowModel.value.productionDate)
      }
      if (rowModel.value.acceptanceDate) {
        rowDateModel.value.acceptanceDate = +new Date(rowModel.value.acceptanceDate)
      }
      if (rowModel.value.factoryDate) {
        rowDateModel.value.factoryDate = +new Date(rowModel.value.factoryDate)
      }
      if (rowModel.value.approachDate) {
        rowDateModel.value.approachDate = +new Date(rowModel.value.approachDate)
      }
      if (rowModel.value.receptionDate) {
        rowDateModel.value.receptionDate = +new Date(rowModel.value.receptionDate)
      }

      dictItemLists("ASSETS_TAX_RATE").then((res) => {
        res.forEach(e => {
          e.label = e.dictItemName
          e.value = e.dictItemCode
        });
        taxRateList.value = res
      });
    }
    const delIemRow = (row) => {
      detailTable.value.remove(row);
    };
    const clickCell = () => {
    }
    const selected = ref({})
    const contractCode = ref('')
    if (props.value) {
      contractCode.value = props.value
    }
    const onPositiveClick = (t) => {
      if (rowDateModel.value.productionDate) {
        rowModel.value.productionDate = format(rowDateModel.value.productionDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.acceptanceDate) {
        rowModel.value.acceptanceDate = format(rowDateModel.value.acceptanceDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.factoryDate) {
        rowModel.value.factoryDate = format(rowDateModel.value.factoryDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.approachDate) {
        rowModel.value.approachDate = format(rowDateModel.value.approachDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.receptionDate) {
        rowModel.value.receptionDate = format(rowDateModel.value.receptionDate, "yyyy-MM-dd hh:mm:ss");
      }
      message.success('修改成功')
      Object.assign(selectRow.value, rowModel.value)
      showModal1.value = false
    }
    const dataChangeEvent = () => {
    }
    watch([() => rowModel.value.acceptanceAmount, () => rowModel.value.acceptanceTaxRate], ([acceptanceAmount, acceptanceTaxRate]) => {
      console.log(acceptanceAmount, 'acceptanceAmount')
      console.log(acceptanceTaxRate, 'acceptanceTaxRate')
      if (acceptanceAmount && rowModel.value.acceptanceNumber) {
        // 验收含税总价
        rowModel.value.acceptanceSumAmount = rowModel.value.acceptanceNumber * 1 * (acceptanceAmount * 1);

        if (acceptanceTaxRate) {
          // 验收总税额
          rowModel.value.acceptanceSumTaxAmount = (
            rowModel.value.acceptanceSumAmount /
            (1 + acceptanceTaxRate / 100)
          ).toFixed(2);
          // 验收税额
          rowModel.value.acceptanceTaxAmount = (acceptanceAmount / (1 + acceptanceTaxRate / 100)).toFixed(
            2
          );
          // 验收未税总额
          rowModel.value.acceptanceSumUntaxedAmount = (rowModel.value.acceptanceSumAmount - rowModel.value.acceptanceSumTaxAmount).toFixed(
            2
          );
          // 验收未税单价
          rowModel.value.acceptanceUntaxedAmount = (
            acceptanceAmount - rowModel.value.acceptanceTaxAmount
          ).toFixed(2);
        }
      }
    })
    const editActived = ({ $rowIndex, row }) => {
      if ($rowIndex == 0) return true
      if (row.qualityAssuranceLevel) return true
      if (!detailList.value[$rowIndex - 1].qualityAssuranceLevel) return true
      if (row.classifyId != detailList.value[$rowIndex - 1].classifyId) return true
      detailList.value[$rowIndex] = { ...row, ...detailList.value[$rowIndex - 1], rowId: row.rowId }
      detailTable.value.loadData(detailList.value)
      // detailTable.value.setEditRow(row)
    }
    onMounted(async () => {

    });
    return {
      showModal,
      detailTable,
      spinShow,
      onPositiveClick,
      searchEvent,
      searchValue,
      selected,
      contractCode,
      detailList,
      taxRateList,
      unitList,
      clickCell,
      editRow,
      dataChangeEvent,
      showModal1,
      rowModel,
      selectRow,
      rowDateModel,
      selectedAssRow,
      setTableValue,
      getTableValue,
      delIemRow,
      editActived
    };
  },
});
</script>
<style lang="less">
.employeePickModal {
  .ivu-modal-body {
    padding: 0;
  }
}

.employeePick {
  height: 34px;

  .viewEmployeeColumnDel {
    padding: 2px;

    .ivu-table-cell {
      padding: 0 0 0 10px;
    }
  }

  .table-title {
    font-size: 14px;
    font-weight: bold;
    text-indent: 10px;

    .table-title-btn {
      float: right;
      margin: 10px;
    }
  }

  .employeePickInput {
    .ivu-input {
      background-color: #fff;
      color: #333;
      cursor: help;
    }
  }

  .ivu-poptip {
    .ivu-poptip-rel {
      width: 100%;
      vertical-align: middle;
    }

    .ivu-poptip-body {
      padding: 0;
    }
  }

  .table-left {
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }

  .table-right {
    border: 0;
  }

  .ivu-modal-body {
    padding: 0;
  }

  .ivu-modal-footer {
    border-top: 0;
  }

  .ivu-poptip-popper {
    padding: 0;
  }
}

.sider {
  padding: 5px;
  border-bottom: 1px solid #dcdee2;
  height: 780px;
}
</style>
