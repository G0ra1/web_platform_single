/**
 * @Description 采购合同单价管理
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

export default class LabourVirtualPurchaseLinkPrice {
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