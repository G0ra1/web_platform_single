/**
 * @Description 委托合同任务详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
 */
import CemlabExperimentCondition from "./conditionModel"
import CemlabExperimentItems from "./itemsModel"
import CemlabExperimentSpecimen from "./specimenModel"
import CemlabExperimentProcess from './experimentTaskModel';
export default class CemlabExperimentTask {
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
    //实验单据类型;1内部通知单2委托合同单
    type!: number;
    //任务名称
    taskName!: string;
    //实验人员
    experimentUserid!: string;
    //实验人员
    experimentUserName!: string;
    //数据状态;1未完成2已完成
    status!: number;
    //是否删除
    isDel!: number;
    finishDate!: string;
    //备注
    remark!: string;
    //实验条件
    cemlabExperimentConditionList: Array<CemlabExperimentCondition> = new Array();
    //样品信息
    experimentSpecimenList: Array<CemlabExperimentSpecimen> = new Array();
    //附带样品信息
    experimentSpecimenSonList: Array<CemlabExperimentSpecimen> = new Array();
    //检测项目
    cemlabExperimentItemsList: Array<CemlabExperimentItems> = new Array();
    //试验单列表
    experimentProcessList: Array<CemlabExperimentProcessList> = new Array();
}
//
class CemlabExperimentProcessList {
    //任务id
    id!: string;
    //实验时间
    experimentDate!: string;
    //实验名称
    experimentName!: string;
}