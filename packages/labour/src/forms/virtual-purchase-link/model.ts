/**
 * @Description 虚拟订单
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

export default class LabourVirtualPurchaseLink {
    //主键
    id!: string;
    //需求计划id
    planId!: string;
    //需求计划名称
    planName!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //虚拟订单code
    virtualPurchaseCode!: string;
    //虚拟订单id
    virtualPurchaseId!: string;
    //关联采购合同id
    contractPurchaseId!: string;
    //采购合同code
    contractPurchaseCode!: string;
    //采购合同name
    contractPurchaseName!: string;
    isEditPurchaseExtend!:boolean;
    isEditPurchasePrice!:boolean;

    labourVirtualPurchaseLinkExtendList ?: Array<LabourVirtualPurchaseLinkExtend>;
    labourVirtualPurchaseLinkPriceList?: Array<LabourVirtualPurchaseLinkPrice>;
}
export  class LabourVirtualPurchaseLinkExtend {
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
    // 工时时薪Code
    workHourAmountCode!:string;
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
export  class LabourVirtualPurchaseLinkPrice {
    //主键
    id!: string;
    //虚拟订单id
    purchaseLinkId!: string;
    //合同名称
    contractName!: string;
    //合同code
    contractCode!: string;
    //专业(规格型号);字典编码outer_discipline
    outerDisciplineId!: string;
    //专业名称(规格型号)
    outerDisciplineName!: string;
    //休息方式;1单休2双休3不休
    restMode!: string;
    //单位;1人/天2人/月
    unit!: number;
    //数量
    number!: number;
    //价格
    price!: number;
    //价格不含税
    priceNotax!: number;
    //总价含税
    totalAmount!: number;
    //总价不含税
    totalAmountNotax!: number;
    //申请日期
    applyTime!: string;
    //甲方单位
    partaname!: string;
    //需求计划id
    planId!: string;
}
