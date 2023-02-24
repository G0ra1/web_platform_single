/**
 * @Description 虚拟订单-结算单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-12-08 09:49:08
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import {LabourVirtualPurchaseSettle} from "./model"
import { cloneDeep, result } from "lodash";
import Rule from "./rule";
import { getPurchaseContract,countAllCostForSettle,getByVirtualPurchaseId } from "./api";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }
    finalTypeOptions = ref([
        {
          label: '阶段结算',
          value: 'stage',
        },
        {
          label: '最终结算',
          value: 'final'
        }
      ]);
    //计算所有费用
    settleCount = ()=>{
        countAllCostForSettle({"virtualPurchaseId":this.virtualPurchaseId.value,"cutOffTime":this.dataModel.value.cutOffTime}).then((res)=>{
            this.dataModel.value.labourSettleUserTotalList = res.labourSettleUserTotals;
            this.dataModel.value.labourSettleHourList = res.labourSettleHours;
        });
    }
    //虚拟订单id
    virtualPurchaseId = ref("");

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourVirtualPurchaseSettle>(new LabourVirtualPurchaseSettle());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    initScript = (params: Array<any>) => {
        this.virtualPurchaseId.value= params[0].id;
        getPurchaseContract(params[0].contractPurchaseId).then(d=>{
            console.log(d)
            this.dataModel.value.contractPurchaseName = d.contractname;
            this.dataModel.value.contractPurchaseCode = d.contractcode;
            this.dataModel.value.contractPurchaseId = d.id;
            this.dataModel.value.virtualPurchaseId = params[0].id;
            this.dataModel.value.purchaseFrameCode = d.framecode;//框架合同编码   todo 框架合同名称需要再查一下
            this.dataModel.value.purchaseFrameCode = d.contractid;//框架合同编码
            //this.dataModel.value.amountNowSettle = d.contractid;//本次结算金额
            this.dataModel.value.amountSettle = d.actualexecamount;//已结算金额
        })
        this.dataModel.value.finalType = 'stage';
        this.dataModel.value.id = ''; //todo
        //查询结算次数
        getByVirtualPurchaseId(this.virtualPurchaseId.value).then(d=>{
            this.dataModel.value.settleNumber = d.length;
            this.dataModel.value.settleNumber++;
        })
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
}


export {
    FormModal
}
