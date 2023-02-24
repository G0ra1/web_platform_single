/**
 * @Description 采购合同拓展信息
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2022-11-21 11:21:01
 */

import { number } from "echarts";

 export default class PurchaseExtend {
    //主键
    id!: string;
    //采购合同ID
    contractId!: string;
    //合同名称
    contractname !:string;
    //税率
    taxrateName!: string;
    partaname !:string;

    contractcode !:string;
    //税率
    taxrate!: string;
    //发票类型
    invoiceTypeName!: string;
    //发票类型
    invoiceType!: string;
    //申请日期
    applyTime!: string;
    //工时时薪code
    workHourAmountCode!:string;
    //工时时薪
    workHourAmount !:number;
   //加班时薪
   overtimeHourAmount !:number;
   //工作日加班倍数
   workdayOvertimeCoefficient !:number;
   //休息日加班倍数
   dayOffOvertimeCoefficient !:number;
   //法定休假日加班倍数
   legalDayOffOvertimeCoefficient!:number;




}