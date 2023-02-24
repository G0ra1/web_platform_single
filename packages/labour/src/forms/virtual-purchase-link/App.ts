/**
 * @Description 虚拟订单
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm,request } from "@platform/main";
import { FormSchema } from "./conf";
import LabourVirtualPurchaseLink from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getPurchaseList,getLabourPlan } from './api/index'


//承包合同名称选项
const purchaseNameOptions = ref<any>([]);
//承包合同编号选项
const purchaseCodeOptions = ref<any>([]);

//承包合同甲方
const purchasePartanameOptions = ref<any>([]);
//承包合同乙方
const purchasePartbnameOptions = ref<any>([]);
// 岗位选项
const outerDisciplineNameOptions = ref<any>([]);

const getoptions = (id:any)=>{
    getLabourPlan(id).then((d)=>{
        const PlanPersonDisArr:any = {};
        d.labourPlanPersonList.forEach((d:any)=>{
            PlanPersonDisArr[d.outerDisciplineId] = d
        })
        const ObjectArr =  Object.values(PlanPersonDisArr)
        outerDisciplineNameOptions.value = ObjectArr.map((d:any)=>{
            return {'label':d.outerDisciplineName,'value':d.outerDisciplineId}
        })
    })
}


const purchasesubtypeOptions = [
    {
        label: "框架合同",
        value: "1"
      },
      {
        label: "常规合同",
        value: "2"
      },
      {
        label: "项下订单",
        value: "3"
      },
]
getPurchaseList().then((d)=>{
    //承包合同名称选项
    let purchaseNameDisArr = d.map((d:any)=>{return d.contractname})
    let purchaseNameArr = Array.from(new Set(purchaseNameDisArr))
    purchaseNameOptions.value = purchaseNameArr.map((d)=>{
        return {'label':d,'value':d}
    })
    //承包合同编号选项
    let purchaseCodeDisArr = d.map((d:any)=>{return d.contractcode})
    let purchaseCodeArr = Array.from(new Set(purchaseCodeDisArr))
    purchaseCodeOptions.value = purchaseCodeArr.map((d)=>{
        return {'label':d,'value':d}
    })
    //承包合同甲方
    let purchasePartanameDisArr = d.map((d:any)=>{return d.partaname})
    let purchasePartanameArr = Array.from(new Set(purchasePartanameDisArr))
    purchasePartanameOptions.value = purchasePartanameArr.map((d)=>{
        return {'label':d,'value':d}
    })
    //承包合同乙方
    let purchasePartbnameDisArr = d.map((d:any)=>{return d.partbname})
    let purchasePartbnameArr = Array.from(new Set(purchasePartbnameDisArr))
    purchasePartbnameOptions.value = purchasePartbnameArr.map((d)=>{
        return {'label':d,'value':d}
    })
})

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
            this.dataModel.value.labourVirtualPurchaseLinkExtendList=res.purchaseExtend?[res.purchaseExtend]:[];
            this.dataModel.value.isEditPurchasePrice=!res.purchasePriceList|| !res.purchasePriceList.length;
            this.dataModel.value.labourVirtualPurchaseLinkPriceList=res.purchasePriceList||[];
        });
      }
    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourVirtualPurchaseLink>(new LabourVirtualPurchaseLink());
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
        getoptions(this.dataModel.value.planId);
    };
    
    
    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
}
export { purchaseNameOptions,purchaseCodeOptions,purchasePartanameOptions,purchasePartbnameOptions,purchasesubtypeOptions,outerDisciplineNameOptions}
export {
    FormModal
}
