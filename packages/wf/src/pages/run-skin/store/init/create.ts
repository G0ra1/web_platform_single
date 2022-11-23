import { ref } from 'vue'
import { createFormByCamundaDefKey } from '../../api/index'
import { Db } from '@platform/main'

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
        CamundaDefKey,
        isParamsChannel
    }: any
) => {
    // --------------- 这里加载流程定义
    let FormPageUrl = ''
    StateModalRef.value!.setMsg('loadProcdef', '加载流程定义...', 'loading')
    const IsSuccessProc = await createFormByCamundaDefKey(CamundaDefKey).then((res: any) => {
        // 写入流程信息

        WfSendData.value.camundaProcdefKey = CamundaDefKey
        WfSendData.value.bizDataList[0].formId = res.wfFormDefs[0].formId
        // WfSendData.value.bizDataList[0].formName = res.wfFormDefs[0].formName
        // WfSendData.value.bizDataList[0].formNameCh = res.wfFormDefs[0].formNameCh
        WfSendData.value.bizDataList[0].isChange = 1
        WfSendData.value.bizDataList[0].domain = window.location.origin
        FormPageUrl = res.wfFormDefs[0].pageUrl
        WfSendData.value.reason = res.wfFormDefs[0].formNameCh
        // 获取字段权限数据
        // FieldRules.value = res.wfFormDefs[0].formVarDefVoList.map(d => d)
        setFieldRules(res.wfFormDefs[0].formVarDefVoList || [])
        // 设置流程信息
        ProcdefInfoRef.value!.setValue({
            procdefTypeName: res.procdefTypeName,
            procdefName: res.procdefName,
            priority: res.wfNodeDef.priority || '无',
            bizPriority: 'general',
        })

        // 设置按钮权限
        ProcessActionRef.value!.setRule(res.wfButtonDefs)

        return true
    }).catch((error: any) => {
        StateModalRef.value!.setMsg('loadProcdef', `加载流程定义失败`, 'error', error)
        console.error(error)
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
    // 这里读取参数------------
    let formCache = {}
    if (isParamsChannel === '1') {
        StateModalRef.value!.setMsg('loadParams', '读取参数...', 'loading')

        formCache = await new Promise((resolve, reject) => {
            window.addEventListener('setParams', (d: any) => {
                resolve(d.detail)
            })
            setTimeout(() => {
                resolve('error')
            }, 1000)
            window.dispatchEvent(new CustomEvent('getParams'));
        })
        if (formCache === 'error') {
            console.warn('需要从功能按钮点击打开页面才可正常获取参数，刷新页面无效')
            StateModalRef.value!.setMsg('loadParams', '读取参数失败', 'error', '需要从功能按钮点击打开页面才可正常获取参数，刷新页面无效')
        } else {
            StateModalRef.value!.setMsg('loadParams', '读取参数完成', 'success')
        }
        
    }

    // ------------------ 加载表单页面
    StateModalRef.value!.setMsg('loadForm', '加载表单页面...', 'loading')
    
    // 
    // 加载表单
    const error = await FormFrameRef.value.loadForm(FormPageUrl).catch((e: string) => e)
    if (error) {
        StateModalRef.value!.setMsg('loadForm', `加载表单失败`, 'error', error)
        return;
    }
    StateModalRef.value!.setMsg('loadForm', '成功加载表单页面', 'success')
    
    FormFrameRef.value.setRules(FieldRules.value)

    // 这里后期处理传入缓存参数
    FormFrameRef.value.setValue(formCache)

    return true
}