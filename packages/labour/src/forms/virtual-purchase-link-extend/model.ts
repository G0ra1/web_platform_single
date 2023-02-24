/**
 * @Description 采购合同扩展信息
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

export default class LabourVirtualPurchaseLinkExtend {
    //主键
    id!: string;
    //关联虚拟订单id
    purchaseLinkId!: string;
    //税率
    taxrateName!: string;
    //税率
    taxrate!: string;
    //发票类型
    invoiceTypeName!: string;
    //发票类型
    invoiceType!: string;
    //申请日期
    applyTime!: string;
    //工时时薪
    workHourAmount!: number;
    //加班时薪
    overtimeHourAmount!: number;
    //工作日加班倍数
    workdayOvertimeCoefficient!: number;
    //休息日加班倍数
    dayOffOvertimeCoefficient!: number;
    //法定休假日加班倍数
    legalDayOffOvertimeCoefficient!: number;
    //合同名称
    contractname!: string;
    //合同code
    contractcode!: string;
    //甲方单位
    partaname!: string;
    //需求计划id
    planId!: string;
}