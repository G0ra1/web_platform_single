/**
 * @Description 仓库管理 编辑页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-22 15:05:10
 */

export default class AssetWarehouse {
    //主键
    id!: string;
    //仓库名称
    warehouseName!: string;
    //所属机构
    orgId!: string;
    //所属机构
    orgName!: string;
    //父级组织全路径ID
    orgFullId!: string;
    //父级组织全路径名称
    orgFullName!: string;
    //所属部门
    deptId!: string;
    //所属部门
    deptName!: string;
    //仓库地点
    address!: string;
    //责任人
    respondUserId!: string;
    //责任人
    respondUserName!: string;
    //删除标识
    delFlag!: string;
    //类型
    houseType!: number;
    //备注
    remark!: string;
    //货架信息
    shelfList!: Array<ShelfVo>;
    mdmUser!: Array<MdmUser>;

}
class ShelfVo {
    warehouseId!: string;
    warehouseName!: string;
    shelfName!: string;
    delFlag!: string;
}
class MdmUser {
    userNameCh!: string;
    dutyName!: string;
    parentDeptName!: string;
}