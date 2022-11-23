import { ref, computed, h } from "vue";

import type { FormRules, FormInst } from "naive-ui";

import { cloneDeep } from "lodash";

// 引入表格相关类型
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

import { AbstractForm } from "@platform/main";

import type { FormModalTypes } from '@platform/main'
type RulesType = FormModalTypes.RulesType

import { FormSchema } from "./conf";

import type { FormType, TaskInfoDetail } from "./conf";

class FormModal extends AbstractForm {
  formRef = ref<FormInst>();
  rules = ref<FormRules>({
    'taskTitle': {
      type: 'string',
      required: true,
      trigger: ["blur", "input"],
      message: `该属性为必填`,
    }
  });
  dataPermits = ref<any>({});
  gridOption = ref<VxeGridProps<TaskInfoDetail>>({})
  
  dataModel = ref<FormType>({});

  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };
  setValue = (d: FormType) => {
    console.log('====setValue===', d)
    // 给表单设定数据
    this.dataModel.value = d;
  };

  getValue = async () => {
    // 从表单获取数据
    return cloneDeep(this.dataModel.value);
  };

  setRules = (v: RulesType) => {
    super.setRules(v)
  };

  constructor() {
    super();
  }
}

export { FormModal };
