/**
 * @Description 需求计划信息
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-19 20:21:13
 */

export class LabourPlan {
    //主键
    id!: string;
    //需求计划名称
    planName!: string;
    //需求计划编号
    planNo!: string;
    //所属机构id
    planOrgId!: string;
    //所属机构名称
    planOrgName!: string;
    //所属部门id
    planDeptId!: string;
    //所属部门名称
    planDeptName!: string;
    //需求类别（大修、日常、专项）
    planType!: string;
    //大修id
    overhaulId!: string;
    //大修编码
    overhaulCode!: string;
    //大修名称
    overhaulName!: string;
    //预估金额
    estimateAmount!: string;
    //预算金额
    budgetAmount!: string;
    //计划开始时间
    planStartTime!: string;
    //计划结束时间
    planEndTime!: string;
    //是否生成订单；0否；1是；
    isGenOrder!: number;
    //推送截止时间
    pushOffTime!: string;
    //是否框架协议供应商；0否；1是；
    isFrameSupp!: number;
    //承包合同信息
    labourPlanContractWorkList?: Array<LabourPlanContractWork>;
    //供应商信息
    labourPlanSuppOrgList?: Array<LabourPlanSuppOrg>;
    //需求人员信息
    labourPlanPersonList?: Array<LabourPlanPerson>;

    overhaulSourceList?: Array<overhaulSourceList>;


    purchaseExtend ?: Array<PurchaseExtend>;
    purchasePrice ?: Array<PurchasePrice>;
}

export  class LabourPlanContractWork {
    //主键
    //id!: string;
    //承包合同id
    workContractId!: string;
        //承包合同id
    workContractCode!: string;
            //承包合同id
    workContractName!: string;
}

//需求人员
export  class LabourPlanPerson {
    //需求计划id
    planId!: string;
    //项目名称
    projectName!: string;
    //岗位名称（字典类型为postRank）
    postRankName!: string;
    //需求人数
    needNo!: number;
    //是否工时制
    isHour!: number;
    //专业字典id（字典类型为outer_discipline）
    outerDisciplineId!: string;
    //专业字典名称（字典类型为outer_discipline）
    outerDisciplineName!: string;
}

//供应商信息
export  class LabourPlanSuppOrg {
    //需求计划id
    planId!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商组织code
    suppOrgName!: string;
    //供应商组织简称
    suppOrgShortName!: string;
}

//人员推荐信息
export  class LabourPlanReferral {
    //需求计划id
    planId!: string;
    //需求计划需求专业相关信息
    plaplanPersonIdnId!: string;
    //专业字典id（字典类型为outer_discipline）
    outerDisciplineId!: string;
    //专业字典名称（字典类型为outer_discipline）
    outerDisciplineName!: string;
    //项目名称
    projectName!: string;
    //岗位id（字典类型为postRank）
    postRankId!: string;
    //岗位名称（字典类型为postRank）
    postRankName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商组织name
    suppOrgName!: string;
    //是否工时制
    isHour!: number;
    //录用状态（pass 未录用；interview面试；stay_entrance待入场；）
    referralStatus!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //性别 1 男   2女
    sex!: number;
    //班组id
    banId!: string;
    //班组名称
    banName!: string;
}
export  class PurchaseExtend {

    //需求计划id
    planId!: string;
    //主键
    id!: string;
    //采购合同ID
    contractId!: string;
    //合同名称
    contractname !:string;
    //税率
    taxrateName!: string;

    partaname !:string;

    contractcode !:string;
    //税率
    taxrate!: string;
    //发票类型
    invoiceTypeName!: string;
    //发票类型
    invoiceType!: string;
    //申请日期
    applyTime!: string;
    //工时时薪
    workHourAmount !:number;
   //加班时薪
   overtimeHourAmount !:number;
   //工作日加班倍数
   workdayOvertimeCoefficient !:number;
   //休息日加班倍数
   dayOffOvertimeCoefficient !:number;
   //法定休假日加班倍数
   legalDayOffOvertimeCoefficient!:number;

}

export class PurchasePrice{

     //需求计划id
     planId!: string;

    //专业(规格型号)
    outerDisciplineId!: string;
     //专业名称(规格型号)
    outerDisciplineName!: string;
     //休息方式;1单休2双休3不休
    restMode!: string;
     //单位;1人/天2人/月
    unit!: number;
     //价格
    price!: number;
  }

  export class overhaulSourceList{

    
 }
