/**
 * @Description 派遣单
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import LabourDispatch from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { format, parseISO } from "date-fns";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourDispatch>(new LabourDispatch());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }

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
  addApproachPerson = (rows: []) => {
    this.dataModel.value.labourDispatchPersionList = rows.map((row: any) => {
      const { id, ...newRow } = row
      // //处理下进场时间
      // newRow.approachTime = format(row.interviewTime ? parseISO(row.interviewTime) : new Date(), "yyyy-MM-dd")
      // newRow.planReferralId = id
      // newRow.workcontractid = this.dataModel.value.workcontractid
      // newRow.workcontractname = this.dataModel.value.workcontractname
      // newRow.workcontractcode = this.dataModel.value.workcontractcode
      return newRow
    }) as [];
  }


  planTypeOptions = ref([
    {
      label: '大修',
      value: '1',
    },
    // {
    //   label: '日常',
    //   value: '2'
    // },
    {
      label: '专项',
      value: '3'
    }
  ]);



}



export {
    FormModal
}
