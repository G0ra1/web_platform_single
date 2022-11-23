import {
  ref,
  reactive,
  watch
} from 'vue'
import './bridge.js'
import { cloneDeep } from 'lodash'
import { details } from './api'
export const dataModel = ref({})
export const rules = ref([])
export const detailList = ref([])
export const visiRanDept = ref([]);
export const visiRanUsers = ref([]);
window.DM_SET_VALUE = function (v) {
  details(v.id).then(res => {
    console.log(res)
    console.log(res.detailList)
    detailList.value = res.detailList
    visiRanDept.value = res.detailList.filter(d => d.visibleType != 1).map(d => {
      d.orgName = d.rangeName
      d.orgId = d.rangeId
      return d
    })
    visiRanUsers.value = res.detailList.filter(d => d.visibleType == 1).map(d => {
      d.userNameCh = d.rangeName
      d.empId = d.rangeId
      return d
    })
    dataModel.value = { ...res, userNameChs: res.userNameCh, userIds: res.userId.toString(), userNames: res.userName }
  })

}
// 设置表单字段权限
window.DM_SET_RULES = function (v) {
  rules.value = v
}
// 获取表单数据
window.DM_GET_VALUE = function () {
  let nd = cloneDeep(dataModel.value)
  nd.detailList = detailList.value
  return JSON.parse(JSON.stringify(nd))
}

window.DM_INIT && window.DM_INIT()
