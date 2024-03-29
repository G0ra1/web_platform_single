/**
 * @Description 实验过程
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:07
 */
import CemlabExperimentProcessContaminateFormulation from './formulationModel'
export default class CemlabExperimentProcess {
    //主键
    id!: string;
    //实验单ID
    experimentReceiptsId!: string;
    //实验条件ID
    experimentConditionId!: string;
    //实验水泥浆性能要求ID
    experimentSlurryDemandId!: string;
    //实验样品ID
    experimentSpecimenId!: string;
    //实验单任务ID
    experimentTaskId!: string;
    //实验类型;1实验2污染实验
    experimentType!: number;
    //实验名称
    experimentName!: string;
    //浆体类型;1领浆2中间浆3尾浆
    slurryType!: number;
    //污染实验配方
    contaminateFormula!: string;
    //污染实验配方加量
    contaminateQuantity!: number;
    //实验时间
    experimentDate!: string;
    //实验结果
    experimentResult!: string;
    //实验现象
    experimentPhenomena!: string;
    //实际实验温度
    actualExperimentTemperature!: string;
    //实际实验压力
    actualExperimentPressure!: string;
    //实际升温时间
    actualHeatingTime!: string;
    //水泥浆平均转速（3）
    cementSlurrySpeed3!: number;
    //水泥浆平均转速（6）
    cementSlurrySpeed6!: number;
    //水泥浆平均转速（100）
    cementSlurrySpeed100!: number;
    //水泥浆平均转速（200）
    cementSlurrySpeed200!: number;
    //水泥浆平均转速（300）
    cementSlurrySpeed300!: number;
    //水泥浆平均转速（600）
    cementSlurrySpeed600!: number;
    //水泥浆塑形粘度
    cementSlurryPlasticViscosity!: number;
    //水泥浆动切力
    cementSlurryYieldVal!: number;
    //水泥浆流性指数
    cementSlurryLiquidity!: number;
    //水泥浆稠度系数
    cementSlurryConsistencyCoefficient!: number;
    //泥浆平均转速（3）
    slurrySpeed3!: number;
    //泥浆平均转速（6）
    slurrySpeed6!: number;
    //泥浆平均转速（100）
    slurrySpeed100!: number;
    //泥浆平均转速（200）
    slurrySpeed200!: number;
    //泥浆平均转速（300）
    slurrySpeed300!: number;
    //泥浆平均转速（600）
    slurrySpeed600!: number;
    //泥浆塑形粘度
    slurryPlasticViscosity!: number;
    //泥浆动切力
    slurryYieldVal!: number;
    //泥浆流性指数
    slurryLiquidity!: number;
    //泥浆稠度系数
    slurryConsistencyCoefficient!: number;
    //前置液平均转速（3）
    prepadSpeed3!: number;
    //前置液平均转速（6）
    prepadSpeed6!: number;
    //前置液平均转速（100）
    prepadSpeed100!: number;
    //前置液平均转速（200）
    prepadSpeed200!: number;
    //前置液平均转速（300）
    prepadSpeed300!: number;
    //前置液平均转速（600）
    prepadSpeed600!: number;
    //前置液塑形粘度
    prepadPlasticViscosity!: number;
    //前置液动切力
    prepadYieldVal!: number;
    //前置液流性指数
    prepadLiquidity!: number;
    //前置液稠度系数
    prepadConsistencyCoefficient!: number;
    //设备ID
    deviceId!: string;
    //设备名称
    deviceName!: string;
    //设备编号
    deviceCode!: string;
    //釜体;1左釜2右釜
    futi!: number;
    //数据获取时间开始
    dataStartTime!: string;
    //数据获取时间结束
    dataEndTime!: string;
    //图表名称
    chartName!: string;
    //图表附件ID
    deviceChartId!: string;
    //编制人
    compileUserid!: string;
    //编制人
    compileUserName!: string;
    //审核人
    auditorUserid!: string;
    //审核人
    auditorUserName!: string;
    //批准人
    approverUserid!: string;
    //批准人
    approverUserName!: string;
    //申请日期
    applyTime!: string;
    //是否删除
    isDel!: number;
    //污染实验配方
    processContaminateFormulationList?: Array<CemlabExperimentProcessContaminateFormulation> = new Array();
}