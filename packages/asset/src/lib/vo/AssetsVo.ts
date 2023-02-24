/**
 * @Description 资产台账
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-08 10:26:02
 */

export default class AssetsVo {
    //主键
    id!: string;
    //资产所属部门
    assetDeptId!: string;
    //资产所属部门名称
    assetDeptName!: string;
    //资产所属机构id
    assetOrgId!: string;
    //资产所属机构名称
    assetOrgName!: string;
    //组织全路径ID
    assetOrgFullId!: string;
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
    //总数量
    assetsNumber!: number;
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
    //借入数量
    borrowNumber!: number;
    //入库数量
    storageNumber!: number;
    //验收数量
    acceptanceNumber!: number;
    //可用数量
    usableNumber!: number;
    //入账数量
    entryNumber!: number;
    //借出数量
    lendNumber!: number;
    //物资类型
    itemType!: string;
    //登记/验收id
    sourceId!: string;
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
    //物资来源
    assetSource!: number;
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