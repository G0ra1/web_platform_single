import RuleConfig from "../../lib/rule/RuleConfig";
export default class Rule {
    orgCode: RuleConfig = new RuleConfig('组织代码');
    orgName: RuleConfig = new RuleConfig('组织名称');
    userNameCh: RuleConfig = new RuleConfig('联系人');
    orgShortName: RuleConfig = new RuleConfig('机构简称');
    phoneNum: RuleConfig = new RuleConfig('联系人电话');
    email: RuleConfig = new RuleConfig('联系人邮箱');
}