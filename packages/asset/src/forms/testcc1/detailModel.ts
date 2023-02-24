/**
 * @Description 盘点计划详情
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-06 17:59:32
 */

export default class AssetInventoryTaskDetail {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.assetsId = data.id;
            this.id = "";
        }
    }
    //主键id
    id!: string;
    //盘点计划id
    inventoryPlanId!: string;
    //盘点任务id
    inventoryTaskId!: string;
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
    //质保等级
    qualityAssuranceLevel!: string;
    //资产编号
    assetsCode!: string;
    //资产标签
    assetsLabel!: string;
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
    paperNumber!: number;
    //实盘数量
    inventoryNumber!: number;
    //盘点说明
    inventoryReason!: string;
}