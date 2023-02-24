/**
 * @Description 虚拟订单-结算单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-12-08 09:49:08
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    planId: RuleConfig = new RuleConfig('需求计划id');
    planName: RuleConfig = new RuleConfig('需求计划名称');
    contractPurchaseName: RuleConfig = new RuleConfig('关联采购合同名称');
    contractPurchaseCode: RuleConfig = new RuleConfig('关联采购合同code');
    contractPurchaseId: RuleConfig = new RuleConfig('关联采购合同id');
    settleCode: RuleConfig = new RuleConfig('结算书编号');
    amountNowSettle: RuleConfig = new RuleConfig('本次结算金额');
    amountNowSettleUpper: RuleConfig = new RuleConfig('本次结算金额(大写)');
    amountSettle: RuleConfig = new RuleConfig('已结算金额');
    amountSettleUpper: RuleConfig = new RuleConfig('已结算金额(大写)');
    purchaseFrameId: RuleConfig = new RuleConfig('关联采购 框架合同名称');
    purchaseFrameCode: RuleConfig = new RuleConfig('关联采购 框架合同code');
    purchaseFrameName: RuleConfig = new RuleConfig('关联采购 框架合同id');
}