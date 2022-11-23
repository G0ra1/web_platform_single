import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { getItem } from "./api/index.js";
import { dataModel, detailList } from "./store.js";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
export const detailTable = ref(null);
export const itemListMap = ref({});
export const acceptAssetsPickRef = ref(null);
export const unitList = ref([]);

export const dataChangeEvent = ({ row, column }) => {
  if (row.storageNumber) {
    row.storageSumUntaxedAmount = (row.storageNumber * 1 * (row.storageUntaxedAmount * 1)).toFixed(2)
    row.storageSumAmount = (row.storageNumber * 1 * (row.storageAmount * 1)).toFixed(2)
  }
  calculationAmount();
};
const calculationAmount = () => {
  dataModel.value.sumTotalNumber = sum(
    detailList.value.map((d) => d.acceptNumber)
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
  acceptAssetsPickRef.value.sonFn(reduceData(detailList.value));
};

export const callbackSetItem = (d) => {
  d = enlargeData(d)
  console.log(d, 'callbackSetItem')
  detailList.value = d.map(e => {
    e.storageUntaxedAmount = e.assetsUntaxedAmount
    e.storageAmount = e.assetsAmount
    e.storageSumUntaxedAmount = 0
    e.storageSumAmount = 0
    return e
  });
  detailTable.value.loadData(detailList.value)
};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  detailList.value = detailTable.value.getTableData().fullData;
  calculationAmount();
};
