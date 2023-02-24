/**
 * @Description 费用填报-分公司
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-12-04 16:23:48
 */

import { computed, ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import LabourExpensesFiliale from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getPlan } from './api';

class FormModal extends AbstractForm {

  constructor() {
    super();
    Object.assign(this.rules.value, new Rule())
  }

  //表单引用类
  formRef = ref<FormInst>();
  //表单值
  dataModel = ref<LabourExpensesFiliale>(new LabourExpensesFiliale());
  //验证规则
  rules = ref<FormRules>({});
  //处理页面隐藏、只读等特殊权限的控制数据
  dataPermits = ref<any>({});

  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };
  planTypeOptions = ref([
    {
      label: '大修',
      value: '1',
    },
    {
      label: '日常',
      value: '2'
    },
    {
      label: '专项',
      value: '3'
    }
  ]);

  admissionOptions = ref([
    {
      label: '满足一样',
      value: '0',
    },
    {
      label: '满足两样',
      value: '1',
    }
  ])



  //承包合同选择
  contractWorkOptions = ref([])
  // 虚拟订单 选择
  virtualPurchaseOptions = ref([])


  initScript = async (params: Array<any>) => {




    getPlan(params[1].id).then(d => {
      console.log(d)
      this.dataModel.value.planId = d.id;
      this.dataModel.value.planName = d.planName;
      this.dataModel.value.planCode = d.planNo;
      this.dataModel.value.planType = d.planType;
      this.dataModel.value.planOrgId = d.planOrgId;
      this.dataModel.value.planOrgName = d.planOrgName;
      this.dataModel.value.planDeptId = d.planDeptId;
      this.dataModel.value.planDeptName = d.planDeptName;
      this.dataModel.value.overhaulId = d.overhaulId;
      this.dataModel.value.overhaulCode = d.overhaulCode;
      this.dataModel.value.overhaulName = d.overhaulName;
      //给承包合同 赋值 选择的形式
      this.contractWorkOptions.value = d.labourPlanContractWorkList.map((dd: any) => {
          return { 'label': dd.workContractName, 'value': dd.workContractId,'code':dd.workContractCode };
        });
        //给虚拟订单 赋值 选择的形式
        this.virtualPurchaseOptions.value = d.labourVirtualPurchaseList.map((dd: any) => {
        return { 'label': dd.virtualPurchaseName, 'value': dd.id, 'code': dd.virtualPurchaseCode };
      })

    })

  }

  //   计算总金额
  calculatedAmount = computed(() => {
    // 水电网费费用 
    const totalWpn = this.dataModel.value.labourExpensesFilialeWpnList?.reduce((total: number, d:any) => {
      return total + d.total;
    }, 0) || 0
    //考核激励费用
    const totalAssess = this.dataModel.value.labourExpensesFilialeAssessList?.reduce((total: number, d:any) => {
      return total + d.total;
    }, 0) || 0
    //过节费
    const totalFestival = this.dataModel.value.labourExpensesFilialeFestivalList?.reduce((total: number, d:any) => {
      return total + d.total;
    }, 0) || 0
    // 奖惩-其他扣款
    const totalPunish = this.dataModel.value.labourExpensesFilialeRewardPunishList?.reduce((total: number, d:any) => {
      return total + d.total;
    }, 0) || 0
    this.dataModel.value.totalAmount = totalWpn + totalAssess + totalFestival + totalPunish
    // return this.dataModel.value.totalAmount.toFixed(2)
    return Math.round(this.dataModel.value.totalAmount*100)/100
  })

  //这个地方父类定义使用了object，不能直接用我们的类做了形参
  setValue = (d: any) => {
    // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
    Object.assign(this.dataModel.value, d);

  };

  //提交时会调取这个
  getValue = async () => {
    return cloneDeep(this.dataModel.value);
  };
  // 承包合同ID、code、name赋值
  contractWork = (d: any, p: any) => {
    this.dataModel.value.contractWorkId = d
    this.dataModel.value.contractWorkCode = p.code
    this.dataModel.value.contractWorkName = p.label
  }
  // 虚拟订单ID、code、name赋值
  virtualPurchase = (d: any, p: any) => {
    this.dataModel.value.virtualPurchaseId = d
    this.dataModel.value.virtualPurchaseCode = p.code
    this.dataModel.value.virtualPurchaseName = p.label
  }


  // 水电网费费用添加劳务人员
  addFilialeWpnUser = (rows: []) => {
    //  console.log(rows)
    this.dataModel.value.labourExpensesFilialeWpnList = rows.map((row: any) => {
      const { id: suppUserId, suppUserName, idCard ,suppOrgId,suppOrgCode,suppOrgName,banId,banName,startDateTime,endDateTime,stayLength,electricityCost,waterCost,netCost,total,remark,attachmentids,attachment } = row
      return { suppUserId, suppUserName, idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,startDateTime,endDateTime,stayLength,electricityCost,waterCost,netCost,total,remark,attachmentids,attachment  }
    }) as [];
  }


  // 考核激励费用添加劳务人员
  addAssessUser = (rows: []) => {
    //  console.log(rows)
    this.dataModel.value.labourExpensesFilialeAssessList = rows.map((row: any) => {
      const { id: suppUserId, suppUserName,idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,entranceValidity,checkupValidity,costname,total,remark,attachmentids,attachment } = row
      return { suppUserId, suppUserName,idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,entranceValidity,checkupValidity,costname,total,remark,attachmentids,attachment  }
    }) as [];
  }


  // 费用填报-分公司-过节费添加劳务人员
  addFestivalUser = (rows: []) => {
    //  console.log(rows)
    this.dataModel.value.labourExpensesFilialeFestivalList = rows.map((row: any) => {
      const { id: suppUserId, suppUserName, idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,festivalCost,total,remark,attachmentids,attachment } = row
      return { suppUserId, suppUserName,idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,festivalCost,total,remark,attachmentids,attachment }
    }) as [];
  }


  // 费用填报-分公司-奖惩-其他扣款 添加劳务人员
  addRewardPunishUser = (rows: []) => {
    //  console.log(rows)
    this.dataModel.value.labourExpensesFilialeRewardPunishList = rows.map((row: any) => {
      const { id: suppUserId, suppUserName, idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,rewardCost,punishmentCost,otherDeductionsCost,total,remark,attachmentids,attachment } = row
      return { suppUserId, suppUserName, idCard,suppOrgId,suppOrgCode,suppOrgName,banId,banName,rewardCost,punishmentCost,otherDeductionsCost,total,remark,attachmentids,attachment }
    }) as [];
  }
//test
  uploadSuccess = (data: any, row: any) => {
    row.attachment = data.attachment
    row.attachmentids = data.attachmentids
  }

}

export {
  FormModal
}
