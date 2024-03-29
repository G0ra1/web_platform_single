import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash'
import type { Ref } from 'vue'
import { format } from "date-fns";
import { AbstractForm } from '@platform/main'

import { FormSchema, FormType } from './conf'

class FormModal extends AbstractForm {
    formRef = ref<FormInst>()
    dataModel = ref<FormType>({})
    rules = ref<FormRules>({})
    brules = ref<any>({})
    getSchema = async () => {
        // 从表单获取数据
        return FormSchema
    }
    initScript = async (params: any) => {
        
    }
    setValue = async (d: FormType) => {
        // 给表单设定数据
        if (d.tianbaoshijian) {
            d.tianbaoshijian = format(new Date(), "yyyy-MM-dd")
        }
        if(!d.detailList) {
            d.detailList = []
        }
        this.dataModel.value = d
    }

    getValue = async () => {
        // 从表单获取数据
        let data = cloneDeep(this.dataModel.value)
       
        // data.tianbaoshijian = format(new Date(data.tianbaoshijian), "yyyy-MM-dd")
        return data
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

    constructor() {
        super()
    }
}


export {
    FormModal
}