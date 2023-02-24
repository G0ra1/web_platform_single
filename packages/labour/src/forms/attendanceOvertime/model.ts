/**
 * @Description 加班表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-01 09:19:09
 */

export default class LabourAttendanceOvertime {
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
    //加班日期
    overtimeDate!: string;
    //上午开始-时
    amStartH!: string;
    //上午开始-分
    amStartM!: string;
    //上午结束-时
    amEndH!: string;
    //上午结束分
    amEndM!: string;
    //下午开始-时
    pmStartH!: string;
    //下午开始-分
    pmStartM!: string;
    //下午结束-时
    pmEndH!: string;
    //下午结束分
    pmEndM!: string;
    //晚上开始-时
    nightStartH!: string;
    //晚上开始-分
    nightStartM!: string;
    //晚上结束-时
    nightEndH!: string;
    //晚上结束分
    nightEndM!: string;
    //加班时长
    overLength!: number;
    //备注
    remark!: string;
    //状态：1未办理、2已同意、3已拒绝
    overtimeState!: number;
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
}