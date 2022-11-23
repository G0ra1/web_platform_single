import {
    ref,
    reactive,
    watch
  } from 'vue'
  import './bridge.js'
  import { cloneDeep } from 'lodash'
  export const dataModel = ref({})
  export const rules = ref([])
  
  window.DM_SET_VALUE = function(v) {
    dataModel.value = v
  }
  // 设置表单字段权限
  window.DM_SET_RULES = function(v) {
    rules.value = v
  }
  // 获取表单数据
  window.DM_GET_VALUE = function() {
    return cloneDeep(dataModel.value)
  }

  window.DM_INIT && window.DM_INIT()
  