import { ref } from 'vue'

import { Utils, Cookies, Db } from '@platform/main'

import type { FormModalTypes } from '@platform/main'
type RulesType = FormModalTypes.RulesType

import InitModal from '../components/init-modal/index.vue'

import { run as createRun } from './init/create'
import { run as todoRun } from './init/todo'
import { run as doneRun } from './init/done'
import { run as draftRun } from './init/draft'
import { run as inDuplicateRun } from './init/in_duplicate'
import { run as outDuplicateRun } from './init/out_duplicate'
import { run as receiveNotifyRun } from './init/receive_notify'
import { run as sendNotifyRun } from './init/send_notify'

// 初始化模态 dom
export const StateModalRef = ref<typeof InitModal>()

// 表单 dom
export const FormFrameRef = ref<any>()

// 流程信息 dom
export const ProcdefInfoRef = ref<any>()

// 申请人信息 dom
export const UserInfoRef = ref<any>()

// 日志信息 dom
export const LogInfoRef = ref<any>()

// 操作权限 dom
export const ProcessActionRef = ref<any>()

// 字段权限
export const FieldRules = ref<any>()

// 设定字段权限
export const setFieldRules = (field: any) => {
    const rules: RulesType = {}
    field.forEach((d: any) => {
        rules[d.javaName] = {
            powerCode: d.powerCode,
            nameCh: d.nameCh,
            dbType: d.dbType
        }
    })
    FieldRules.value = rules
}

// 提交数据的规则
type WfSendDataInst = {
    camundaProcdefKey: string,
    reason?: string,
    [a: string]: any
}

// 主要提交数据
export const WfSendData = ref<WfSendDataInst>({

    camundaProcdefKey: '',
    reason: '',
    bizPriority: 'general',
    bizDataList: [{
        params: '{}'
    }]
})

// 其他数据缓存
// 表单
// export const WfFormData = ref<any>({})

// 公共

export const {
    Action: ParamAction,
    CamundaDefKey,
    id: ParamId,
    CacheType,
    isParamsChannel
} = Utils.parseQuery(window.location.search.substring(1))

export const init = async () => {
    // 开始
    StateModalRef.value!.startInit()

    switch (ParamAction) {
        
        case 'create':

            if (!await createRun(
                {
                    CamundaDefKey,
                    isParamsChannel
                }
            )) return;

            break;
        case 'draft':
            // 草稿
            if (!await draftRun(
                {
                    ParamId
                }
            )) return;
            break;
        case 'todo':
            // 草稿
            if (!await todoRun(
                {
                    ParamId
                }
            )) return;
            break;
        case 'done':
            // 草稿
            if (!await doneRun(
                {
                    ParamId
                }
            )) return;
            break;
        case 'my_draft':
            // 我发起的流程

            break;
        case 'receive_notify':
            // 收到的知会
            if (!await receiveNotifyRun(
                {
                    ParamId
                }
            )) return;
            break;
        case 'send_notify':
            // 发出的知会
            if (!await sendNotifyRun(
                {
                    ParamId
                }
            )) return;
            break;
        case 'forward':
            // 转办

            break;
        case 'in_duplicate':
            // 我收到的传阅
            if (!await inDuplicateRun(
                {
                    ParamId
                }
            )) return;
            
            break;
        case 'out_duplicate':
            // 我发出的传阅
            if (!await outDuplicateRun(
                {
                    ParamId
                }
            )) return;

            break;
    }
    
    // 结束
    StateModalRef.value!.completeInit()
}

// 完成回调
export const onComplete = (state: any) => {
    // 触发 
    if (window.opener) {
        window.opener.dispatchEvent(new CustomEvent('wfComplete', {
            detail: state
        }));
        window.close()
    } else if (window.top !== window && window.parent) {
        window.parent.dispatchEvent(new CustomEvent('wfComplete', {
            detail: state
        }));
    }
    // 使用:
    // window.addEventListener('wfComplete', () => {
    //     window.location.reload()
    // })
}