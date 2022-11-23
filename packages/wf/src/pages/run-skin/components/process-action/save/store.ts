import { ref } from 'vue'

import { save } from '../../../api/index'

import {
    StateModalRef,
    FormFrameRef,
    ParamAction,
    WfSendData,
} from '../../../store/index'

import {
    timeFormat as d3TimeFormat,
    timeParse as d3TimeParse
} from 'd3'

const timeFormat = d3TimeFormat('%Y-%m-%d %H:%M:%S')

export const sendSave = async () => {
    
    StateModalRef.value!.startInit('保存中...')

    if (ParamAction === 'create' || ParamAction === 'draft') {
        // 这里获取reason
    }
    
    StateModalRef.value!.setMsg('getValue', '获取表单数据...', 'loading')
    const formData = await FormFrameRef.value.getValue().then((r: any) => {
       
        return r
    })
    StateModalRef.value!.setMsg('getValue', '获取表单数据成功', 'success')

    console.log('-=-=-表单数据=----', formData)
    // 这里要进行覆盖
    WfSendData.value.bizDataList[0].params = JSON.stringify({
        ...JSON.parse(WfSendData.value.bizDataList[0].params),
        ...formData
    })
    
    WfSendData.value.applyTime = timeFormat(new Date())
    // 
    console.log('-=-=-senddata=----', WfSendData.value)

    StateModalRef.value!.setMsg('send', '正在提交数据...', 'loading')
    const IsSuccessSend = await save(WfSendData.value).then(r => {
        // console.log('=====send===', r)
        return true
    }).catch(error => {
        StateModalRef.value!.setMsg('send', '保存数据失败', 'error', error)
        return false
    })
    if (!IsSuccessSend) return
    StateModalRef.value!.setMsg('send', '保存数据成功...', 'success')
    StateModalRef.value!.completeInit()
}