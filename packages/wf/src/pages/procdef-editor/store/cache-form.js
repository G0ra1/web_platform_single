import { ref } from 'vue'
import {
    queryEvents
} from '../api/index'

import {
    actionElBusinessObject
} from './bpmn'

import {
    getExtensionRootEl
  } from '../util/index'
// 事件缓存
export const list = ref([])

// 查询事件
export const query = () => {
    queryEvents().then(res => {
        list.value = res
    })
}

// 获取流程内预设表单
