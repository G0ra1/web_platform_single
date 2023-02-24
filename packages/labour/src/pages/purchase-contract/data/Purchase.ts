

export default class Purchase {
    //合同名称
    contractname!: string;
    //合同编号
    contractcode!: string;
    //采购单位
    purchaseunit!: string;
    //合同类型
    purchasesubtype!: string;
    //合同状态
    contractstatus!: string;
    //采购类型
    purchasetype!: string;
    //数据完善状态
    datastatus!: string;
    //初始额
    initamount!: string;
    //变更额
    changeamout!: number;
    //合同总额
    contractamount!: number;
    //预计履约执行金额
    estimateexecamount!: number;
    //实际履约执行金额
    actualexecamount!: number;
    //税率
    taxrateName!: string;
    //发票类型
    invoiceTypeName!: string;
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
}