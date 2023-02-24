import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, Page } from "@platform/main";
import { FormSchema } from "./conf";
import { Model, DeparturePerson, Rule } from "./model"
import { cloneDeep } from "lodash";

class FormModal extends AbstractForm {
  constructor() {
    super();
    Object.assign(this.rules.value, new Rule())
  }

  //表单引用类
  formRef = ref<FormInst>();
  //表单值
  dataModel = ref<Model>(new Model());
  //验证规则
  rules = ref<FormRules>({});
  //处理页面隐藏、只读等特殊权限的控制数据
  dataPermits = ref<any>({});

  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };

  //这个地方父类定义使用了object，不能直接用我们的类做了形参
  setValue = (d: object) => {
    // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
    Object.assign(this.dataModel.value, d);
  };

  //提交时会调取这个
  getValue = async () => {
    return cloneDeep(this.dataModel.value);
  };

  //添加劳务人员
  addDeparturehPerson = (rows: []) => {
    this.dataModel.value.departurehPersonList = rows.map((row: any) => {
      const { id, ...newRow } = row
      return newRow
    }) as [];
  }

}

export { FormModal }