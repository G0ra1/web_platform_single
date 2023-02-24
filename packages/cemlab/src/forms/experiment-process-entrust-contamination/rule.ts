/**
 * @Description 委托合同-实验过程-污染实验录入
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
  experimentName: RuleConfig = new RuleConfig('实验名称');
  experimentDate: RuleConfig = new RuleConfig('实验时间');
  experimentResult: RuleConfig = new RuleConfig('实验结果');
}