export default class MdmMenuTreeVo {
    id!: string;
    menuCode!: string;
    menuName!: string;
    //菜单类型 -1:业务菜单入口，0:一级页面 3：菜单分类
    menuType!: number;
    kids!: Array<MdmMenuVo>;
    menuIcon!: string;
    sort!: number;
    bizMenuId!: string;
    bizMenuCode!: string;
    bizMenuName!: string;
    bizMenuIcon!: string;
    buttonCode!: string;
    buttonIcon!: string;
    buttonType!: string;
    buttonSize!: string;
    functionId!: string;
    functionName!: string;
    parentId!: string;
    parentName!: string;
    parentFullId!: string;
    parentFullName!: string;
}

class MdmMenuVo extends MdmMenuTreeVo {

}