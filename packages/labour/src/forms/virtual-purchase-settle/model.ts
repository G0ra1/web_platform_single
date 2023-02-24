/**
 * @Description 虚拟订单-结算单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-12-08 09:49:08
 */

export class LabourVirtualPurchaseSettle {
    //主键
    id!: string;
    //需求计划id
    planId!: string;
    //需求计划名称
    planName!: string;
    //关联采购合同名称
    contractPurchaseName!: string;
    //关联采购合同code
    contractPurchaseCode!: string;
    //关联采购合同id
    contractPurchaseId!: string;
    //虚拟采购订单Id
    virtualPurchaseId!: string;
    //stage阶段性结算;final最终结算;
    finalType!: string;
    //结算截止时间
    cutOffTime!: string;
    //结算书编号
    settleCode!: string;
    //本次结算金额
    amountNowSettle!: number;
    //本次结算金额(大写)
    amountNowSettleUpper!: string;
    //已结算金额
    amountSettle!: number;
    //已结算金额(大写)
    amountSettleUpper!: string;
    //关联采购 框架合同名称
    purchaseFrameId!: string;
    //关联采购 框架合同code
    purchaseFrameCode!: string;
    //关联采购 框架合同id
    purchaseFrameName!: string;
    //结算次数
    settleNumber!: number;

    //工时信息
    labourSettleHourList?: Array<LabourSettleHour>;

    //用户结算明细表
    labourSettleUserTotalList?: Array<LabourSettleUserTotal>;
}


export class LabourSettleHour {
    //结算单id
    settleId!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //身份证号
    idCard!: string;
    //虚拟采购订单Id
    virtualPurchaseId!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //虚拟订单code
    virtualPurchaseCode!: string;
    //关联采购合同id
    contractPurchaseId!: string;
    //需求计划id
    planId!: string;
    //需求计划名称
    planName!: string;
    //年份
    settleYear!: string;
    //月份
    settleMonth!: string;
    //分配工时
    allotHour!: number;
    //考勤工时
    attendanceHour!: number;
    //加班工时
    overtimeHour!: number;
    //已结算金额
    amountSettle!: number;
    //本次结算金额
    amountNowSettle!: number;
    //累计结算金额
    amountGrand!: number;
}

export class LabourSettleUserTotal {
    //结算单id
    settleId!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //身份证号
    idCard!: string;
    //虚拟采购订单Id
    virtualPurchaseId!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //虚拟订单code
    virtualPurchaseCode!: string;
    //关联采购合同id
    contractPurchaseId!: string;
    //需求计划id
    planId!: string;
    //需求计划名称
    planName!: string;
    //分配工时
    allotHour!: number;
    //考勤工时
    attendanceHour!: number;
    //加班工时
    overtimeHour!: number;
    //请假工时
    vacateHour!: number;
    //水电网费
    filialeWpnCost!: number;
    //考核激励费用
    filialeAssessCost!: number;
    //过节费
    filialeFestivalCost!: number;
    //奖惩-其他扣款
    filialeRewardPunishCost!: number;
    //差旅费
    suppTravelCost!: number;
    //核酸检测费
    suppNucleicAcidCot!: number;
    //体检费
    suppExaminationCost!: number;

    //业务子表明细
    labourSettleUserDtss?: Array<LabourSettleUserDts>;
}

export class LabourSettleUserDts {
    //汇总表id
    settleTotalId!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //身份证号
    idCard!: string;
    //班组id
    banId!: string;
    //班组名称
    banName!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织名称
    suppOrgName!: string;
    //供应商组织Code
    suppOrgCode!: string;
    //费用金额
    amountCost!: number;
    //业务类型
    businessType!: string;
    //业务单据id
    businessId!: string;
}