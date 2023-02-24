/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 10:15:00
 */

import RuleConfig from "../../lib/rule/RuleConfig";
export default class Rule {
    userNameCh: RuleConfig = new RuleConfig('姓名');
    idCard: RuleConfig = new RuleConfig('身份证');
    educationId: RuleConfig = new RuleConfig('最高学历');
    birthday: RuleConfig = new RuleConfig('出生日期');
    phoneNum: RuleConfig = new RuleConfig('联系电话');
    jobDate: RuleConfig = new RuleConfig('工作时间');
    inDate: RuleConfig = new RuleConfig('入职时间');
    idCardFileId: RuleConfig = new RuleConfig('身份证附件');
}