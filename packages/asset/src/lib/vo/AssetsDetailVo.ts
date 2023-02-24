/**
 * @Description 资产明细
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-08 10:23:37
 */

export default class AssetsDetailVo {
    //主键
    id!: string;
    //资产id
    assetsId!: string;
    //分类id
    classifyId!: string;
    //分类编码
    classifyCode!: string;
    //分类名称
    classifyName!: string;
    //物资分类全路径
    route!: string;
    //物资分类全路径名称
    routeName!: string;
    //分类类别Id
    categoryId!: string;
    //分类类别编码
    categoryCode!: string;
    //分类类别名称
    categoryName!: string;
    //税率
    taxRate!: number;
    //物资Id
    itemId!: string;
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
    //订单编号
    orderCode!: string;
    //资产分类
    assetsClassification!: string;
    //验收数量
    acceptanceNumber!: number;
    //发票号
    billCodes!: string;
    //发票附件
    billCodeFilesIds!: string;
    //资产编号
    assetsCode!: string;
    //资产标签
    assetsLabel!: string;
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
    //货架号
    shelfName!: string;
    //入账日期
    rzDate!: string;
    //总数量
    assetsNumber!: number;
    //物资原值单价
    assetsAmount!: number;
    //物资原值单价-未税
    assetsUntaxedAmount!: number;
    //物资原值税额
    assetsTaxAmount!: number;
    //物资原值总价
    assetsSumAmount!: number;
    //物资原值总价-未税
    assetsSumUntaxedAmount!: number;
    //物资原值总税额
    assetsSumTaxAmount!: number;
    //出库数量
    deliveryNumber!: number;
    //领用数量
    acceptNumber!: number;
    //库存数量
    stockNumber!: number;
    //维修数量
    repairNumber!: number;
    //报废数量
    scrappedNumber!: number;
    //调拨数量
    transferNumber!: number;
    //资产入库状态
    warehouseState!: string;
    //净值率
    netRate!: number;
    //预计净残值
    estlimateNetSalvage!: number;
    //是否涉密
    secretRelated!: number;
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
    //资产所属人
    assetUserId!: string;
    //资产所属人名称
    assetUserName!: string;
    //入库数量
    storageNumber!: number;
    //可用数量
    usableNumber!: number;
    //入账数量
    entryNumber!: number;
    //借入数量
    borrowNumber!: number;
    //借出数量
    lendNumber!: number;
    //资产使用状态
    useState!: string;
    //物资类型
    itemType!: string;
    //物资来源
    assetSource!: number;
    //物资序列号;出厂时的唯一序号
    seriesNumber!: string;
    //资产sku的id
    assetsSkuId!: string;
    //登记/验收id
    sourceId!: string;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //申请时间
    applyTime!: string;
    //申请人ID
    applyUserId!: string;
    //申请人名称
    applyUserName!: string;
    //申请人机构ID
    applyUserOrgId!: string;
    //申请人机构名称
    applyUserOrgName!: string;
    //申请人部门ID
    applyUserDeptId!: string;
    //申请人部门名称
    applyUserDeptName!: string;
    //物资状态
    status!: string;
    //采购登记人
    registerUserId!: string;
    //采购登记人
    registerUserName!: string;
    //验收人
    acceptUserId!: string;
    //验收人
    acceptUserName!: string;
    //资产自编码
    assetSelfCode!: string;
    //条件码文件id
    barCodeFile!: string;
    //条件码
    barCode!: string;
    //使用人ID
    useUserId!: string;
    //使用人名称
    useUserName!: string;
    //使用/物资所在机构ID
    useUserOrgId!: string;
    //使用机构名称
    useUserOrgName!: string;
    //使用部门ID
    useUserDeptId!: string;
    //使用部门名称
    useUserDeptName!: string;
    //资产分类编码
    classifyTypeCode!: string;
    //资产分类名称
    classifyTypeName!: string;
}