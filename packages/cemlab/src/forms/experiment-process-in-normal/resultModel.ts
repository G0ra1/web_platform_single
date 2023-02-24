/**
 * @Description 实验过程结果
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:08
 */

export default class CemlabExperimentProcessResult {
    //主键
    id!: string;
    //实验过程ID
    experimentProcessId!: string;
    //实验过程结果项
    resultItemDict!: string;
    //实验过程结果项
    resultItem!: string;
    //实验过程结果数值
    resultVal!: string;
    //是否删除
    isDel!: number;
}