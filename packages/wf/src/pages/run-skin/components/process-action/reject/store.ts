import { ref } from 'vue'

import {
    StateModalRef,
    FormFrameRef,
    ParamAction,
    WfSendData,
    onComplete
} from '../../../store/index'

import {
    timeFormat as d3TimeFormat,
    timeParse as d3TimeParse
} from 'd3'

import { queryRejectNode, reject } from '../../../api/index'

const timeFormat = d3TimeFormat('%Y-%m-%d %H:%M:%S')

// 驳回节点
export const NodeList = ref([])

// 驳回的选择节点
export const ActiveNode = ref<any>(null)

// 意见
export const OpinionText = ref<string>('不同意')

// 弹出框显隐
export const handleVisible = ref<boolean>(false)

export const sendSubmit = async () => {

    let submitReject;
    // reject({

    // }).then(r => {

    // })
    
    StateModalRef.value!.startInit('提交驳回中...')

    // ActiveNoded 当前选定的节点
    console.log('====ActiveNode.value====', ActiveNode.value)
    const {
        nodeId: targetActivityId,
        nodeName: targetActivityName,
        userName
    } = ActiveNode.value
    
    submitReject = {
        camundaTaskId:  WfSendData.value.camundaTaskId,
        targetActivityId,
        targetActivityName,
        wfAssignee: [ userName ],
        bizDataList: WfSendData.value.bizDataList,
        wfLocalIsAgree: 0,
        wfLocalDescription: OpinionText.value || '不同意'
    }

    StateModalRef.value!.setMsg('send', '正在提交驳回...', 'loading')
    const IsSuccessSend = await reject(submitReject).then((r: any) => {
        console.log('=====send===', r)
        return true
    }).catch(error => {
        StateModalRef.value!.setMsg('send', '驳回失败', 'error', error)
        return false
    })
    if (!IsSuccessSend) return
    StateModalRef.value!.setMsg('send', '驳回成功', 'success')
    StateModalRef.value!.completeInit()
    handleVisible.value = false

    onComplete('')
}

// 
export const sendHandle = async () => {
    const IsSuccessSend = await queryRejectNode(WfSendData.value.camundaProcinsId).then(r => {
        console.log('-======rrrr=====', r)
        // 赋值Node 和user
        // 这里要去除重复用户
        // r.splice(-1,1)
        NodeList.value = r //

        return true
    }).catch(error => {
        // StateModalRef.value!.setMsg('send', '保存数据失败', 'error', error)
        return false
    })

    console.log('-====NodeList.value======', NodeList.value)
    // 弹出办理窗口
    handleVisible.value = true
}