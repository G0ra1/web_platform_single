/**
 * @Description 资产退还详情
 * @author 云数网讯 chaixinka@netwisd.com@netwisd.com
 * @date 2022-12-28 15:39:16
 */

export default class AssetMaterialRefundDetail {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.assetsDetailId = data.id;
            this.id = "";
        }
    }
    //借用入库详情Id
    purchaseStorageDetailId!: string;
    //主键
    id!: string;
    //退库id
    refundId!: string;
    //借用id
    borrowId!: string;
    //借用明细id
    borrowDetailId!: string;
    //资产id
    assetsId!: string;
    //资产明细id
    assetsDetailId!: string;
    //资产出库id
    assetsAcceptId!: string;
    //物资Id
    itemId!: string;
    //物资编码
    itemCode!: string;
    //物资名称
    itemName!: string;
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
    //资产标签
    assetsLabel!: string;
    //仓库地点
    warehouseId!: string;
    //仓库地点
    warehouseName!: string;
    //货架号
    shelfId!: string;
    //货架号
    shelfName!: string;
    //税率
    taxRate!: number;
    //出库数量
    acceptNumber!: number;
    //退库数量
    refundNumber!: number;
    //物资退库单价
    refundAmount!: number;
    //物资退库单价-未税
    refundUntaxedAmount!: number;
    //物资退库税额
    refundTaxAmount!: number;
}