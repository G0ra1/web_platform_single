/**
 * @Description 实验单
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
 */

import { RuleConfig } from '@platform/main';
export default class Rule {
    //样品信息
    customerNameDict: RuleConfig = new RuleConfig('客户名称');
    detectionMethodDict: RuleConfig = new RuleConfig('检测方法标准');
    specimenName: RuleConfig = new RuleConfig('样品名称');
    specimenCode: RuleConfig = new RuleConfig('样品编号');
    specimenMaterial: RuleConfig = new RuleConfig('样品材质');
    //井基础信息
    specimenAttribute: RuleConfig = new RuleConfig('样品属性');
    //实验条件
    experimentTemperature: RuleConfig = new RuleConfig('实验温度');
    experimentPressure: RuleConfig = new RuleConfig('实验压力');
    heatingTime: RuleConfig = new RuleConfig('升温时间');
    curingTemperature: RuleConfig = new RuleConfig('养护温度(°C)');
    curingPressure: RuleConfig = new RuleConfig('养护压力(MPa)');
    curingTime: RuleConfig = new RuleConfig('养护时间(h)');
    //检测项目
    detectionItemDict: RuleConfig = new RuleConfig('检测项目');
    detectionVal: RuleConfig = new RuleConfig('数值');
    //其他
    finishDate: RuleConfig = new RuleConfig('完成日期');
    experimentUserName: RuleConfig = new RuleConfig('实验人员');
}