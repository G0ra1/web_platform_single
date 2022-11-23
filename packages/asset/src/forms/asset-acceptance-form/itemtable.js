import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { getDetailByAssetsList } from "./api/index.js";
import { dataModel } from "./store.js";

import { Utils } from '@platform/main'
const { reduceData,enlargeData } = Utils
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
  // calculationAmount();
};
const calculationAmount = () => {
  let detailList = assetsList.value
  dataModel.value.sumTotalAmount = sum(
    detailList.map((d) => d.acceptanceAmount)
  ).toFixed(2);
  dataModel.value.sumTotalTaxAmount = sum(
    detailList.map((d) => d.acceptanceTaxAmount)
  ).toFixed(2);
  dataModel.value.sumTotalUntaxedAmount = (
    dataModel.value.sumTotalAmount - dataModel.value.sumTotalTaxAmount
  ).toFixed(2);
  dataModel.value.sumTotalNumber = sum(
    detailList.map((d) => d.acceptanceNumber)
  ).toFixed(2);
};
export const assetsAcceptance = (row) => {
  if (!row.acceptanceNumber) {
    message.value.info('请填写验收数量')
    return
  }

};

export const addAsset = () => {
  if (!dataModel.value.registerId) {
    message.value.info('请选择采购登记')
    return
  }
  assetsPickRef.value.sonFn(reduceData(assetsList.value));
};

export const callbackSetItem = (d) => {
  d.forEach(e => {
    e.acceptanceAmount = 0
    e.acceptanceTaxRate = 0
  });
  getDetailByAssetsList(d).then(res => {
    assetsList.value = enlargeData(res)
    console.log(res, 'enlargeData(res)')
    acceptanceDetailsRef.value.setTableValue(assetsList.value)
    calculationAmount()
  })

};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  console.log(detailTable.value.getTableData().fullData);
  assetsList.value = detailTable.value.getTableData().fullData;
  calculationAmount();
};
