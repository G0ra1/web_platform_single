/**
 * @Description 派遣单
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */
class LabourDispatchPersion {
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
export default class LabourDispatch {
    //主键
    id!: string;
    //
    dispatchCategory!: string;
    //大修id
    daxiuid!: string;
    //大修名称
    daxiuname!: string;
    //承包合同id
    workcontractid!: string;
    //承包合同名称
    workcontractname!: string;
    //申请人名称
    applyName!: string;
    //申请人id
    applyId!: string;
    //申请时间
    applyTime!: string;
    //派遣日期
    dispatchDate!: string;
    //派遣类别
    dispatchTypeName!: string;
    //派遣类别标识 1-大修 2-日常 3-专项
    dispatchType!: number;
    //大修编码
    daxiucode!: string;
    //承包合同编码
    workcontractcode!: string;

    labourDispatchPersionList?: Array<LabourDispatchPersion>

}