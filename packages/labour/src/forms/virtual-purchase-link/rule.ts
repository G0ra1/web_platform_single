/**
 * @Description 虚拟订单
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    planId: RuleConfig = new RuleConfig('需求计划id');
    planName: RuleConfig = new RuleConfig('需求计划名称');
    virtualPurchaseName: RuleConfig = new RuleConfig('虚拟订单名称');
    virtualPurchaseCode: RuleConfig = new RuleConfig('虚拟订单code');
}