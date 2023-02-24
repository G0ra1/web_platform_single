/**
 * @Description 购置验收明细详情
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:04
 */

export default class AssetPurchaseAcceptDetail {
    //主键
    id!: string;
    //验收id
    acceptanceId!: string;
    //验收编码
    acceptanceCode!: string;
    //分类id
    classifyId!: string;
    //分类编码
    classifyCode!: string;
    //分类名称
    classifyName!: string;
    //物资类型
    itemType!: string;
    //物资分类全路径
    route!: string;
    //物资分类全路径名称
    routeName!: string;
    //物资编码
    itemCode!: string;
    //物资名称
    itemName!: string;
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
    //验收数量
    acceptanceNumber!: number;
    //资产编号
    assetsCode!: string;
    //质保等级
    qualityAssuranceLevel!: string;
    //生产商
    manufacturer!: string;
    //生产日期
    productionDate!: string;
    //使用年限
    serviceLife!: number;
    //有效期
    validPeriod!: string;
    //批次/炉号
    batchNumber!: string;
    //验收日期
    acceptanceDate!: string;
    //出厂日期
    factoryDate!: string;
    //出厂编号
    factoryCode!: string;
    //进场日期
    approachDate!: string;
    //仓库地点
    warehouseId!: string;
    //仓库地点
    warehouseName!: string;
    //货架号
    shelfId!: string;
    //设备出厂SN号
    factorySn!: string;
    //设备出厂资料
    factoryData!: string;
    //物资购置类型
    purchaseType!: number;
    //设备验收照片
    acceptPhoto!: string;
    //货架号
    shelfName!: string;
    //接收日期
    receptionDate!: string;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //验收明细Id
    acceptanceAssetsId!: string;
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
    //采购结果id
    registerResultId!: string;
    //物资Id
    itemId!: string;
    //供应商id
    supplierId!: string;
    //供应商
    supplierName!: string;
    //合同id
    contractId!: string;
    //合同号
    contractCode!: string;
    //外观检查
    exteriorCheck!: string;
    //质量验收
    qualityAcceptance!: string;
    //文件资料
    document!: string;
    //验收批次号
    acceptanceBatch!: string;
    //附件ids
    fileIds!: string;
    //资产详情id
    sourceId!: string;
    //验收状态
    acceptanceStatus!: number;
}