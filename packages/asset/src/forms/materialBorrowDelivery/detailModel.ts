/**
 * @Description 盘点计划详情
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-14 15:59:32
 */
import AssetBorrowDeliveryDetail from "./detailModel";
export default class AssetInventoryTaskDetail {
    //主键
    id!: string;
    //出库id
    deliveryId!: string;
    //资产id
    assetsId!: string;
    //资产明细id
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
    //资产编号
    assetsCode!: string;
    //税率
    taxRate!: number;
    //出库数量
    deliveryNumber!: number;
    //物资出库单价
    deliveryAmount!: number;
    //物资出库单价-未税
    deliveryUntaxedAmount!: number;
    //物资出库税额
    deliveryTaxAmount!: number;
    //物资出库总价
    deliverySumAmount!: number;
    //物资出库总价-未税
    deliverySumUntaxedAmount!: number;
    //物资出库总税额
    deliverySumTaxAmount!: number;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //资产自编码
    assetSelfCode!: string;
    //出库后资产编码
    deliveryAssetsCode!: string;
    //当前库存数量
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
    //借用数量
    deployNumber! : number;
    //父级id
    parentId! : string;
    //资产明细详情
    detailList: Array<AssetBorrowDeliveryDetail> = new Array(); 
}