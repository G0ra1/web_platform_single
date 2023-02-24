/**
 * @Description 盘点详情
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-30 15:05:25
 */

export default class InventoryPlanDetail {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }
    //主键
    id!: string;
    //盘点id
    inventoryId!: string;
    //资产id
    assetsId!: string;
    //资产明细Id
    assetsDetailId!: string;
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
    //资产编号
    assetsCode!: string;
    //资产标签
    assetsLabel!: string;
    //入账日期
    rzDate!: string;
    //物资数量
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
    //账面数量
    paperNumber : number = 0;
    //实盘数量
    inventoryNumber : number = 0;
    //盘点说明
    inventoryReason!: string;
    //资产自编码
    assetSelfCode!: string;
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
    //财务编码
    assetFinanceCode!: string;

    //未盘点数量
    notFinishNumber : number = 0;
    //已盘点数量
    finishNumber : number = 0;
}