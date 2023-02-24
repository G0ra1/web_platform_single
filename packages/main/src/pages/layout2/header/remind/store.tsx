import { ref, h } from 'vue'

import { queryMsg } from './api/index'

import {
    timeFormat as d3TimeFormat
} from 'd3'
const timeFormat = d3TimeFormat('%Y-%m-%d %H:%M:%S')

// 流程运行壳子
export const WfRunModalRef = ref<any>()

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
    loadMsg()
    // window.removeEventListener('WsOnMessage', wsOnMessage)
    window.addEventListener('WsOnMessage', (d: any) => {
        // alert('收到信息')
        console.log('=====ddd=evt=', d)
        const detail = d.detail
        loadMsg();
        (window as any).NaiveNotification.create({
            duration: 10000,
            title: detail.msgTitle,
            content: () => {
                return [<div>{detail.msgContent}</div>]
            },
            meta: `${timeFormat(new Date(detail.sendTime))} ${detail.sendUserName}`
        })
    })
}
// 查询信息
export const loadMsg = () => {
    isLoading.value = true
    queryMsg({
        isRead: 0
    }).then(res => {
        Count.value = res.records.length
        MsgData.value = res.records

        // TaskData.value = res.records.filter((d: any) => d.msgSource === 'WF')
        // 这里混合存储task 和msg
        
        // TaskData.value = res.records.filter((d: any) => d.msgType === 'task')
        // MsgData.value = res.records.filter((d: any) => d.msgType === 'business')

    }).finally(() => {
        isLoading.value = false
    })
}