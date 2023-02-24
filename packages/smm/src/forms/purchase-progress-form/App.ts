/**
 * @Description 二级物资集中采购项目进度情况表
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
 */

import { ref, nextTick, watch } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import SuppPurchaseProgress from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
export const basicDisabled = ref<boolean>(false)
export const dateModelDisabled = ref<boolean>(false)
export const dzsply = ref<Array<any>>([]);


class FormModal extends AbstractForm {

  constructor() {
    super();
    Object.assign(this.rules.value, new Rule())
  }

  //表单引用类
  formRef = ref<FormInst>();
  //表单值
  dataModel = ref<SuppPurchaseProgress>(new SuppPurchaseProgress());
  //验证规则
  rules = ref<FormRules>({});
  //处理页面隐藏、只读等特殊权限的控制数据
  dataPermits = ref<any>({});

  //执行初始化自定义脚本
  initScript = async (params: any) => {
    //alert(params[1])
    basicDisabled.value = (params[1] && params[1] != 1) || !!params[1]
    dateModelDisabled.value = params[1] != 2
  }

  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };

  //这个地方父类定义使用了object，不能直接用我们的类做了形参
  setValue = (d: object) => {

    // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
    Object.assign(this.dataModel.value, d);
    //basicDisabled.value = this.dataModel.value.submitStatus != '1' || !!this.dataModel.value.submitStatus
    //dateModelDisabled.value = this.dataModel.value.submitStatus != '2'
    //basicDisabled.value = (this.dataModel.value.submitStatus && this.dataModel.value.submitStatus != 1) || !!this.dataModel.value.submitStatus
    //dateModelDisabled.value = this.dataModel.value.submitStatus != 2
    dzsply.value = this.dataModel.value.purchaseProductMixList;
    this.dataModel.value = {
      ...this.dataModel.value,
      ...this.dataModel.value.purchaseProgressDetailList[0],
    };
    console.log(this.dataModel.value, 'this.dataModel.value')
  }

  //提交时会调取这个
  getValue = async () => {
    let data = {
      ...cloneDeep(this.dataModel.value),
      purchaseProductMixList: dzsply.value,
      purchaseProgressDetailList: [{ ...cloneDeep(this.dataModel.value), id: null }]
    }
    this.dataModel.value.purchaseProductMixList = dzsply.value
    this.dataModel.value.purchaseProgressDetailList = [{ ...cloneDeep(this.dataModel.value), id: null }]
    return cloneDeep(this.dataModel.value);
  };

}
export const current = ref<number>(1)


export {
  FormModal
}

