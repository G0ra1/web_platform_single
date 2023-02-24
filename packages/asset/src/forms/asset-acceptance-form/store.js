import { ref, reactive, watch } from "vue";
import "./bridge.js";
import { cloneDeep } from "lodash";
import { getUser, fileinfo } from "./api/index.js";
import { format } from "date-fns";
import { assetsList, acceptanceDetailsRef } from "./itemtable.js";
import { Utils } from '@platform/main'
const { reduceData, enlargeData } = Utils
export const formRef = ref(null);
export const dataModel = ref({});
export const rules = ref([]);
export const brules = ref([]);
export const detailList = ref([{}]);
export const filesSons = ref([{}]);
window.DM_SET_VALUE = async function (v) {
  let user ;
  if (!v.applyTime) {
    v.applyTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
  if (!v.applyUserName) {
    await getUser().then((res) => {
      user = res;
      v.applyUserName = res.userNameCh;
      v.applyUserId = res.id;
      v.applyUserDeptName = res.parentDeptName;
      v.applyUserDeptId = res.parentDeptId;
      v.applyUserOrgName = res.parentOrgName;
      v.applyUserOrgId = res.parentOrgId;
    });
  }
  if (!v.acceptanceDate) {
    v.acceptanceDate = format(new Date(), "yyyy-MM-dd");
  }
  if (!v.acceptanceUserName) {
    v.acceptanceUserId = user.id;
    v.acceptanceUserName = user.userNameCh;
  }
  if (v.detailList && v.detailList.length > 0 && acceptanceDetailsRef.value) {
    v.detailList = enlargeData(v.detailList)
    acceptanceDetailsRef.value.setTableValue(v.detailList.map(d => {
      d.productionDate = d.productionDate ? d.productionDate.slice(0, 10) : null
      d.factoryDate = d.factoryDate ? d.factoryDate.slice(0, 10) : null
      return d
    }))
  }
  dataModel.value = v;
  console.log(dataModel.value, 'dataModel.value')
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
  if (acceptanceDetailsRef.value) {
    dataModel.value.detailList = reduceData(cloneDeep(acceptanceDetailsRef.value.getTableValue()).map(d => {
      if (d.productionDate && d.productionDate.length == 10) {
        d.productionDate = d.productionDate + ' 00:00:00'
      }
      if (d.factoryDate && d.factoryDate.length == 10) {
        d.factoryDate = d.factoryDate + ' 00:00:00'
      }
      return d
    }))
    console.log(dataModel.value, 'assetsList.valueassetsList.value')
    return cloneDeep(dataModel.value);
  }
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
