import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { getDetailByAssetsList } from "./api/index.js";
import { dataModel } from "./store.js";
export const detailTable = ref(null);
export const assetsList = ref([]);
export const assetsPickRef = ref(null);
export const unitList = ref([]);
export const activeItemType = ref("");
export const acceptanceDetailsRef = ref(null)
export const message = ref()
export const dataChangeEvent = ({ row, column }) => {
  if (row.acceptanceAmount && row.acceptanceNumber) {
    // 验收含税总价
    row.acceptanceSumAmount = row.acceptanceNumber * 1 * (row.acceptanceAmount * 1);

    if (row.acceptanceTaxRate) {
      // 验收总税额
      row.acceptanceSumUntaxedAmount = (
        row.acceptanceSumAmount /
        (1 + row.acceptanceTaxRate / 100)
      ).toFixed(2);
      // 验收税额
      row.acceptanceUntaxedAmount = (row.acceptanceAmount / (1 + row.acceptanceTaxRate / 100)).toFixed(
        2
      );
      // 验收未税总额
      row.acceptanceSumTaxAmount = (row.acceptanceSumAmount - row.acceptanceSumUntaxedAmount).toFixed(
        2
      );
      // 验收未税单价
      row.acceptanceTaxAmount = (
        row.acceptanceAmount - row.acceptanceUntaxedAmount
      ).toFixed(2);
    }
  }
  calculationAmount();
};
const calculationAmount = () => {
  let detailList = assetsList.value
  dataModel.value.sumTotalAmount = sum(
    detailList.map((d) => d.acceptanceSumAmount)
  ).toFixed(2);
  dataModel.value.sumTotalTaxAmount = sum(
    detailList.map((d) => d.acceptanceSumTaxAmount)
  ).toFixed(2);
  dataModel.value.sumTotalUntaxedAmount = (
    dataModel.value.sumTotalAmount - dataModel.value.sumTotalTaxAmount
  ).toFixed(2);
  dataModel.value.sumTotalNumber = sum(
    detailList.map((d) => d.acceptanceNumber)
  ).toFixed(2);
};
const $rowIndex = ref(0)
export const assetsAcceptance = (row, rowIndex) => {
  if (!row.distributeNumber) {
    message.value.info('请填写派发数量')
    return
  } else {
    $rowIndex.value = rowIndex
    addAsset(row)
  }

};

export const addAsset = (row) => {
  assetsPickRef.value.sonFn(row, assetsList.value[$rowIndex.value].detailList);
};

export const callbackSetItem = (d) => {
  console.log(d, 'callbackSetItem')
  assetsList.value[$rowIndex.value].detailList = d
};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  console.log(detailTable.value.getTableData().fullData);
  assetsList.value = detailTable.value.getTableData().fullData;
  calculationAmount();
};
