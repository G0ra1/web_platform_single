import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash'
import type { Ref } from 'vue'
import { AbstractForm, Cookies } from '@platform/main'
import { format } from "date-fns";
// import Schema from './schema'


class FormModal extends AbstractForm {
    formRef = ref<FormInst>()
    dataModel = ref<any>({})
    rules = ref<FormRules>({})
    brules = ref<any>({})
    token = Cookies.get("token")
    tokenType = Cookies.get("tokenType")
    getSchema = async () => {
        // 从表单获取数据
        return {}
    }
    setValue = (d: any) => {
        // if(d.widgetSize) {
        //     d.widgetSize =  d.widgetSize.split(',')
        // } else {
        //     d.widgetSize = []
        // }
        d.labelCode = d.labelCode ? d.labelCode.split(',') : []
        d.label = d.label ? d.label.split(',') : []
        // 给表单设定数据
        console.log(d,'-==============')
        this.dataModel.value = cloneDeep(d)


    }

    getValue = async () => {
        let nDataModel = cloneDeep({...this.dataModel.value})
      
        // 从表单获取数据
        console.log(nDataModel,'-=--2------')

        return {...nDataModel,labelCode:nDataModel.labelCode.join(','),label:nDataModel.label.join(',')}
    }
  
    setRules = (v: object) => {
        // 设定表单权限
        this.rules.value = {}
        Object.entries(v).forEach(([key, val]: [string, {
            powerCode: string,
            nameCh: string,
        }]) => {
            // 区分子表
            if (key.includes('.')) {
            // 子表处理
            } else {
                // 处理必填
                if (val.powerCode === 'required') {
                    this.rules.value[key] = {
                        // type: 'number',
                        required: true,
                        trigger: ["blur", "input"],
                        message: `${val.nameCh}该属性为必填`,
                    }
                } else {
                    this.brules.value[key] = val.powerCode
                }
            }
        })
    }

    validate = async () => {
        let f: Array<string> = []
        await this.formRef.value?.validate().then(() => {
            f = []
        }).catch((e: Array<object>) => {
            f = e.map((m: any) => m[0].message)
        })
        return f
    }

    constructor () {
        super()
    }
}


export {
    FormModal
}