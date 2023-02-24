/**
 * @Description 费用填报-分公司
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-12-04 16:23:48
 */

export default class LabourExpensesFiliale {
    //唯一标识
    id!: string;
    //费用填报code
    code!: string;
    // 需求计划ID
    planId!: string;
    //需求计划编号
    planCode!:string;
    //需求类别
    planType !: string;
    //需求名称
    planName !: string;
    //承包合同id
    contractWorkId!: string;
    //承包合同编号
    contractWorkCode!: string;
    //承包合同名称
    contractWorkName!: string;
    //虚拟订单id
    virtualPurchaseId!: string;
    //虚拟订单编号
    virtualPurchaseCode!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //采购合同ID
    contractPurchaseId!: string;
    //采购合同编号
    contractPurchaseCode!: string;
    //采购合同名称
     contractPurchaseName!: string;
    //填报时间
    fillDateTime!: string;
    //需求计划_所属机构id
    planOrgId!: string;
    //需求计划_所属机构名称
    planOrgName!: string;
    //需求计划_所属部门id
    planDeptId!: string;
    //需求计划_所属部门名称
    planDeptName!: string;
    //大修计划id
    overhaulId!: string;
    //大修编码
    overhaulCode!: string;
    //大修名称
    overhaulName!: string;
    // 总金额
    totalAmount!: number;
    //水电网费
    labourExpensesFilialeWpnList?: Array<LabourExpensesFilialeWpn>;
    //考核激励费用
    labourExpensesFilialeAssessList?: Array<LabourExpensesFilialeAssess>;
    //过节费
    labourExpensesFilialeFestivalList?: Array<LabourExpensesFilialeFestival>;
    //奖惩-其他扣款
    labourExpensesFilialeRewardPunishList?: Array<LabourExpensesFilialeRewardPunish>;

}
//水电网费
export class LabourExpensesFilialeWpn {
    //唯一标识
    id!: string;
    //费用填报id
    expensesFilialeId!: string;
    //填报时间
    fillDateTime!: string;
    //班组ID
    banId!: string;
    //班组名称
    banName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商名称
    suppOrgName!:string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //性别;1男2女
    sex!: number;
    //身份证号
    idCard !: string;
    //承包合同id
    contractWorkId!: string;
    //承包合同编号
    contractWorkCode!: string;
    //承包合同名称
    contractWorkName!: string;
    //虚拟订单id
    virtualPurchaseId!: string;
    //虚拟订单编号
    virtualPurchaseCode!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //开始时间
    startDateTime!: string;
    //结束时间
    endDateTime!: string;
    //住宿天数
    stayLength!: number;
    //电费
    electricityCost!: number;
    //水费
    waterCost!: number;
    //网费
    netCost!: number;
    //合计
    total!: number;
    //备注
    remark!: string;
    //附件信息
    attachmentids!: string;
    //附件信息
    attachment!: string;
    //承包合同预计成本
    estimatesettlementamount!: number;
    //承包合同实际成本
    estimateinitamountnotax!: number;
    //采购合同预计履约金额
    estimateexecamount!: number;
    //采购合同实际履约金额
    actualexecamount!: number;
    //结算状态-1未结算-2结算中-3已结算
    settlementState!: number;
    //结算时间
    settlementDateTime!: string;
    //结算单id
    statementId!: string;
    //结算单名称
    statementName!: string;
}
//考核激励费用
export class LabourExpensesFilialeAssess {
    //唯一标识
    id!: string;
    //费用填报id
    expensesFilialeId!: string;
    //填报时间
    fillDateTime!: string;
    //班组ID
    banId!: string;
    //班组名称
    banName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商名称
    suppOrgName!:string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //性别;1男2女
    sex!: number;
    //身份证号码
    idCard!: string;   
    //入场有效性
    entranceValidity!: number;
    //体检有效性
    checkupValidity!: number;
    //合计
    total!: number;
    //备注
    remark!: string;
    //附件信息
    attachmentids!: string;
    //附件信息
    attachment!: string;
    //承包合同预计成本
    estimatesettlementamount!: number;
    //承包合同实际成本
    estimateinitamountnotax!: number;
    //采购合同预计履约金额
    estimateexecamount!: number;
    //采购合同实际履约金额
    actualexecamount!: number;
    //结算状态-1未结算-2结算中-3已结算
    settlementState!: number;
    //结算时间
    settlementDateTime!: string;
    //结算单id
    statementId!: string;
    //结算单名称
    statementName!: string;
}
//过节费
export class LabourExpensesFilialeFestival {
    //唯一标识
    id!: string;
    //费用填报id
    expensesFilialeId!: string;
    //填报时间
    fillDateTime!: string;
    //班组ID
    banId!: string;
    //班组名称
    banName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商名称
    suppOrgName!:string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //性别;1男2女
    sex!: number;
    //身份证号码
    idCard!: string;
    //过节费金额
    festivalCost!: number;
    //合计/含税
    total!: number;
    //备注
    remark!: string;
    //附件信息
    attachmentids!: string;
    //附件信息
    attachment!: string;
    //承包合同预计成本
    estimatesettlementamount!: number;
    //承包合同实际成本
    estimateinitamountnotax!: number;
    //采购合同预计履约金额
    estimateexecamount!: number;
    //采购合同实际履约金额
    actualexecamount!: number;
    //结算状态-1未结算-2结算中-3已结算
    settlementState!: number;
    //结算时间
    settlementDateTime!: string;
    //结算单id
    statementId!: string;
    //结算单名称
    statementName!: string;
}
//奖惩-其他扣款
export class LabourExpensesFilialeRewardPunish {
    //唯一标识
    id!: string;
    //费用填报id
    expensesFilialeId!: string;
        //填报时间
    fillDateTime!: string;
    //班组ID
    banId!: string;
    //班组名称
    banName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商名称
    suppOrgName!:string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //性别;1男2女
    sex!: number;
    //身份证号
    idCard !: string;
    //奖励费用
    rewardCost!: number;
    //惩罚费用
    punishmentCost!: number;
    //其他扣款
    otherDeductionsCost!: number;
    //合计
    total!: number;
    //备注
    remark!: string;
    //附件信息
    attachmentids!: string;
    //附件信息
    attachment!: string;
    //承包合同预计成本
    estimatesettlementamount!: number;
    //承包合同实际成本
    estimateinitamountnotax!: number;
    //采购合同预计履约金额
    estimateexecamount!: number;
    //采购合同实际履约金额
    actualexecamount!: number;
    //结算状态-1未结算-2结算中-3已结算
    settlementState!: number;
    //结算时间
    settlementDateTime!: string;
    //结算单id
    statementId!: string;
    //结算单名称
    statementName!: string;
}