import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash'

import type { Ref } from 'vue'

import { AbstractForm } from '@platform/main'

import { FormSchema, FormType } from './conf'

class FormModal extends AbstractForm {
    dataModel = ref<FormType>({});
    getSchema = async () => {
        // 从表单获取数据
        return FormSchema
    }
    setValue = (d: FormType) => {
        // 给表单设定数据
        this.dataModel.value = d
    }

    getValue = async () => {
        // 从表单获取数据
        return cloneDeep(this.dataModel.value)
    }

    constructor () {
        super()
    }
}


export {
    FormModal
}