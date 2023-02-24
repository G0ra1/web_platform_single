/**
 * @Description 实验流程规范
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 09:49:36
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    title: RuleConfig = new RuleConfig('标题');
    type: RuleConfig = new RuleConfig('类型', 'number');
}