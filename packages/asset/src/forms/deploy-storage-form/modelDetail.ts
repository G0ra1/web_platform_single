/**
 * @Description 物资调拨入库明细
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-22 15:30:24
 */

export default class AssetPurchaseStorageDetail {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.deliveryDetailId = data.id;
            this.id = "";
        }
    }
    //主键
    id!: string;
    //资产入库id
    storageId!: string;
    //资产台账id
    assetsId!: string;
    //资产明细Id
    assetsDetailId!: string;
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
    //供应商
    supplierName!: string;
    //合同号
    contractCode!: string;
    //资产分类
    assetsClassification!: string;
    //发票号
    billCodes!: string;
    //发票附件
    billCodeFilesIds!: string;
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
    //入库时间
    storageTime!: string;
    //出厂日期
    factoryDate!: string;
    //出厂编号
    factoryCode!: string;
    //进场日期
    approachDate!: string;
    //仓库地点编号
    warehouseId!: string;
    //仓库地点
    warehouseName!: string;
    //货架编号
    shelfId!: string;
    //货架号
    shelfName!: string;
    //资产编号
    assetsCode!: string;
    //资产标签
    assetsLabel!: string;
    //入账日期
    rzDate!: string;
    //实际到货时间
    realTime!: string;
    //验收时间
    accpetanceTime!: string;
    //验收编号
    accpetanceCode!: string;
    //物资数量
    assetsNumber!: number;
    //物资购置类型
    purchaseType!: number;
    //设备出厂SN号
    factorySn!: string;
    //设备出厂资料
    factoryData!: string;
    //设备验收照片
    acceptPhoto!: string;
    //入库物资来源id
    sourceId!: string;
    //入库物资来源详情id
    sourceDetailId!: string;
    //入库物资来源资产详情id
    sourceAssetsId!: string;
    //入库来源
    storageSourch!: string;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //供应商id
    supplierId!: string;
    //合同id
    contractId!: string;
    //物资Id
    itemId!: string;
    //入库数量
    storageNumber!: number;
    //物资原值单价
    storageAmount!: number;
    //物资原值单价-未税
    storageUntaxedAmount!: number;
    //入库原值税额
    storageTaxAmount!: number;
    //入库原值总价
    storageSumAmount!: number;
    //入库原值总价-未税
    storageSumUntaxedAmount!: number;
    //入库原值总税额
    storageSumTaxAmount!: number;
    //物项来源
    assetSource!: number;
    //资产sku台账id
    assetsSkuId!: string;
    //税率
    storageTaxRate!: number;
    //资产自编码
    assetSelfCode!: string;
    //条件码文件id
    barCodeFile!: string;
    //条件码
    barCode!: string;
    //资产分类编码
    classifyTypeCode!: string;
    //资产分类名称
    classifyTypeName!: string;
     //资产所属机构id
     assetOrgId!: string;
     //资产所属机构名称
     assetOrgName!: string;
     //组织全路径ID
     assetOrgFullId!: string;
     //资产所属部门
     assetDeptId!: string;
     //资产所属部门名称
    assetDeptName!: string;
    deliveryId!: string;
    deliveryDetailId!: string;
}