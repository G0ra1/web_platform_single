import { ref } from 'vue'

import { handle, submit } from '../../../api/index'

import {
    StateModalRef,
    FormFrameRef,
    ParamAction,
    WfSendData,
    onComplete,
    FormDataSha256
} from '../../../store/index'

import {
    timeFormat as d3TimeFormat,
    timeParse as d3TimeParse
} from 'd3'

import sha256 from 'js-sha256'

const timeFormat = d3TimeFormat('%Y-%m-%d %H:%M:%S')

// 弹出框显隐
export const handleVisible = ref<boolean>(false)

// 提交节点
export const NodeList = ref<Array<any>>([])

// 选择的节点
export const ActiveNode = ref<any>(null)

// 意见文字
export const OpinionText = ref<string>('同意')

// 传阅
export const CircularizeUsers = ref<Array<any>>([])
// 知会
export const NotifyUsers = ref<Array<any>>([])

// 获取
export const getBpmnNodeType = (v: number) => BpmnNodeType.value.find(d => d.value === v)
export const BpmnNodeType = ref([
    {
        icon: 'bpmn-icon-start-event-none',
        tagName: 'bpmn:StartEvent',
        typeName: '开始节点',
        value: 0
    },
    {
        icon: 'bpmn-icon-user-task',
        tagName: 'bpmn:UserTask',
        typeName: '用户节点',
        value: 1
    },
    // {
    //     icon: '',
    //     tagName: '',
    //     typeName: '服务节点',
    //     value: 2
    // },
    {
        icon: 'bpmn-icon-end-event-none',
        tagName: 'bpmn:EndEvent',
        typeName: '结束节点',
        value: 3
    },
    {
        icon: 'bpmn-icon-gateway-xor',
        tagName: 'bpmn:ExclusiveGateway',
        typeName: '排它网关',
        value: 4
    },
    {
        icon: 'bpmn-icon-user-task',
        tagName: 'bpmn:UserTask',
        typeName: '会签多任务节点',
        value: 5
    },
    {
        icon: 'bpmn-icon-call-activity',
        tagName: 'bpmn:CallActivity',
        typeName: '外部子流程',
        value: 8
    },
])

// 办理请求
export const sendHandle = async () => {
    
    let stime = new Date().getTime()
    const getTime = (k?:string) => {
        const rt = `(${(new Date().getTime() - stime) / 1000}s)`
        stime = new Date().getTime()
        console.log(`---${k}--用时：${rt}秒----`)
        return rt
    }

    // 弹出办理窗口

    StateModalRef.value!.startInit('保存中...')
    
    // 验证表单
    
    StateModalRef.value!.setMsg('validate', '验证表单数据...', 'loading')
    const vflag = await FormFrameRef.value.validate().then((r: any) => {
        if (r.length) {
            StateModalRef.value!.setMsg('validate', '验证表单数据失败', 'error')
            StateModalRef.value!.completeInit()
            return false
        } else {
            return true
        }
    })
    if (!vflag) return;
    StateModalRef.value!.setMsg('validate', `验证表单数据成功(${getTime('验证表单数据')})`, 'success')
    
    
    StateModalRef.value!.setMsg('getValue', '获取表单数据...', 'loading')
    let RFormDataSha256 = ''
    const formData = await FormFrameRef.value.getValue().then((r: any) => {
        RFormDataSha256 = (sha256 as any)(JSON.stringify(r))
        return r
    })

    // FormDataSha256
    // RFormDataSha256 === FormDataSha256.value

    
    StateModalRef.value!.setMsg('getValue', `获取表单数据成功(${getTime('获取表单数据')})`, 'success')

    //
    // console.log('-=-=-表单数据=----', formData)
    // alert(RFormDataSha256 !== FormDataSha256.value)
    WfSendData.value.bizDataList[0].isChange = RFormDataSha256 !== FormDataSha256.value

    // console.log('====paramsparams=====', JSON.parse(WfSendData.value.bizDataList[0].params))
    // console.log('====paramsparams=====', formData)
    WfSendData.value.bizDataList[0].params = JSON.stringify({
        ...JSON.parse(WfSendData.value.bizDataList[0].params),
        ...formData
    })
    // WfSendData.value.bizDataList[0].params = JSON.stringify(formData)
    
    WfSendData.value.applyTime = timeFormat(new Date())
    // \

    StateModalRef.value!.setMsg('send', '正在提交数据...', 'loading')
    const IsSuccessSend = await handle(WfSendData.value).then(r => {
        WfSendData.value.camundaTaskId = r.camundaTaskId
        // 赋值Node 和user
        NodeList.value = r.users.map((d: any) => {
            const { userList, ...oth } = d
            if (userList.length === 1) {
                userList[0]._isSelect = true
            }
            return {
            ...oth,
            userList,
            nodeType: getBpmnNodeType(d.nextcamundaNodeType)
        }})
        // 这里要回写 bizDataList 数据
        // console.log('====rr handle rr=====', JSON.parse(r.params))
        if (r.forms && r.forms[0]) {
            const params = {
                ...JSON.parse(WfSendData.value.bizDataList[0].params),
                ...JSON.parse(r.forms[0].params)
            }
            // console.log('======params=====', params)
            FormFrameRef.value.setValue(params)
            WfSendData.value.bizDataList[0].params = JSON.stringify(params)

        }
        // 默认第一个
        ActiveNode.value = NodeList.value[0]
        return true
    }).catch(error => {
        StateModalRef.value!.setMsg('send', '保存数据失败', 'error', error)
        return false
    })
    if (!IsSuccessSend) return
    StateModalRef.value!.setMsg('send', `保存数据成功...(${getTime('保存数据')})`, 'success')
    StateModalRef.value!.completeInit()
    // 弹出办理窗口
    handleVisible.value = true
}

