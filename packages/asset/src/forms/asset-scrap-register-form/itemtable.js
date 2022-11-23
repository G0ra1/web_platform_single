import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { getItem } from "./api/index.js";
import { dataModel } from "./store.js";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
export const detailTable = ref(null);
export const assetsList = ref([]);
export const assteScrapRegisterPickRef = ref(null);
export const unitList = ref([]);
export const activeItemType = ref("");

export const dataChangeEvent = ({ row, column }) => {
  if (row.scrapNumber && row.assetsAmount) {
    // 采购含税总价
    row.assetsSumAmount = (row.scrapNumber * 1 * (row.assetsAmount * 1)).toFixed(2);

    // if (row.registerTaxRate) {
    //   // 采购总税额
    //   row.registerSumTaxAmount = (
    //     row.registerSumAmount /
    //     (1 + row.registerTaxRate / 100)
    //   ).toFixed(2);
    //   // 采购税额
    //   row.registerTaxAmount = (row.registerAmount / (1 + row.registerTaxRate / 100)).toFixed(
    //     2
    //   );
    //   // 采购未税总额
    //   row.registerSumUntaxedAmount = (row.registerSumAmount - row.registerSumTaxAmount).toFixed(
    //     2
    //   );
    //   // 采购未税单价
    //   row.registerUntaxedAmount = (
    //     row.registerAmount - row.registerTaxAmount
    //   ).toFixed(2);
    // }
  }
  calculationAmount();
};
const calculationAmount = () => {
  let detailList = assetsList.value
  dataModel.value.sumTotalAmount = sum(
    detailList.map((d) => d.assetsSumAmount)
  ).toFixed(2);
  // dataModel.value.sumTotalTaxAmount = sum(
  //   detailList.map((d) => d.registerSumTaxAmount)
  // ).toFixed(2);
  // dataModel.value.sumTotalUntaxedAmount = (
  //   dataModel.value.sumTotalAmount - dataModel.value.sumTotalTaxAmount
  // ).toFixed(2);
  dataModel.value.sumTotalNumber = sum(
    detailList.map((d) => d.scrapNumber)
  ).toFixed(2);

};
export const editIemRow = ({ row }) => {
  if (!row.itemId) return;
  getItem(row.itemId).then((res) => {
    if (res.unitList && res.unitList.length > 0)
      unitList.value = [
        { unitName: res.unitName, unitCode: res.unitCode },
        ...res.unitList,
      ];
  });
};

export const addAsset = () => {
  assteScrapRegisterPickRef.value.showSelect(reduceData(assetsList.value));
};

export const callbackSetItem = (d) => {
  d = enlargeData(d)
  d.forEach(e => {
    e.registerAmount = 0
    e.registerNumber = 0
    e.registerTaxRate = e.taxRate
    dataChangeEvent({ row: e })
  });
  console.log(d, '采购信息')
  assetsList.value = d
  detailTable.value.loadData(assetsList.value)
  calculationAmount()
};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  console.log(detailTable.value.getTableData().fullData);
  assetsList.value = detailTable.value.getTableData().fullData;
  calculationAmount();
};
