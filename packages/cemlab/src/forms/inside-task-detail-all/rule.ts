/**
 * @Description 实验管理-实验任务-查看任务详情
 * @author 云数网讯 lvchengming@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
 */


import { RuleConfig } from '@platform/main';
export default class Rule {
    //任务基础信息
    labReportCode: RuleConfig = new RuleConfig('化验报告单');
    duiHao: RuleConfig = new RuleConfig('队号');
    taskSource: RuleConfig = new RuleConfig('任务来源');
    samplingUserName: RuleConfig = new RuleConfig('取样人');
    samplingSpot: RuleConfig = new RuleConfig('取样地点');
    samplingAshDate: RuleConfig = new RuleConfig('取样日期（灰）');
    waterSampleSource: RuleConfig = new RuleConfig('水样来源');
    waterSampleBarrelNumber: RuleConfig = new RuleConfig('水样桶号');
    samplingWaterDate: RuleConfig = new RuleConfig('取样日期（水）');
    //井基础信息
    structuralBlock: RuleConfig = new RuleConfig('构造区块');
    wellsNumber: RuleConfig = new RuleConfig('井号');
    finishDate: RuleConfig = new RuleConfig('完成日期');
    wellsDepth: RuleConfig = new RuleConfig('井深(m)','number');
    verticalDepth: RuleConfig = new RuleConfig('垂深(m)','number');
    casingSize: RuleConfig = new RuleConfig('套管尺寸(mm)','number');
    cementingMode: RuleConfig = new RuleConfig('固井方式');
    //实验条件
    // sampleType: RuleConfig = new RuleConfig('样品类型');
    // slurryType: RuleConfig = new RuleConfig('浆体类型');
    // cementType: RuleConfig = new RuleConfig('水泥型号');
    // cementQuantity: RuleConfig = new RuleConfig('加量','number');
    // slurryFormulation: RuleConfig = new RuleConfig('水泥配方');
    // experimentTemperature: RuleConfig = new RuleConfig('实验温度');
    // experimentPressure: RuleConfig = new RuleConfig('实验压力');
    // heatingTime: RuleConfig = new RuleConfig('升温时间');
    // curingTemperature: RuleConfig = new RuleConfig('养护温度(°C)');
    // curingPressure: RuleConfig = new RuleConfig('养护压力(MPa)');
    // curingTime: RuleConfig = new RuleConfig('养护时间(h)');
    // staticTemperature: RuleConfig = new RuleConfig('静止温度(°C)');
    // coefficient: RuleConfig = new RuleConfig('系数');
    // cementDensity: RuleConfig = new RuleConfig('水泥浆密度(g/cm³)');
    // waterCementRatio: RuleConfig = new RuleConfig('水灰比');
    //其他
    experimentUserName: RuleConfig = new RuleConfig('实验人员)');
}