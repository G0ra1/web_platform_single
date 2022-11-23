import { ref, reactive, watch } from "vue";
import "./bridge.js";
import { cloneDeep } from "lodash";
import { getUser, fileinfo } from "./api/index.js";
import { format } from "date-fns";
import { itemListMap } from "./itemtable.js";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
export const dataModel = ref({});
export const rules = ref([]);
export const brules = ref([]);
export const detailList = ref([{}]);
export const filesSons = ref([{}]);
export const formRef = ref(null)
window.DM_SET_VALUE = async function (v) {
  console.log(v, "DM_SET_VALUE");
  if (!v.applyTime) {
    v.applyTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
  if (!v.applyUserName) {
    await getUser().then((res) => {
      console.log(res, "res......");
      v.applyUserName = res.userNameCh;
      v.applyUserId = res.id;
      v.applyUserDeptName = res.parentDeptName;
      v.applyUserDeptId = res.parentDeptId;
      v.applyUserOrgName = res.parentOrgName;
      v.applyUserOrgId = res.parentOrgId;
    });
  }
  if (v.planYear) {
    v.planYear = +new Date(v.planYear);
  }
  if (v.itemType) {
    v.itemType = v.itemType.split(",");
    v.itemTypeName = v.itemTypeName.split(",");
  }
  if (v.detailList && v.detailList.length > 0) {
    v.detailList.forEach((d) => {
      if (itemListMap.value[d.itemType]) {
        itemListMap.value[d.itemType].push(d);
      } else {
        itemListMap.value[d.itemType] = [];
        itemListMap.value[d.itemType].push(d);
      }
    });
    for (const key in itemListMap.value) {
      itemListMap.value[key] = enlargeData(itemListMap.value[key])
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
  if (dataModel.value.itemType && dataModel.value.itemType.length > 0) {
    dataModel.value.itemType = dataModel.value.itemType.toString();
    dataModel.value.itemTypeName = dataModel.value.itemTypeName.toString();
  }
  if (dataModel.value.planYear) {
    dataModel.value.planYear = format(
      new Date(dataModel.value.planYear),
      "yyyy"
    );
  }
  let detailList = [];
  for (const key in itemListMap.value) {
    detailList.push(...reduceData(itemListMap.value[key]));
  }
  dataModel.value.detailList = detailList.map((d) => {
    d.id = null;
    return d;
  });
  console.log(
    dataModel.value,
    "dataModel.valuedataModel.valuedataModel.valuedataModel.value"
  );
  return cloneDeep(dataModel.value);
};
window.DM_VALIDATE = async function () {
  let f = []
  await formRef.value.validate().then(() => {
    f = []
  }).catch((e) => {
    f = e.map(([m]) => m.message)
  })
  return f
}

window.DM_INIT && window.DM_INIT();
