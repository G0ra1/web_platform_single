/**
 * @Description 劳资管理测试类
 * @author 云数网讯 zouliming@netwisd.com@netwisd.com
 * @date 2022-12-01 15:41:31
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    orgCode: RuleConfig = new RuleConfig('组织代码');
    orgName: RuleConfig = new RuleConfig('组织名称');
}