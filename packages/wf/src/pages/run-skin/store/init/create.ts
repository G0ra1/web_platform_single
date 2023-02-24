import { ref } from 'vue'
import { createFormByCamundaDefKey } from '../../api/index'
import { Db, request } from '@platform/main'

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

// 脚本
class UtilsInstance {
    Form: any
    Params: Array<any>
    constructor (Form: any, Params: Array<any>) {
        this.Form = Form
        this.Params = Params
    }
    Db = Db
    Message = (window as any).NaiveMessage
    // 获取表单数据
    GetFormValue () {
        return this.Form.getValue()
    }
    // 获取参数
    GetParams (pn = 0) {
        return this.Params[pn]
    }
    //设定表单数据
    SetFormValue (v: any) {
        this.Form.setValue(v)
    }
    RunScript (name: string = 'initScript') {
        return this.Form.runScript(name, this.Params)
    }
    SetButton () {

    }
    SetSpin () {

    }
    SetDialogText () {

    }
    DispatchEvent () {

    }
}

// 运行
export const run = async (
    {
        CamundaDefKey,
        isParamsChannel
    }: any
) => {
    // --------------- 这里加载流程定义
    let FormPageUrl = ''
    let stime = new Date().getTime()
    const getTime = (k?:string) => {
        const rt = `(${(new Date().getTime() - stime) / 1000}s)`
        stime = new Date().getTime()
        console.log(`---${k}--用时：${rt}秒----`)
        return rt
    }
    StateModalRef.value!.setMsg('loadProcdef', '加载流程定义...', 'loading')
    const IsSuccessProc = await createFormByCamundaDefKey(CamundaDefKey).then((res: any) => {
        // 写入流程信息

        WfSendData.value.camundaProcdefKey = CamundaDefKey
        WfSendData.value.bizDataList[0].formId = res.wfFormDefs[0].formId
        WfSendData.value.bizDataList[0].formName = res.wfFormDefs[0].formName
        // WfSendData.value.bizDataList[0].formNameCh = res.wfFormDefs[0].formNameCh
        WfSendData.value.bizDataList[0].isChange = 1
        WfSendData.value.bizDataList[0].domain = window.location.origin
        FormPageUrl = res.wfFormDefs[0].pageUrl
        WfSendData.value.reason = res.wfFormDefs[0].formNameCh
        // 获取字段权限数据
        // FieldRules.value = res.wfFormDefs[0].formVarDefVoList.map(d => d)
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

        return true
    }).catch((error: any) => {
        StateModalRef.value!.setMsg('loadProcdef', `加载流程定义失败`, 'error', error)
        console.error(error)
        return false
    })
    if (!IsSuccessProc) return false
    
    StateModalRef.value!.setMsg('loadProcdef', `流程定义加载完成(${getTime()})`, 'success')

 
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
    // 这里读取参数------------
    let formCache: {
        param?: string,
        params?: Array<any>,
        initScript?: (request: any, Utils: any) => any
    } | 'error' = 'error'
    if (isParamsChannel) { // 这里的isParamsChannel是自定义事件名
        StateModalRef.value!.setMsg('loadParams', '读取参数...', 'loading')
        //  --测试传参
        formCache = await new Promise((resolve, reject) => {

            // 获取上级window对象
            let win;
            if (window.opener) {
                win = window.opener
            } else if (window.parent && window.parent !== window) {
                win = window.parent
            }
            // 等待
            window.addEventListener('setParams', (d: any) => {
                // 这里获取 param params initScript
                resolve(d.detail)
            })

            if (win) {
                win.dispatchEvent(new CustomEvent(isParamsChannel, {
                    detail: window
                }))
            } else {
                resolve('error')
            }
            setTimeout(() => {
                resolve('error')
            }, 1000)
            // window.dispatchEvent(new CustomEvent('getParams'));
        })

        //
        // formCache = await new Promise((resolve, reject) => {
        //     window.addEventListener('setParams', (d: any) => {
        //         resolve(d.detail)
        //     })
        //     setTimeout(() => {
        //         resolve('error')
        //     }, 1000)
        //     window.dispatchEvent(new CustomEvent('getParams'));
        // })
        if (formCache === 'error') {
            console.warn('需要从功能按钮点击打开页面才可正常获取参数，刷新页面无效')
            StateModalRef.value!.setMsg('loadParams', '读取参数失败', 'error', '需要从功能按钮点击打开页面才可正常获取参数，刷新页面无效')
            // formCache = {} // 错误时重新赋值
        } else {
            StateModalRef.value!.setMsg('loadParams', `读取参数完成(${getTime()})`, 'success')
        }
        
    }
    console.log('-1======出现 加载表单页面 前=======')
    // ------------------ 加载表单页面
    StateModalRef.value!.setMsg('loadForm', '加载表单页面...', 'loading')
    
    console.log('0======出现 加载表单页面 后=======')
    // 
    // 加载表单
    const error = await FormFrameRef.value.loadForm(FormPageUrl).catch((e: any) => {
        console.log('--------loadForm 报错了--------')
        console.error(e)
    })
    if (error) {
        StateModalRef.value!.setMsg('loadForm', `加载表单失败`, 'error', error)
        return;
    }
    StateModalRef.value!.setMsg('loadForm', `成功加载表单页面(${getTime()})`, 'success')
    
    FormFrameRef.value.setRules(FieldRules.value)

    // 这里后期处理传入缓存参数
    if (formCache !== 'error') {
        // 这里调用脚本init
        formCache.initScript!(request, new UtilsInstance(FormFrameRef.value, formCache.params || []))
        // FormFrameRef.value.setValue(formCache.param)
    }

    return true
}