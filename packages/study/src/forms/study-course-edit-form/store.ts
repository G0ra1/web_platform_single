import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash'
import type { Ref } from 'vue'
import { AbstractForm, Cookies } from '@platform/main'
import { format } from "date-fns";
import { detail } from "./api/index";


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
        // 给表单设定数据
        this.dataModel.value = {...cloneDeep(d),labelCode:d.labelCode ? d.labelCode.split(',') : [],labelName:d.labelName ? d.labelName.split(',') : [],}


    }

    getValue = async () => {
        this.dataModel.value.applyType = this.dataModel.value.applyType ? this.dataModel.value.applyType : 0
        let nDataModel = cloneDeep(this.dataModel.value)
        if (nDataModel.labelName) {
          nDataModel.labelName = nDataModel.labelName.join(',')
          nDataModel.labelCode = nDataModel.labelCode.join(',')
        }
        // if(data.widgetSize) {
        //     data.widgetSize = data.widgetSize.join(',')
        // }
        // 从表单获取数据
        return nDataModel
    }
    initScript = async (params: any) => {
        //人员进场默认带过来所有
        // detail(
        //   {
           
        //   }
        // ).then((rep: Array<any>) => {
          
        // })
    
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