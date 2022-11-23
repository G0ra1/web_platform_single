import { ref, reactive, watch } from "vue";
import "./bridge.js";
import { cloneDeep } from "lodash";
import { getUser, fileinfo } from "./api/index.js";
import { format } from "date-fns";
import { assetsList, acceptanceDetailsRef } from "./itemtable.js";
import { Utils } from '@platform/main'
const { reduceData,enlargeData} = Utils
export const formRef = ref(null);
export const dataModel = ref({});
export const rules = ref([]);
export const brules = ref([]);
export const detailList = ref([{}]);
export const filesSons = ref([{}]);
window.DM_SET_VALUE = async function (v) {
  console.log(v, '111111111111')
  if (!v.applyTime) {
    v.applyTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
  if (!v.applyUserName) {
    await getUser().then((res) => {
      v.applyUserName = res.userNameCh;
      v.applyUserId = res.id;
      v.applyUserDeptName = res.parentDeptName;
      v.applyUserDeptId = res.parentDeptId;
      v.applyUserOrgName = res.parentOrgName;
      v.applyUserOrgId = res.parentOrgId;
    });
  }
  if (v.assetsList && v.assetsList.length > 0) {
    assetsList.value = enlargeData(v.assetsList)
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
  dataModel.value.assetsList = reduceData(assetsList.value)
  console.log(dataModel.value, 'dataModel.valuedataModel.value')
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
