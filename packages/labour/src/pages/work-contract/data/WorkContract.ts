export default class WorkContract {
    //合同名称
    contractname!: string;
    //合同编号
    contractcode!:string;
    //所属公司
    organname!:string;
    //合同类型
    type!:string;
    //状态
    contractstatus!:string;
    //类型
    contracttypename!:string;
    //业务单位
    ownercompanyname!: string;
    //签订日期
    signdate!: string;
    //开始日期
    startdate!:string;
    //完成日期
    finishdate!:string;
    //关闭日期
    closedate!:string;
    //初始额(含税)
    estimateinitamount!:number;
    //初始额(不含税)
    estimateinitamountnotax!:number;
    //变更额(含税)
    changeamout!:number;
    //变更额(不含税)
    changeamoutnotax!:number;
    //合同总额(含税)
    contractamount!: number;
    //合同总额(不含税)
    contractamountnotax!: number;
    //子合同/子订单累计金额(含税)
    exectotalamount!: number;
    //子合同/子订单累计金额(不含税)
    exectotalamountnotax!: number;
    //预计计算成本
    estimatesettlementamount!: number;
    //实际计算成本
    actualsettlementamount!: number;
}