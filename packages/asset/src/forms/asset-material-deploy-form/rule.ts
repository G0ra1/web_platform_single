/**
 * @Description 资产调配
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-11-24 16:30:16
 */

import { RuleConfig } from "@platform/main";
export default class Rule {
    code: RuleConfig = new RuleConfig('编号')
    deployNumber: RuleConfig = new RuleConfig('调拨数量')
}