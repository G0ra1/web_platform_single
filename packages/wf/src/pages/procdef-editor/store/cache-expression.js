import { ref, watch } from 'vue'
import {
} from '../api/index'
import { actionElBusinessObject } from './bpmn'
import { get } from 'lodash'

// 当前链接id
export const getSequenceFlowID = () => actionElBusinessObject.value.id
// 递归获取表达式code
export const expressionFun = (data, type = 'code') => {
    // 
    if (data.type === 'group') {
      const l = data.children.map(d => {
        return expressionFun(d, type)
      })
      return `(${l.join(' ')})`
    } else {
      return type === 'code' ? data.code : data.text
    }
  }

// 递归获取表达式code
export const treeFun = (data, type = 'code') => {
if (data.type === 5) {
    // 表达式
    const l = data.children.map(d => {
    return expressionFun(d, type)
    })
    return `(${l.join(' ')})`
} else {
    // 逻辑运算
    let logic = ''
    if (data.type === 2) {
    // 并集 or
    logic = ' || '
    } else {
    // 交集 and
    logic = ' && '
    }
    if (data.children) {
    const l = data.children.map(d => {
        return treeFun(d, type)
    })
    return `(${l.join(logic)})`
    } else {
    return 1
    }
}
}
export const graphRef = ref(null)
// 表达式树数据
export const expressionCache = ref({})

// 当前编辑的表达式节点
export const editingExp = ref(null)

// 这里当 editingExp 改变时 但是不包括取消选定如删除
watch(editingExp, (d) => {
    d && graphRef.value.drawn()
}, {deep: true})
// 当前编辑的表达式元素(所在的group)
export const editingExpElements = ref(null)

// 当前编辑的公式光标位置
export const editingExpElementIndex = ref(-1)

// 当前正在设置参数的表达式弹出
export const actionExpParamsRef = ref(null)

// 重置当前编辑节点
export const clearEditing = () => {
    editingExp.value = null
    editingExpElements.value = null
    editingExpElementIndex.value = -1
    actionExpParamsRef.value = null
}
// 翻译 返回值类型
export const translateExpreReturnType = v => get(expreReturnType.find(d => d.value === v), 'label', '-')
export const expreReturnType = [
    {
        value: -1,
        label: 'UserExpressionVO'
    },
    {
        value: 0,
        label: '标准(内置)'
    },
    {
        value: 1,
        label: 'Boolean'
    },
    {
        value: 2,
        label: 'String'
    },
    {
        value: 3,
        label: 'Integer'
    },
    {
        value: 4,
        label: 'Long'
    },
    {
        value: 5,
        label: 'Double'
    },
    {
        value: 6,
        label: 'List'
    }
]
export const translateParamVarType = v => get(paramVarType.find(d => d.value === v), 'label', '-')

export const paramVarType = [{
    value: 'boolean',
    label: "Boolean"
},
{
    value: 'string',
    label: "String"
},
{
    value: 'Integer',
    label: "Integer"
},
{
    value: 'long',
    label: "Long"
},
{
    value: 'double',
    label: "Double"
},
{
    value: 'date',
    label: "Date"
},
{
    value: 'list',
    label: "List"
}]