/**
 * @Description 采购信息登记明细
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:58
 */

export default class AssetPurchaseRegisterAssets {
    //主键
    id!: string;
    //购置申请id;购置申请id
    applyId!: string;
    //购置申请编号
    applyCode!: string;
    //购置申请详情id
    applyDetailId!: string;
    //采购登记id
    registerId!: string;
    //全路径
    route!: string;
    //全路径名称
    routeName!: string;
    //分类id
    classifyId!: string;
    //物资分类编码;物资分类编码
    classifyCode!: string;
    //物资分类名称;物资分类名称
    classifyName!: string;
    //物资类型;物资类型
    itemType!: string;
    //物资编码;物资编码
    itemCode!: string;
    //物资名称;物资名称
    itemName!: string;
    //物资长描述;物资长描述
    desclong!: string;
    //物资短描述;物资短描述
    descshort!: string;
    //物资单位编码
    unitCode!: string;
    //物资单位名称
    unitName!: string;
    //物资规格
    specs!: string;
    //物资标准
    standard!: string;
    //物资材质
    materialQuality!: string;
    //用途
    purpose!: string;
    //说明
    explanation!: string;
    //申请数量
    applyNumber!: number;
    //采购税率
    registerTaxRate!: number;
    //采购数量
    registerNumber!: number;
    //要求到货时间
    requireTime!: string;
    //供应商
    supplierName!: string;
    //合同号
    contractCode!: string;
    //预计到货时间
    planTime!: string;
    //物资购置类型
    purchaseType!: number;
    //子集编码拼接
    skuCodes!: string;
    //申请含税单价
    applyAmount!: number;
    //申请不含税单价
    applyUntaxedAmount!: number;
    //申请单价税额
    applyTaxAmount!: number;
    //申请含税总价
    applySumAmount!: number;
    //申请不含税总价
    applySumUntaxedAmount!: number;
    //申请总价税额
    applySumTaxAmount!: number;
    //采购含税单价
    registerAmount!: number;
    //采购不含税单价
    registerUntaxedAmount!: number;
    //采购含税总价
    registerSumAmount!: number;
    //采购税额
    registerTaxAmount!: number;
    //采购不含税总价
    registerSumUntaxedAmount!: number;
    //采购总税额
    registerSumTaxAmount!: number;
    //物资Id
    itemId!: string;
    //供应商id
    supplierId!: string;
    //合同id
    contractId!: string;
}