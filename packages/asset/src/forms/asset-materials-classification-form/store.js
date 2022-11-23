import { ref, reactive, watch } from "vue";
import "./bridge.js";
import { cloneDeep } from "lodash";
import { getItemClassify, getItem } from "./api/index.js";
export const dataModel = ref({});
export const rules = ref([]);
export const brules = ref([]);
export const goodsShelfRef = ref(null);
export const skuColumn = ref([]);
export const itemSkuList = ref([]);
export const unitList = ref([]);

window.DM_SET_VALUE = function (v) {
  console.log(v, "DM_SET_VALUE");
  if (v.classifyId && !v.id) {
    getItemClassify(v.classifyId).then((res) => {
      if (res.itemSkuList && res.itemSkuList.length > 0) {
        res.itemSkuList.forEach((e) => {
          let d = {};
          d.title = e.skuName;
          d.field = e.id;
          d.sort = e.sort;
          skuColumn.value.push(d);
        });
      }
    });
  } else {
    if (v.id) {
      getItem(v.id).then((res) => {
        dataModel.value = res;
        if (res.unitList && res.unitList.length > 0)
          unitList.value = [
            { unitName: res.unitName, unitCode: res.unitCode },
            ...res.unitList,
          ];
        if (res.skuList && res.skuList.length > 0) {
          skuColumn.value = [];
          res.skuList.forEach((e) => {
            let d = {};
            d.title = e.skuName;
            d.field = e.id;
            d.sort = e.sort;
            skuColumn.value.push(d);
          });
        }
        console.log(skuColumn.value, "skuColumn");
        if (res.skuLineList && res.skuLineList.length > 0) {
          itemSkuList.value = [];
          res.skuLineList.forEach((e) => {
            let d = {};
            d.skuCode = e.skuCode;
            d.id = e.id;
            if (e.skuColumnList && e.skuColumnList.length > 0) {
              e.skuColumnList.forEach((f) => {
                d[f.skuId] = f.skuValue;
              });
            }
            itemSkuList.value.push(d);
          });
        }
        console.log(itemSkuList.value, "itemSkuList");
      });
    }
  }
  dataModel.value = v;
};
// 设置表单字段权限
window.DM_SET_RULES = function (v) {
  Object.entries(v).forEach(([key, val]) => {
    // 区分子表
    if (key.includes(".")) {
      // 子表处理
    } else {
      // 处理必填
      if (val.powerCode === "required") {
        rules.value[key] = {
          required: true,
          trigger: ["blur", "input"],
          message: `${val.nameCh}该属性为必填`,
        };
        // 特殊处理
        if (
          key === "checkScore" ||
          key == "checkStatus" ||
          key == "compileScore" ||
          key == "compileStatus"
        ) {
          rules.value[key].type = "number";
        }
      } else {
        brules.value[key] = val.powerCode;
      }
    }
  });
};
// 获取表单数据
window.DM_GET_VALUE = function () {
  let data = cloneDeep(dataModel.value);
  if (data.unitList && data.unitList.length >= 2) {
    data.unitList.shift();
  }
  return data;
};
window.DM_VALIDATE = async function () {
  let f = [];
  let s = "";
  // if (dataModel.taskLevel == 3) {
  //   if (parseInt(dataModel.value.auditWorkScale + dataModel.value.checkWorkScale + dataModel.value.compileWorkScale) == 100) {
  //   } else {
  //     s = '审、校、编合计应为100%'
  //   }
  // }
  await formRef.value
    .validate()
    .then(() => {
      f = [];
    })
    .catch((e) => {
      f = e.map(([m]) => m.message);
    });
  if (s != "") {
    f.push(s);
  }
  return f;
};

window.DM_INIT && window.DM_INIT();
