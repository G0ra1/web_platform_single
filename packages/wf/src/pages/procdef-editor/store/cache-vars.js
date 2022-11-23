import { ref } from 'vue'
import {
    queryExp
} from '../api/index'

import { get } from 'lodash'

import {
    getExtensionRootEls,
    getExtensionRootEl,
    createElement
} from '../util/index'

import {
    actionElBusinessObject
  } from "./bpmn"

import { Utils } from '@platform/main'

export const variablesInData = ref()

// export const Vars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
// export const HumanExps = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
// <netwisd:var formVarId="year" actionScope="0" varId="1365150512730607618" formVarName="年度" javaType="string" isMoreRow="0" />
// <netwisd:var javaName="isBdugetOut" actionScope="0" modelFieldId="1356527518577057815" nameCh="是否预算外" javaType="integer" isMoreRow="0" />
const setVar = (param) => {
    const Vars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
    // 查询Vars中是否含有
    const Var = (Vars.values || []).find(d => param.expreParamValueId === `${d.formId}.${d.modelFieldId}`)
    // 当没有var时
    // if (!Vars.values || !Vars.values.length) {
    if (!Var) {
        if (!Vars.values) { Vars.values = [] }
        const [ formId, modelFieldId ] = param.expreParamValueId.split('.')
        const [ formName, ...javaName ] = param.expreParamValue.split('.')
        Vars.values.push(createElement('netwisd:Var', {
            formName,
            javaName: javaName.join('.'),
            expreJavaName: param.expreParamValue,
            actionScope: '0',
            modelFieldId, // 字段ID
            formId, // 表单ID
            nameCh: param.expreParamValueText,
            // javaType: param.expreParamVarType,
            isMoreRow: '0',
            isOrm: '0'
        }))
    }
    
}

// 同步当前变量
export const syncVars = () => {
    const Vars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
    Vars.values = []
    const HumanExps = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:HumanExps')
    // HumanExps
    if (HumanExps.values && HumanExps.values.length) {
        HumanExps.values.forEach(humanExp => {
            // 遍历参数
            if (humanExp.values) {
                humanExp.values.filter(param => {
                    if (param.expreParamSource === 'form_field') {
                        // 发现表单字段参数
                        setVar(param)
                    }
                    
                })
            }
        })
    } else {
        // 清空
        Vars.values = []
    }
}

// 同步SequenceFlow变量
export const syncSequenceFlowVars = (exp) => {
    const Vars = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Vars')
    Vars.values = []

    const VarsMap = {}
    Utils.recursion([exp], {
        callBack: (item) => {
            if (item.type === 'exp' && item.cache.length) {
                item.cache.filter(d => d.expreParamSource === 'form_field').forEach(d => {
                    
                    const [ formId, modelFieldId ] = d.expreParamValueId.split('.')
                    const [ formName, ...javaName ] = d.expreParamValue.split('.')
                    VarsMap[d.expreParamValue] = createElement('netwisd:Var', {
                        formName,
                        javaName: javaName.join('.'),
                        expreJavaName: d.expreParamValue,
                        actionScope: '0',
                        modelFieldId, // 字段ID
                        formId, // 表单ID
                        nameCh: d.expreParamValueText,
                        // javaType: param.expreParamVarType,
                        isMoreRow: '0',
                        isOrm: '0'
                    })
                })
            }
            return 1
        }
    })

    //
    Vars.values = Object.values(VarsMap)
}