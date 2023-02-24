/**
 * @Description 资产调配明细
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-11-24 16:30:16
 */

export default class AssetMaterialDeployDetail {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.assetsId = data.id;
            this.id = "";
        }
    }
    //主键
    id!: string;
    //资产调配id
    deployId!: string;
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
    //税率
    taxRate!: number;
    //物资id
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
    //说明
    explanation!: string;
    //sku属性
    skuCode!: string;
    //sku全路径id
    skuFullId!: string;
    //sku全路径名称
    skuFullName!: string;
    //资产自编码
    assetSelfCode!: string;
    //库存数量
    assetsNumber!: number;
    //可用数量
    usableNumber!: number;
    //调配数量
    deployNumber!: number;
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
}