/**
 * @Description 处置申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-28 23:25:32
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    code: RuleConfig = new RuleConfig('编号');
    dealNum: RuleConfig = new RuleConfig('处置数量');
    //applyTime: RuleConfig = new RuleConfig('申请时间');
}