import {
  ref,
  reactive,
  watch,
  nextTick
} from 'vue'
import './bridge.js'
import { cloneDeep } from 'lodash'
import { getWarehouse } from './api/index.js'
export const dataModel = ref({})
export const rules = ref([])
export const brules = ref([])
export const goodsShelfRef = ref(null)
window.DM_SET_VALUE = function (v) {
  if (v.id) {
    getWarehouse(v.id).then(res => {
      dataModel.value = res
      if (res.houseType == '1') {
        nextTick().then(() => {
          goodsShelfRef.value.setTableData(res.shelfList)
        })
      }
      
    })
  } else {
    dataModel.value = v
  }

}
// 设置表单字段权限
window.DM_SET_RULES = function (v) {
  Object.entries(v).forEach(([key, val]) => {
    // 区分子表
    if (key.includes('.')) {
      // 子表处理
    } else {
      // 处理必填
      if (val.powerCode === 'required') {
        rules.value[key] = {
          required: true,
          trigger: ["blur", "input"],
          message: `${val.nameCh}该属性为必填`,
        }
        // 特殊处理
        if (key === 'checkScore' || key == "checkStatus" || key == "compileScore" || key == "compileStatus") {
          rules.value[key].type = 'number'
        }
      } else {
        brules.value[key] = val.powerCode
      }
    }
  })
}
// 获取表单数据
window.DM_GET_VALUE = function () {
  if (dataModel.value.houseType == '1') {
    dataModel.value.shelfList = goodsShelfRef.value.getTableData()
  }
  return cloneDeep(dataModel.value)
}
window.DM_VALIDATE = async function () {
  let f = []
  let s = ''
  // if (dataModel.taskLevel == 3) {
  //   if (parseInt(dataModel.value.auditWorkScale + dataModel.value.checkWorkScale + dataModel.value.compileWorkScale) == 100) {
  //   } else {
  //     s = '审、校、编合计应为100%'
  //   }
  // }
  await formRef.value.validate().then(() => {
    f = []
  }).catch((e) => {
    f = e.map(([m]) => m.message)
  })
  if (s != '') {
    f.push(s)
  }
  return f
}

window.DM_INIT && window.DM_INIT()
