import { ref } from 'vue'
import {
} from '../api/index'

import { get } from 'lodash'
// 表达式相关
export const isLoading = ref(false)
// 从bpmn获取

export const buttons = [
    {
        value: 'wf_save',
        label: '保存'
    },
    {
        value: 'wf_handle',
        label: '办理'
    },
    {
        value: 'wf_back',
        label: '驳回'
    },
    
    {
        value: 'wf_revoke',
        label: '撤回'
    },

    {
        value: 'wf_del_process',
        label: '流程删除'
    },
    {
        value: 'wf_act_process',
        label: '流程激活'
    },


    
    {
        value: 'wf_end_process',
        label: '流程终止'
    },
    {
        value: 'wf_sus_process',
        label: '流程挂起'
    },

    {
        value: 'wf_turn_process',
        label: '转办'
    },
    {
        value: 'wf_urge_process',
        label: '催办'
    },
    {
        value: 'wf_notify_process',
        label: '知会'
    },
    {
        value: 'wf_send_read_process',
        label: '传阅'
    },
    {
        value: 'wf_countersign',
        label: '加签'
    },
    {
        value: 'wf_print',
        label: '打印'
    }
]
