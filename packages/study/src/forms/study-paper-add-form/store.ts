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
      d.typeCode = d.typeCode ? d.typeCode.split(',') : []
      d.typeName = d.typeName ? d.typeName.split(',') : []
      d.paperType = d.paperType ? d.paperType.split(',') : []
        // if(d.widgetSize) {
        //     d.widgetSize =  d.widgetSize.split(',')
        // } else {
        //     d.widgetSize = []
        // }
        // 给表单设定数据
        this.dataModel.value =cloneDeep(d)


    }

    getValue = async () => {
      this.dataModel.value.applyType = this.dataModel.value.applyType ? this.dataModel.value.applyType : 0
      let nDataModel = cloneDeep({...this.dataModel.value})
      if (nDataModel.typeName) {
        nDataModel.typeName = nDataModel.typeName.join(',')
        nDataModel.typeCode = nDataModel.typeCode.join(',')
      }
      if(nDataModel.paperType) {
        nDataModel.paperType = nDataModel.paperType.join(',')
      }
      
        // if(data.widgetSize) {
        //     data.widgetSize = data.widgetSize.join(',')
        // }
        // 从表单获取数据
        return nDataModel
    }

    setRules = (d: object) => {
        // 设定表单权限
        this.rules.value = {}
        Object.entries(d).forEach(([key, val]: [string, {
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