// 办理提交
export const sendSubmit = async () => {
    
    StateModalRef.value!.startInit('提交办理中...')

    // ActiveNoded 当前选定的节点

    const {
        camundaTaskId,
        nextCamundaNodeId,
        nextCamundaNodeName,
        userList,
        submitType
    } = ActiveNode.value
    
    // StateModalRef.value!.setMsg('getValue', '获取表单数据...', 'loading')
    // const formData = await FormFrameRef.value.getValue().then((r: any) => {
       
    //     return r
    // })
    // StateModalRef.value!.setMsg('getValue', '获取表单数据成功', 'success')

    // console.log('-=-=-表单数据=----', formData)
    // WfSendData.value.bizDataList[0].params = JSON.stringify(formData)
    
    // WfSendData.value.applyTime = timeFormat(new Date())
    // 

    // 赋值提交节点数据
    WfSendData.value.camundaTaskId = camundaTaskId
    WfSendData.value.targetActivityId = nextCamundaNodeId
    WfSendData.value.targetActivityName = nextCamundaNodeName
    WfSendData.value.submitType = submitType
    // 赋值选择的提交用户
    WfSendData.value.wfAssignee = userList.filter((d: any) => d._isSelect).map((d: any) => d.userName)
    
    // 赋值意见 同意与不同意
    WfSendData.value.wfLocalIsAgree = 1

    WfSendData.value.wfLocalDescription = OpinionText.value

    // 传阅
    WfSendData.value.wfDuplicateList = CircularizeUsers.value.map(d => d.userName)
    // 知会
    WfSendData.value.wfNotifyList = NotifyUsers.value.map(d => d.userName)
    // if (!sendData.value.wfLocalDescription) {
    //     sendData.value.wfLocalDescription = sendData.value.wfLocalIsAgree ? '同意' : '不同意'
    // }
    // console.log('-=-=-senddata=----', WfSendData.value)

    StateModalRef.value!.setMsg('send', '正在提交办理...', 'loading')
    const IsSuccessSend = await submit(WfSendData.value).then(r => {
        console.log('=====send===', r)
        return true
    }).catch(error => {
        StateModalRef.value!.setMsg('send', '保存数据失败', 'error', error)
        return false
    })
    if (!IsSuccessSend) return
    StateModalRef.value!.setMsg('send', '办理成功', 'success')
    StateModalRef.value!.completeInit()
    handleVisible.value = false
    onComplete('')
}
