/**
 * @Description 请假申请单
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-14 23:31:14
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    applyUserId: RuleConfig = new RuleConfig('申请人id');
    applyUserName: RuleConfig = new RuleConfig('申请人名称');
    applyType: RuleConfig = new RuleConfig('请假类型');
    applyDay: RuleConfig = new RuleConfig('请假天数');
    applyReason: RuleConfig = new RuleConfig('请假原因');
    applyStartDate: RuleConfig = new RuleConfig('请假开始时间');
    applyEndDate: RuleConfig = new RuleConfig('请假结束时间');
}