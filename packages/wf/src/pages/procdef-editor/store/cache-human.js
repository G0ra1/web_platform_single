import { ref } from 'vue'
import {
    queryExp
} from '../api/index'

import { get } from 'lodash'

// 返回值类型枚举
export const translateExpreParamVarType = v => get(expreParamVarType.find(d => d.value === v), 'label', '-')
export const expreParamVarType = [
    {
        value: 'user',
        label: '人员',
        component: 'ValueUsers'
    },
    {
        value: 'role',
        label: '角色',
        component: 'ValueRole'
    },
    {
        value: 'post',
        label: '岗位',
        component: 'ValuePost'
    },
    {
        value: 'duty',
        label: '职务',
        component: 'ValueDuty'
    },
    {
        value: 'dept',
        label: '部门',
        component: 'ValueDept'
    },
    {
        value: 'mechanism',
        label: '机构',
        component: 'ValueMechanism'
    },
    {
        value: 'builtinrole',
        label: '资源组',
        component: 'ValueInput'
    },
    {
        value: 'boolean',
        label: 'Boolean',
        component: 'ValueInput'
    },
    {
        value: 'string',
        label: 'String',
        component: 'ValueInput'
    },
    {
        value: 'integer',
        label: 'Integer',
        component: 'ValueInput'
    },
    {
        value: 'long',
        label: 'Long',
        component: 'ValueInput'
    },
    {
        value: 'double',
        label: 'Double',
        component: 'ValueInput'
    },
    {
        value: 'date',
        label: 'Date',
        component: 'ValueInput'
    },
    {
        value: 'list',
        label: 'List',
        component: 'ValueInput'
    }
]
// 根据值类型返回组件
export const getParamComponent = (type) => {
    const pvt = expreParamVarType.find(d => d.value === type)
    if (pvt) {
        return pvt.component
    } else {
        return ''
    }
} 


// 人员总体分类
// EMPL("empl","人员"),
// ROLE("role","角色"),
// POST("post","岗位"),
// DUTY("duty","职务"),
// DEPT("dept","部门"),
// ORGAN("organ","机构"),
// RESOURCE_GROUP("resource_group","资源组"),
// EXPRESSION("expression","表达式");
export const BizType = [
    {
        value: 'empl',
        label: '人员'
    },
    {
        value: 'role',
        label: '角色'
    },
    {
        value: 'post',
        label: '岗位'
    },
    {
        value: 'duty',
        label: '职务'
    },
    {
        value: 'dept',
        label: '部门'
    },
    {
        value: 'organ',
        label: '机构'
    },
    {
        value: 'resourceGroup',
        label: '资源组'
    },
    {
        value: 'expression',
        label: '表达式'
    }
]

// 默认表达式
const defaultExpression = [
    {
        "expreExpression": "wfUserExpression.innerExpression()",
        "expreName": "获取流程发起人",
        "resultType": null,
        "paramVarGenerics": null,
        "bizType": "innerExpression",
        "paramterList": [
            {
            "paramType": "STANDARD_EXPRE",
            "expreParamVarType": "string",
            "expreParamName": "innerUserExp",
            "expreParamDesc": "发起人",
            "expreParamValue":"start_user"
            }
        ]
    },
    {
        "expreExpression": "wfUserExpression.innerExpression()",
        "expreName": "获取流程上一个节点办理人",
        "resultType": null,
        "paramVarGenerics": null,
        "bizType": "innerExpression",
        "paramterList": [
            {
            "paramType": "STANDARD_EXPRE",
            "expreParamVarType": "string",
            "expreParamName": "innerUserExp",
            "expreParamDesc": "上一个节点办理人",
            "expreParamValue":"last_user"
            }
        ]
    }
]
// 表达式相关
export const isLoading = ref(false)
// 表达式列表
export const UserExpression = ref([])
// 表达式待添加
export const UserExpressionCache = ref([])

// 机构待添加
export const MechanismCache = ref(null)
// 部门待添加
export const DeptCache = ref(null)
// 人员待添加
export const UsersCache = ref(null)

// 查询事件
export const loadUserExpression = () => {
    isLoading.value = true
    return queryExp({
        page: {
            current: 1,
            size: 999
        }
    }).then(res => {
        // console.log('=======loadExpress======', res)
        isLoading.value = false
        UserExpression.value = [...defaultExpression, ...res]
    })
}

// human moddle 列表
export const newHumanExps = ref([])

// 加入
export const pushCacheHumanExp = (moddle) => {
    // switch (moddle.bizType) {
        
    // }

}
