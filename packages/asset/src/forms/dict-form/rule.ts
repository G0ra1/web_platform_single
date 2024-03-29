/**
 * @Description 字典项
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-21 17:21:53
 */


import { RuleConfig } from '@platform/main';
export default class Rule {
    dictId: RuleConfig = new RuleConfig('所属字典类id');
    dictCode: RuleConfig = new RuleConfig('字典编码');
    dictItemName: RuleConfig = new RuleConfig('字典项名称');
    dictItemCode: RuleConfig = new RuleConfig('字典项编码');
}