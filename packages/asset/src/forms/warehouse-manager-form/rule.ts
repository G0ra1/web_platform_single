/**
 * @Description 仓库管理 编辑页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-22 15:05:10
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    orgFullId: RuleConfig = new RuleConfig('父级组织全路径ID');
    orgFullName: RuleConfig = new RuleConfig('父级组织全路径名称');
}