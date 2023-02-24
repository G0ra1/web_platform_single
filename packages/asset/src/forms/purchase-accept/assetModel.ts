/**
 * @Description 购置验收明细
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:04
 */

export default class AssetPurchaseAcceptAsset {
    //主键
    id!: string;
    //验收id
    acceptanceId!: string;
    //物资分类全路径
    route!: string;
    //物资分类全路径名称
    routeName!: string;
    //物资编码
    itemCode!: string;
    //物资名称
    itemName!: string;
    //分类id
    classifyId!: string;
    //分类编码
    classifyCode!: string;
    //分类名称
    classifyName!: string;
    //物资类型
    itemType!: string;
    //物资长描述
    desclong!: string;
    //物资短描述
    descshort!: string;
    //物资单位编码
    unitCode!: string;
    //物资单位名称
    unitName!: string;
    //物资材质
    materialQuality!: string;
    //物资标准
    standard!: string;
    //物资规格
    specs!: string;
    //供应商
    supplierName!: string;
    //合同号
    contractCode!: string;
    //验收数量
    acceptanceNumber!: number;
    //物资购置类型
    purchaseType!: number;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //采购登记Id
    registerId!: string;
    //采购登记编号
    registerCode!: string;
    //采购数量
    registerNumber!: number;
    //验收税率
    acceptanceTaxRate!: number;
    //验收单价
    acceptanceAmount!: number;
    //验收单价-未税
    acceptanceUntaxedAmount!: number;
    //验收单价-税额
    acceptanceTaxAmount!: number;
    //验收总价
    acceptanceSumAmount!: number;
    //验收总价-未税
    acceptanceSumUntaxedAmount!: number;
    //验收总价-税额
    acceptanceSumTaxAmount!: number;
    //验收编码
    acceptanceCode!: string;
    //购置结果表id
    registerResultId!: string;
    //物资Id
    itemId!: string;
    //供应商id
    supplierId!: string;
    //合同id
    contractId!: string;
    //外观检查
    exteriorCheck!: string;
    //质量验收
    qualityAcceptance!: string;
    //文件资料
    document!: string;
    //验收状态
    status!: number;
    //附件ids
    fileIds!: string;
    //购置申请id
    applyId!: string;
    //购置申请明细id
    applyDetailId!: string;
}