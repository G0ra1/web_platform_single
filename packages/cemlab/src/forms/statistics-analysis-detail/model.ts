/**
 * @Description 统计分析详情
 * @author 云数网讯 wangzehua@netwisd.com@netwisd.com
 * @date 2023-02-16 12:04:05
 */

export default class CemlabStatisticsAnalysisDetail {
    //主键
    id!: string;
    //实验人员
    experimentUserid!: string;
    //实验人员
    experimentUserName!: string;
    //实验时间
    experimentDate!: string;
    //实验过程结果项
    resultItem!: string;
    //实验过程结果项字典值
    resultItemDict!: string;
    //实验过程结果项值
    resultItemVal!: string;
    //任务单号
    experimentReceiptsCode!: string;
    //所属单位ID
    experimentReceiptsOrgId!: string;
    //所属单位名称
    experimentReceiptsOrgName!: string;
}