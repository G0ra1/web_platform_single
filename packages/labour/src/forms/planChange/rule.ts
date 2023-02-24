/**
 * @Description 需求计划信息变更
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-24 16:37:10
 */

import RuleConfig from "../../lib/rule/RuleConfig";
export default class Rule {
    sourceId: RuleConfig = new RuleConfig('源ID');
    planName: RuleConfig = new RuleConfig('需求计划名称');
    planNo: RuleConfig = new RuleConfig('需求计划编号');
    planOrgId: RuleConfig = new RuleConfig('所属机构id');
    planOrgName: RuleConfig = new RuleConfig('所属机构名称');
    planDeptId: RuleConfig = new RuleConfig('所属部门id');
    planDeptName: RuleConfig = new RuleConfig('所属部门名称');
    planType: RuleConfig = new RuleConfig('需求类别（大修、日常、专项）');
    planStartTime: RuleConfig = new RuleConfig('计划开始时间');
    planEndTime: RuleConfig = new RuleConfig('计划结束时间');
    pushOffTime: RuleConfig = new RuleConfig('推送截止时间');
    isFrameSupp: RuleConfig = new RuleConfig('是否框架协议供应商；0否；1是；');
}