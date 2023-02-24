/**
 * @Description 请假表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 15:43:03
 */

export default class LabourAttendanceVacate {
    //唯一标识
    id!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //所在班组id
    banId!: string;
    //所在班组名称
    banName!: string;
    //所在劳务公司id
    labourCompanyId!: string;
    //所在劳务公司名称
    labourCompanyName!: string;
    //请假类型：1病假、2事假、3年假（计成本）
    vacateType!: number;
    //请假申请日期
    vacateApplyDate!: string;
    //请假开始日期
    vacateDateStart!: string;
    //请假结束日期
    vacateDateEnd!: string;
    //请假总时长（天）
    vacateLenth!: number;
    //备注
    remark!: string;
    //状态：1未办理、2已同意、3已拒绝
    vacateState!: number;
    //班长备注
    monitorRemark!: string;
    //承包合同id
    contractWorkId!: string;
    //承包合同编号
    contractWorkCode!: string;
    //承包合同名称
    contractWorkName!: string;
    //承包合同预计成本
    estimatesettlementamount!: number;
    //承包合同实际成本
    estimateinitamountnotax!: number;
    //虚拟订单id
    virtualPurchaseId!: string;
    //虚拟订单编号
    virtualPurchaseCode!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //采购合同预计履约金额
    estimateexecamount!: number;
    //采购合同实际履约金额
    actualexecamount!: number;
    //结算状态-1未结算-2结算中-3已结算
    settlementState!: number;
    //结算时间
    settlementDate!: string;
    //结算单id
    statementId!: string;
    //结算单名称
    statementName!: string;
    //请假申请时间
    vacateApplyDateTime!: string;
}