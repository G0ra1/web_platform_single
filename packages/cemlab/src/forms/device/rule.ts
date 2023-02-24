/**
 * @Description 设备新增表单
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 13:44:09
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
  deviceName: RuleConfig = new RuleConfig('设备名称');
  deviceCode: RuleConfig = new RuleConfig('自编号');
  specifications: RuleConfig = new RuleConfig('规格型号');
  manufacturer: RuleConfig = new RuleConfig('生产厂家');
  factoryNumber: RuleConfig = new RuleConfig('出厂编号');
  productionTime: RuleConfig = new RuleConfig('投产日期');
  orgName: RuleConfig = new RuleConfig('所属单位');
  // approvalTime: RuleConfig = new RuleConfig('校准日期');
  maintainTime: RuleConfig = new RuleConfig('保养日期');
  deviceStatus: RuleConfig = new RuleConfig('设备状态', 'number');
  maintainRules: RuleConfig = new RuleConfig('保养规则', 'number');
  maintainStatus: RuleConfig = new RuleConfig('保养状态');
}