/**
 * @Description 派遣单人员
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    outerDisciplineId: RuleConfig = new RuleConfig('岗位id（字典类型为outer_discipline）');
    outerDisciplineName: RuleConfig = new RuleConfig('岗位名称（字典类型为outer_discipline_name）');
}