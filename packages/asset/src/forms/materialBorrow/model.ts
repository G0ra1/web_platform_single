/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */
import AssetsVo from "../../lib/vo/AssetsVo"
import AssetsDetailVo from "../../lib/vo/AssetsDetailVo"
import IDto from "../../lib/dto/IDto"
 
export default class MaterialBorrow {
    //主键
    id!: string;
    //编号
    code!: string;
    //说明
    explanation!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //出库数量
    deliveryNumber!: number;
    //未出库数量
    notDeliveryNumber!: number;
    //入库数量
    intoNumber!: number;
    //未入库数量
    notIntoNumber!: number;
    //借出单位id
    borrowOrgId!: string;
    //借出单位
    borrowOrgName!: string;
    //借出部门id
    borrowDeptId!: string;
    //借出部门
    borrowDeptName!: string;
    //借出负责人id
    borrowUserId!: string;
    //借出负责人
    borrowUserName!: string;
    //需用部门id
    needDeptId!: string;
    //需用部门
    needDeptName!: string;
    //借用状态
    borrowState!: number;
    //申请人
    createUserName!: string;
    //申请人机构
    createUserParentOrgName!: string;
    //申请人部门
    createUserParentDeptName!: string;
    //申请时间
    createTime!: string;
    //物资明细
    materialBorrowDetailList: Array<MyAsset> = new Array();
    //资产台账传参
    assetParams: MyAssetDto = new MyAssetDto();
}

//业务子表的表单示例
class MyAsset {
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
            this.assetsId = data.id;
            this.borrowNumber = 0;
            this.id = "";
        }
    }
    id!: string;
    assetsId!: string;
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
}

//调用组件的参数类示例
class MyAssetDto extends IDto {
    assetOrgId!: string;
    usableNumber: number = 0;
}

export {
    MyAsset
}