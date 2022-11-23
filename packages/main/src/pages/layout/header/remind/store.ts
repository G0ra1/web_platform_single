import { ref } from 'vue'

import { queryMsg } from './api/index'

// 信息
export const MsgData = ref<Array<any>>([])

// 任务
export const TaskData = ref<Array<any>>([])

// count
export const Count = ref<number>(0) 

// isLoading
export const isLoading = ref<boolean>(false)
// 查询
export const init = () => {
    isLoading.value = true
    queryMsg({
        isRead: 0
    }).then(res => {
        console.log('-=res-=', res)
        Count.value = res.records.length
        TaskData.value = res.records.filter((d: any) => d.msgSource === 'WF')
        console.log('-=TaskData.value-=', TaskData.value)
    }).finally(() => {
        isLoading.value = false
    })
}