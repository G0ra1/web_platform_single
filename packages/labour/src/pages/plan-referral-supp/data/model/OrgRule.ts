/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:47:52 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-12 22:50:21
 * @Description 添加的表对象
 */
import RuleConfig from "../../../../lib/rule/RuleConfig";
export default class OrgRule {
    orgCode: RuleConfig = new RuleConfig('组织代码');
    orgName: RuleConfig = new RuleConfig('组织名称');
    orgShortName: RuleConfig = new RuleConfig('简称');
    username: RuleConfig = new RuleConfig('管理员账号');
    password: RuleConfig = new RuleConfig('管理员密码');
}