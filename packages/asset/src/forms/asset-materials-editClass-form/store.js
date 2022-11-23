import {
  ref,
  reactive,
  watch
} from 'vue'
import './bridge.js'
import { cloneDeep } from 'lodash'
import { itemClassifyList, getItemClassify } from './api/index.js'
export const dataModel = ref({})
export const rules = ref([])
export const brules = ref([])
export const goodsShelfRef = ref(null)
export const classTree = ref([])
export const treeLoading = ref(false)
export const itemSkuList = ref([])
export const itemClassifyListFn = () => {
  treeLoading.value = true
  itemClassifyList({ isDefault: 0, isdel: 1 }).then(res => {
    classTree.value = res
  }).finally(() => {
    treeLoading.value = false
  })
}
window.DM_SET_VALUE = function (v) {
  if (v.id) {
    getItemClassify(v.id).then(res => {
      dataModel.value = res
      if (res.itemSkuList) itemSkuList.value = res.itemSkuList
    })
  } else {
    dataModel.value = v
    if (v.itemSkuList) itemSkuList.value = v.itemSkuList
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
  if (itemSkuList.value.length > 0) {
    itemSkuList.value.forEach((e, i) => {
      if (!e.sort) {
        e.sort = i + 1
      }
    })
    dataModel.value.itemSkuList = itemSkuList.value
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
