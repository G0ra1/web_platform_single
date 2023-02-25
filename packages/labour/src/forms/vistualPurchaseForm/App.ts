/**
 * @Description 虚拟订单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-22 16:32:32
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm ,request} from "@platform/main";
import { FormSchema } from "./conf";
import LabourVirtualPurchase from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

      purchaseByContractId =  (contractId:string,d:any)=> {
        console.log(d)
        return request({
          url: `/purchasecontract/purchase/contract/getPurchaseExtendInfo/${contractId}`,
          method: "get"
        }).then((res)=>{
            console.log(res+"==========res")
            this.dataModel.value.isEditPurchaseExtend=!res.purchaseExtend;
            this.dataModel.value.purchaseExtend=res.purchaseExtend?[res.purchaseExtend]:[];
            this.dataModel.value.isEditPurchasePrice=!res.purchasePriceList|| !res.purchasePriceList.length;
            this.dataModel.value.purchasePriceList=res.purchasePriceList||[];
        });
      }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourVirtualPurchase>(new LabourVirtualPurchase());
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
}

export {
    FormModal
}