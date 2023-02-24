import { ref } from 'vue'

import { cloneDeep } from "lodash";
import { AbstractForm } from "@platform/main";
export const loadPage = async () => {

}

class FormRender extends AbstractForm {
    // 页面模型
    pageConfig = ref<any>()

    // 变量模型

    // 表单数据
    dataModel = ref<any>({});
    getSchema = async () => {
        // 从表单获取数据
        return {};
    };
    setValue = (d: any) => {
        // 给表单设定数据
        this.dataModel.value = d;
      };
    
    getValue = async () => {
    // 从表单获取数据
    return cloneDeep(this.dataModel.value);
    };

    setRules = (v: any) => {
    super.setRules(v)
    };

    constructor () {
        super()
    }
    
}