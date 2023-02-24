/**
 * @Description 采购合同拓展信息
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-11-21 11:21:01
 */

 import { ref } from 'vue';
 import { FormInst, FormRules } from 'naive-ui';
 import { AbstractForm } from "@platform/main";
 import { FormSchema } from "./conf";
 import PurchaseExtend from "./model"
 import { cloneDeep, reject } from "lodash";
 import  Rule  from "./rule";
 import { NsOption } from "../../lib/option/NsOption"
import { resolve } from 'path';
 


let dialogLocal: any;
let messageLocal: any;

function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}
 class FormModal extends AbstractForm {
 
     constructor() {
         super();
         Object.assign(this.rules.value, new Rule())
         
     }
     //表单引用类
     formRef = ref<FormInst>();
     //表单值
     dataModel = ref<PurchaseExtend>(new PurchaseExtend());
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
    
     educationOptions = ref(new Array<NsOption.OptionSelect>());
     outerDisciplineOptions = ref(new Array<NsOption.OptionSelect>());
     
 }
 
 export {
     FormModal,initDialog
 }
 