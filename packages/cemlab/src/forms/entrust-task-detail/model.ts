/**
 * @Description 任务管理-委托合同单详情
 * @author 云数网讯 lvchengming@netwisd.com@netwisd.com
 * @date 2023-02-23 14:09:27
 */
import CemlabExperimentCondition from "./conditionModel";
import CemlabExperimentItems from "./itemsModel";
import CemlabExperimentSpecimen from "./specimenModel";
export default class CemlabExperimentReceipts {
  //主键
  id!: string;
  //单据类型;1内部通知单2委托合同单
  type: number = 2;
  //是否历史数据 0否1是
  isHistory: number = 0;
  //数据状态;1未完成2已完成
  status: number = 1;
  //单号
  code!: string;
  //样品类型;1小样2大样3半大样
  sampleType?: number;
  //化验报告单编码
  labReportDict!: string;
  //化验报告单编码
  labReportCode!: string;
  //队号
  duiHao!: string;
  //任务来源
  taskSourceDict!: string;
  //任务来源
  taskSource!: string;
  //取样人
  samplingUserid!: string;
  //取样人
  samplingUserName!: string;
  //取样地点
  samplingSpot!: string;
  //取样日期（灰）
  samplingAshDate!: string;
  //水样来源
  waterSampleSource!: string;
  //水样桶号
  waterSampleBarrelNumber!: string;
  //取样日期（水）
  samplingWaterDate!: string;
  //构造区块
  structuralBlockDict!: string;
  //构造区块
  structuralBlock!: string;
  //井号
  wellsNumberDict!: string;
  //井号
  wellsNumber!: string;
  //完成日期
  finishDate!: string;
  //井深
  wellsDepth!: number;
  //垂深
  verticalDepth!: number;
  //套管尺寸
  casingSize!: number;
  //固井方式
  cementingModeDict!: string;
  //固井方式
  cementingMode!: string;
  //备注
  remark!: string;
  //实验人员
  experimentUserid!: string;
  //实验人员
  experimentUserName!: string;
  //是否删除
  isDel: number = 0;
  //实验条件
  cemlabExperimentConditionList: Array<CemlabExperimentCondition> = new Array();
  //样品信息
  experimentSpecimenList: Array<CemlabExperimentSpecimen> = new Array();
  //附带样品信息
  experimentSpecimenSonList: Array<CemlabExperimentSpecimen> = new Array();
  //检测项目
  cemlabExperimentItemsList: Array<CemlabExperimentItems> = new Array();
}
