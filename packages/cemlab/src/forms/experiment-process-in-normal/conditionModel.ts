/**
 * @Description 实验过程条件
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:08
 */

export default class CemlabExperimentProcessCondition {
    //主键
    id!: string;
    //实验过程ID
    experimentProcessId!: string;
    //实验过程条件项
    conditionItemDict!: string;
    //实验过程条件项
    conditionItem!: string;
    //实验过程条件数值
    conditionVal!: string;
    //是否删除
    isDel!: number;
}