import {
    ref,
    reactive,
    watch
  } from 'vue'
  import './bridge.js'
  import { cloneDeep } from 'lodash'
  export const dataModel = ref({})
  export const questionScore = ref({})
  export const questionNumber = ref({})
  export const rules = ref([])
  
  window.DM_SET_VALUE = function(v) {
    v.typeCode = v.typeCode ? v.typeCode.split(',') : []
    v.typeName = v.typeName ? v.typeName.split(',') : []
    v.paperType = v.paperType ? v.paperType.split(',') : []
    // questionScore.value = v.questionScore ? v.questionScore : {}
    // questionNumber.value = v.questionNumber ? v.questionNumber : {}
    dataModel.value = v
  }
  // 设置表单字段权限
  window.DM_SET_RULES = function(v) {
    rules.value = v
  }
  // 获取表单数据
  window.DM_GET_VALUE = function() {
    dataModel.value.applyType = dataModel.value.applyType ? dataModel.value.applyType : 0
    let nDataModel = cloneDeep({...dataModel.value})
    if (nDataModel.typeName) {
      nDataModel.typeName = nDataModel.typeName.join(',')
      nDataModel.typeCode = nDataModel.typeCode.join(',')
    }
    if(nDataModel.paperType) {
      nDataModel.paperType = nDataModel.paperType.join(',')
    }
    return nDataModel
  }
  window.DM_VALIDATE = async function () {
    return []
    let f = []
    await formRef.value.validate().then(() => {
      f = []
    }).catch((e) => {
      f = e.map(([m]) => m.message)
    })
    return f
  }
  window.DM_INIT && window.DM_INIT()
  