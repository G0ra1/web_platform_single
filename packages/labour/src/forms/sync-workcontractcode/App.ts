import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import type { FormModalTypes } from '@platform/main'
type RulesType = FormModalTypes.RulesType
import { FormSchema } from "./conf";
import {Model,SyncRule} from "./mode";
import { cloneDeep } from "lodash";

class FormModal extends AbstractForm {

    //验证规则
    rules = ref<FormRules>({});

    constructor() {
      super();
      Object.assign(this.rules.value, new SyncRule());
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<Model>(new Model());
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参，理论上最优方式，父类用泛型处理
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
}

export {
    FormModal
}
