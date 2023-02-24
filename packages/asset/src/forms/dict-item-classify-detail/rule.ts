/**
 * @Description 物资
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-23 09:32:43
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    itemName: RuleConfig = new RuleConfig('物资名称');
    itemCode: RuleConfig = new RuleConfig('物资编码(8位流水00000001-99999999)');
}