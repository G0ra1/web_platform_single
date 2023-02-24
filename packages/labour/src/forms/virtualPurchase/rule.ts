/**
 * @Description 虚拟订单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-22 16:32:32
 */

import RuleConfig from "../../lib/rule/RuleConfig";
export default class Rule {
    planId: RuleConfig = new RuleConfig('需求计划id');
    virtualPurchaseName: RuleConfig = new RuleConfig('虚拟订单名称');
    virtualPurchaseCode: RuleConfig = new RuleConfig('虚拟订单code');
    contractPurchaseId: RuleConfig = new RuleConfig('关联采购合同id');
}