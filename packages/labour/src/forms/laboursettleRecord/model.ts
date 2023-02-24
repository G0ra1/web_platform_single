/**
 * @Description 需求计划信息
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-19 20:21:13
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
    //关联采购 框架合同名称
    purchaseFrameId!: string;
    //关联采购 框架合同code
    purchaseFrameCode!: string;
    //关联采购 框架合同名称
    purchaseFrameName!: string;
    //关联采购 框架合同id
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
}