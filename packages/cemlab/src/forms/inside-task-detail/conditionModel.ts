import CemlabExperimentSlurryFormula from './slurryFormulaModel'
export default class CemlabExperimentCondition {
    //主键
    id?: string;
    //样品类型;1小样2大样3半大样
    sampleType?: number;
    //浆体类型;1领浆2中间浆3尾浆
    slurryType?: number;
    //水泥型号
    cementType?: string;
    //水泥加量
    cementQuantity?: number;
    //水泥配方
    slurryFormulation?: string;
    //实验温度
    experimentTemperature?: string;
    //实验压力
    experimentPressure?: string;
    //升温时间
    heatingTime?: string;
    //养护温度
    curingTemperature?: string;
    //养护压力
    curingPressure?: string;
    //养护时间
    curingTime?: string;
    //静止温度
    staticTemperature?: string;
    //系数
    coefficient?: string;
    //水泥浆密度
    cementDensity?: string;
    //水灰比
    waterCementRatio?: string;
    //是否删除
    isDel?: number;
    //水泥配方
    cemlabExperimentSlurryFormulaList?: Array<CemlabExperimentSlurryFormula> = new Array();
}