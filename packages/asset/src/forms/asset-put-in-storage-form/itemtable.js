import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { getItem } from "./api/index.js";
import { dataModel, detailList } from "./store.js";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
export const detailTable = ref(null);
export const itemListMap = ref({});
export const stockPendingRef = ref(null);
export const unitList = ref([]);
export const assetsPickRef = ref(null)
export const dataChangeEvent = ({ row, column }) => {
  console.log(detailList.value, 'detailList.value')
  if (row.storageAmount && row.storageNumber) {
    // 入库含税总价
    row.storageSumAmount = row.storageNumber * 1 * (row.storageAmount * 1);

    if (row.stotageTaxRate) {
      // 入库总税额
      row.storageSumUntaxedAmount = (
        row.storageSumAmount /
        (1 + row.stotageTaxRate / 100)
      ).toFixed(2);
      // 入库未税总额
      row.storageUntaxedAmount = (row.storageAmount / (1 + row.stotageTaxRate / 100)).toFixed(
        2
      );
      // 入库税总额
      row.storageSumTaxAmount = (row.storageSumAmount - row.storageSumUntaxedAmount).toFixed(
        2
      );
      // 入库未税单价
      row.storageTaxAmount = (
        row.storageAmount - row.storageUntaxedAmount
      ).toFixed(2);
    }
  }
  // if (row.storageNumber && row.storageUntaxedAmount && row.storageAmount) {
  //   row.storageSumUntaxedAmount = (row.storageNumber * 1 * (row.storageUntaxedAmount * 1)).toFixed(2)
  //   row.storageSumAmount = (row.storageNumber * 1 * (row.storageAmount * 1)).toFixed(2)
  // }
  calculationAmount();
};
const calculationAmount = () => {
  dataModel.value.sumTotalNumber = sum(
    detailList.value.map((d) => d.storageNumber)
  )
  dataModel.value.sumTotalAmount = sum(
    detailList.value.map((d) => d.storageSumAmount)
  ).toFixed(2);
  dataModel.value.sumTotalUntaxedAmount = sum(
    detailList.value.map((d) => d.storageSumUntaxedAmount)
  ).toFixed(2);
  dataModel.value.sumTotalTaxAmount = (
    dataModel.value.sumTotalAmount -
    dataModel.value.sumTotalUntaxedAmount
  ).toFixed(2);
};
export const editIemRow = ({ row }) => {
};

export const addAsset = () => {
  if (!dataModel.value.assetSource) {
    window.$message.info('请选择物资来源')
    // console.log(window)
    return
  }
  if (dataModel.value.assetSource != '1') {
    assetsPickRef.value.sonFn(reduceData(detailList.value));
  } else {
    stockPendingRef.value.sonFn(reduceData(detailList.value));
  }
};

export const callbackSetItem = (d) => {
  console.log(d, 'callbackSetItem')
  d = enlargeData(d)
  detailList.value = d.map(e => {
    // e.storageUntaxedAmount = e.assetsUntaxedAmount
    // e.storageAmount = e.assetsAmount
    // e.storageSumUntaxedAmount = 0
    // e.storageSumAmount = 0
    // e.id = null
    delete e.id;
    return e;
  });
  detailTable.value.loadData(detailList.value)
};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  detailList.value = detailTable.value.getTableData().fullData;
  calculationAmount();
};
