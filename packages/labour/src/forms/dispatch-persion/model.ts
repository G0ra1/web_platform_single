/**
 * @Description 派遣单人员
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */

export default class LabourDispatchPersion {
    //主键
    id!: string;
    //派遣单id
    dispatchid!: string;
    //人员ID
    suppUserId!: string;
    //人员姓名
    suppUserName!: string;
    //身份证号码
    idCard!: string;
    //岗位id（字典类型为outer_discipline）
    outerDisciplineId!: string;
    //岗位名称（字典类型为outer_discipline_name）
    outerDisciplineName!: string;
    //专业id（字典类型为post_rank_id）
    postRankId!: string;
    //人员岗位
    postRankName!: string;
    //是否工时制;是否工时制（0否；1是）
    isHour!: number;
    //人员手机号
    suppUserPhone!: string;
}