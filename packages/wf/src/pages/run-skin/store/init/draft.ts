import { ref } from 'vue'
import { Db } from '@platform/main'

import { getFormInfo, claim } from '../../api/index'
import {
    StateModalRef,
    FormFrameRef,
    UserInfoRef,
    ProcessActionRef,
    ProcdefInfoRef,
    WfSendData,
    FieldRules,
    setFieldRules
    
} from '../index'


// 运行
export const run = async (
    {
        ParamId
    }: any
) => {
    // 这里缺少签收
    // --------------- 这里加载流程定义
    let isCliamTime = false
    let FormPageUrl = '' // 表单url
    let FormData = {}
    StateModalRef.value!.setMsg('loadProcdef', '加载流程定义...', 'loading')
    const IsSuccessProc = await getFormInfo('draft', ParamId).then((res: any) => {
        const respFormDto = res.respFormDto
        console.log('======res=====', res)

        WfSendData.value = {
            bizPriority: respFormDto.bizPriority || 'general',
            camundaTaskId: respFormDto.camundaTaskId,
            camundaProcdefKey: respFormDto.camundaProcdefKey,
            reason: respFormDto.reason, // 跟标题并列
            bizKey: respFormDto.bizKey, // 不用管
            bizDataList: respFormDto.bizDataList
        }

        WfSendData.value.bizDataList[0].domain = window.location.origin
        FormPageUrl = res.wfFormDefs[0].pageUrl

        FormData = JSON.parse(respFormDto.bizDataList[0].params)

        setFieldRules(res.wfFormDefs[0].formVarDefVoList)
        // 设置流程信息
        ProcdefInfoRef.value!.setValue({
            procdefTypeName: res.procdefTypeName,
            procdefName: res.procdefName,
            priority: res.wfNodeDef.priority || '无',
            bizPriority: 'general',
        })

        // 设置按钮权限
        ProcessActionRef.value!.setRule(res.wfButtonDefs)

        // 获取是否签收

        isCliamTime = respFormDto.cliamTime
        return true
    }).catch((error: any) => {
        StateModalRef.value!.setMsg('loadProcdef', `加载流程定义失败`, 'error', error)
        return false
    })
    if (!IsSuccessProc) return false
    StateModalRef.value!.setMsg('loadProcdef', '流程定义加载完成', 'success')

    // ------------------ 获取用户信息
    StateModalRef.value!.setMsg('loadUser', '加载用户信息...', 'loading')
    await Db.get('userInfo').then((res: any) => {
        console.log('=======', res)
        // 赋值用户信息
        // 设置用户信息
        UserInfoRef.value!.setValue({
            createUserName: res.userNameCh,
            createUserParentDeptName: res.parentDeptName,
            createUserParentOrgName: res.parentOrgName
        })
    })
    StateModalRef.value!.setMsg('loadUser', '用户信息加载完成', 'success')

    // ------------------ 加载表单页面
    StateModalRef.value!.setMsg('loadForm', '加载表单页面...', 'loading')
    // 加载表单
    const error = await FormFrameRef.value.loadForm(FormPageUrl).catch((e: string) => e)
    if (error) {
        StateModalRef.value!.setMsg('loadForm', `加载表单失败`, 'error', error)
        return;
    }
    StateModalRef.value!.setMsg('loadForm', '成功加载表单页面', 'success')

    // 填充表单数据

    StateModalRef.value!.setMsg('loadFormData', '填充表单数据...', 'loading')

    //FormData
    console.log('=====FormData=====', FormData)
    FormFrameRef.value.setValue(FormData)

    StateModalRef.value!.setMsg('loadFormData', '填充表单数据完成', 'success')

    // FormFrameRef.value.setValue({
    //     sumBudgetExecuteAmount: 987
    // })
    FormFrameRef.value.setRules(FieldRules.value)




    return true
}