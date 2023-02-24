import { ref } from 'vue'
import {
    RespFormDto,
    onComplete
} from '../../../store/index'

import { suspendProcess, activateProcess, endProcess, deleteProcess } from '../../../api/index'

export const nwDialogRef = ref<any>()

// 流程删除
export const handleDeleteProcess = () => {
    console.log('RespFormDto', RespFormDto)
    nwDialogRef.value.show('提示', '确定删除该流程？', () => {

        deleteProcess(
            RespFormDto.value.camundaProcinsId,
            RespFormDto.value.camundaProcdefId,
            RespFormDto.value.camundaTaskId,
        ).then(r => {
            (window as any).NaiveMessage.success('流程删除成功, 3秒后关闭页面')
            setTimeout(() => {
                onComplete('')
            }, 3000)
        })
    })
}

// 流程终止
export const handleEndProcess = () => {
    console.log('RespFormDto', RespFormDto)
    nwDialogRef.value.show('提示', '确定终止该流程？', () => {

        endProcess(
            RespFormDto.value.camundaProcinsId,
            RespFormDto.value.camundaProcdefId,
            RespFormDto.value.camundaTaskId,
        ).then(r => {
            (window as any).NaiveMessage.success('流程终止成功, 3秒后关闭页面')
            setTimeout(() => {
                onComplete('')
            }, 3000)
        })
    })
}
// 流程挂起
export const handleSuspendProcess = () => {
    console.log('RespFormDto', RespFormDto)
    nwDialogRef.value.show('提示', '确定挂起该流程？', () => {

        suspendProcess(
            RespFormDto.value.camundaProcinsId,
            RespFormDto.value.camundaProcdefId,
            RespFormDto.value.camundaTaskId,
        ).then(r => {
            (window as any).NaiveMessage.success('流程挂起成功, 3秒后关闭页面')
            setTimeout(() => {
                onComplete('')
            }, 3000)
        })
    })
}
// 流程激活
export const handleActivateProcess = () => {
    console.log('RespFormDto', RespFormDto)
    nwDialogRef.value.show('提示', '确定激活该流程？', () => {

        activateProcess(
            RespFormDto.value.camundaProcinsId,
            RespFormDto.value.camundaProcdefId,
            RespFormDto.value.camundaTaskId,
        ).then(r => {
            (window as any).NaiveMessage.success('流程激活成功, 3秒后关闭页面')
            setTimeout(() => {
                onComplete('')
            }, 3000)
        })
    })
}