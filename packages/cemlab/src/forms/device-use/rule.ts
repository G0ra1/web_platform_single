/**
 * @Description 仪器设备使用记录详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
  deviceName: RuleConfig = new RuleConfig('设备名称');
  useStartHours: RuleConfig = new RuleConfig('开始使用时间');
}