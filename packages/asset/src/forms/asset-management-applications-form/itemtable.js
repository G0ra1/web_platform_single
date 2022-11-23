import { defineComponent, ref, onMounted, watch } from "vue";
import { sum } from "d3";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
import { getItem } from "./api/index.js";
import { dataModel } from "./store.js";
export const detailTable = ref(null);
export const itemListMap = ref({});
export const assetsPickRef = ref(null);
export const unitList = ref([]);
export const activeItemType = ref("");
export const dataChangeEvent = ({ row, column }) => {
  if (row.applyNumber && row.applyAmount) {
    row.applySumAmount = row.applyNumber * 1 * (row.applyAmount * 1);
    if (row.taxRate) {
      row.applySumUntaxedAmount = (
        row.applySumAmount /
        (1 + row.taxRate / 100)
      ).toFixed(2);
      row.applyUntaxedAmount = (row.applyAmount / (1 + row.taxRate / 100)).toFixed(
        2
      );
      row.applySumTaxAmount = (
        row.applySumAmount - row.applySumUntaxedAmount
      ).toFixed(2);
      row.applyTaxAmount = (row.applyAmount - row.applyUntaxedAmount).toFixed(
        2
      );
    }
  }
  calculationAmount();
};
const calculationAmount = () => {
  let detailList = [];
  for (const key in itemListMap.value) {
    detailList.push(...itemListMap.value[key]);
  }
  console.log(detailList, "detailListdetailListdetailList");
  dataModel.value.sumTotalAmount = sum(
    detailList.map((d) => d.applySumAmount)
  ).toFixed(2);
  dataModel.value.sumTotalTaxAmount = sum(
    detailList.map((d) => d.applySumTaxAmount)
  ).toFixed(2);
  dataModel.value.sumTotalUntaxedAmount = (
    dataModel.value.sumTotalAmount - dataModel.value.sumTotalTaxAmount
  ).toFixed(2);
  dataModel.value.sumTotalNumber = sum(
    detailList.map((d) => d.applyNumber)
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
  assetsPickRef.value.sonFn(reduceData(itemListMap.value[activeItemType.value]));
};

export const callbackSetItem = (d) => {
  d = enlargeData(d)
  itemListMap.value[activeItemType.value] = d.map((e) => {
    e.itemType = activeItemType.value;
    return e;
  });
};

export const delIemRow = (row) => {
  detailTable.value.remove(row);
  console.log(detailTable.value.getTableData().fullData);
  itemListMap.value[activeItemType.value] =
    detailTable.value.getTableData().fullData;
  calculationAmount();
};


