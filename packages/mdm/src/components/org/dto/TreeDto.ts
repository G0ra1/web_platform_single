import MdmOrgVo from "../vo/TreeVo";

export default class MdmOrgDto extends MdmOrgVo {
    //0 查树形，1查列表
    isDefault: number = 0;
    /**
     * 查的层级，如果传值，后台根据层级查，如果不传值，查整棵树，这样做的目的
     * 是为了让前端分步的自动异步请求，让用户感知效果更好；
     */
    level!: number;
    /**
     * undefined代表所有，1：组织；2：部门
     */
    orgType!: number;
    /**
     * 查询状态，1为正常状态
     */
    status: number = 1;
    constructor(orgType?: number, level?: number) {
        super();
        if (orgType !== undefined) this.orgType = orgType;
        if (level !== undefined) this.level = level
    }
}