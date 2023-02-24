import { ref } from 'vue'
import { Db } from '@platform/main'
import { getFormInfo, claim } from '../../api/index'
import {
    StateModalRef,
    FormFrameRef,
    UserInfoRef,
    LogInfoRef,
    ProcessActionRef,
    ProcdefInfoRef,
    WfSendData,
    FieldRules,
    setFieldRules,
    RespFormDto,
    FormDataSha256
} from '../index'

import sha256 from 'js-sha256'

// 运行
export const run = async (
    {
        ParamId
    }: any
) => {
    // 这里缺少签收
    // --------------- 这里加载流程定义
    
    let stime = new Date().getTime()
    const getTime = (k?:string) => {
        const rt = `(${(new Date().getTime() - stime) / 1000}s)`
        stime = new Date().getTime()
        console.log(`---${k}--用时：${rt}秒----`)
        return rt
    }
    let isCliamTime = false
    let FormPageUrl = '' // 表单url
    let FormData = {}
    StateModalRef.value!.setMsg('loadProcdef', '加载流程定义...', 'loading')
    const IsSuccessProc = await getFormInfo('todo', ParamId).then((res: any) => {
        RespFormDto.value = res.respFormDto
        const respFormDto = res.respFormDto
        console.log('======res=====', res)
        WfSendData.value = {
            bizPriority: respFormDto.bizPriority || 'general',
            camundaTaskId: respFormDto.camundaTaskId,
            camundaProcdefId: respFormDto.camundaProcdefId,
            camundaProcinsId: respFormDto.camundaProcinsId,
            camundaProcdefKey: respFormDto.camundaProcdefKey,
            reason: respFormDto.reason, // 跟标题并列
            bizKey: respFormDto.bizKey, // 不用管
            bizDataList: respFormDto.bizDataList
        }

        WfSendData.value.bizDataList[0].domain = window.location.origin
        FormPageUrl = res.wfFormDefs[0].pageUrl

        FormData = JSON.parse(respFormDto.bizDataList[0].params) || {}

        setFieldRules(res.wfFormDefs[0].formVarDefVoList || [])
        // 设置流程信息
        // ProcdefInfoRef.value!.setValue({
        //     procdefTypeName: res.procdefTypeName,
        //     procdefName: res.procdefName,
        //     priority: res.wfNodeDef.priority || '无',
        //     bizPriority: 'general',
        // })

        // 设置按钮权限
        ProcessActionRef.value!.setRule(res.wfButtonDefs)
        // 获取是否签收

        isCliamTime = respFormDto.cliamTime
        return true
    }).catch((error: any) => {
        console.error(error)
        StateModalRef.value!.setMsg('loadProcdef', `加载流程定义失败`, 'error', error)
        return false
    })
    if (!IsSuccessProc) return false
    StateModalRef.value!.setMsg('loadProcdef', `流程定义加载完成(${getTime('流程定义加载')})`, 'success')

    // 签收
    if (!isCliamTime) {
        
        StateModalRef.value!.setMsg('claim', '开始签收...', 'loading')
        const isClaimSuccess = claim(WfSendData.value.camundaTaskId).then(r => {
            return true
        }).catch(error => {
            StateModalRef.value!.setMsg('claim', '签收失败', 'error', error)
            return false
        })
        if (!isClaimSuccess) return
        StateModalRef.value!.setMsg('claim', `签收完成(${getTime('签收')})`, 'success')
    }
    //

    // ------------------ 获取用户信息
    // StateModalRef.value!.setMsg('loadUser', '加载用户信息...', 'loading')
    // await Db.get('userInfo').then((res: any) => {
    //     console.log('=======', res)
    //     // 赋值用户信息
    //     // 设置用户信息
    //     UserInfoRef.value!.setValue({
    //         createUserName: res.userNameCh,
    //         createUserParentDeptName: res.parentDeptName,
    //         createUserParentOrgName: res.parentOrgName
    //     })
    // })
    // StateModalRef.value!.setMsg('loadUser', '用户信息加载完成', 'success')

    // ------------------ 加载表单页面
    StateModalRef.value!.setMsg('loadForm', '加载表单页面...', 'loading')
    // 加载表单
    const error = await FormFrameRef.value.loadForm(FormPageUrl).catch((e: string) => e)
    if (error) {
        StateModalRef.value!.setMsg('loadForm', `加载表单失败`, 'error', error)
        return;
    }
    StateModalRef.value!.setMsg('loadForm', `成功加载表单页面(${getTime('加载表单页面')})`, 'success')

    // 填充表单数据

    StateModalRef.value!.setMsg('loadFormData', '填充表单数据...', 'loading')

    //FormData
    FormFrameRef.value.setValue(FormData)

    StateModalRef.value!.setMsg('loadFormData', `填充表单数据完成(${getTime('填充表单数据')})`, 'success')

    // 加载日志
    
    // StateModalRef.value!.setMsg('loadLog', '加载表单日志...', 'loading')
    // await LogInfoRef.value!.setCamundaProcinsId(WfSendData.value.camundaProcinsId)
    // StateModalRef.value!.setMsg('loadLog', '成功表单日志', 'success')

    // FormFrameRef.value.setValue({
    //     sumBudgetExecuteAmount: 987
    // })
    await FormFrameRef.value.getValue().then((r: any) => {
        // console.log('=sha256=FormData=', (sha256 as any)(JSON.stringify(FormData)))
        // console.log('=sha256=getValue1=',FormData, r)
        // console.log('=sha256=getValue=', (sha256 as any)(JSON.stringify(r)))
        FormDataSha256.value = (sha256 as any)(JSON.stringify(r))
    })
    FormFrameRef.value.setRules(FieldRules.value)

    return true
}