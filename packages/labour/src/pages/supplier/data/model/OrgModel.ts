/*
 * @Author: zouliming 
 * @Date: 2022-11-13 11:56:03 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-13 11:56:25
 * @Description: 组织的model类
 */

import { initCustomFormatter } from "vue";
import OrgVo from "../vo/OrgVo";

export default class OrgModel {
    //主键
    id!: string;
    //组织代码
    orgCode!: string;
    //组织名称
    orgName!: string;
    //组织简称
    orgShortName!: string;
    //组织类型
    orgType!: number;
    //父级ID
    parentId!: string;
    //父级名称
    parentName!: string;
    //层级
    level!: number;
    //排序字段
    sort: number = 1;
    //是否有子集
    hasKids!: number;
    //状态标识
    status: number = 1;
    //机构有效开始时间
    validStartTime!: string;
    //机构有效结束时间
    validEndTime!: string;
    //机构地址
    orgAddr!: string;
    //邮编code
    zipCode!: string;
    //关联的供应商用户信息
    linkUserId!: string;
    //管理员账号
    username!: string;
    //管理员密码
    password!: string;
    //WEBURL
    webUrl!: string;
    //地区
    area!: string;
    //备注
    remark!: string;

    constructor();

    constructor(orgVo: OrgVo, isParent: boolean);

    /**
     * 构建器重载
     * @param option 
     * @returns 
     */
    constructor(orgVo?: OrgVo, isParent?: boolean) {
        if (orgVo !== undefined) {
            if (isParent) {
                this.parentId = orgVo.id;
                this.parentName = orgVo.orgName;
                return this;
            } else {
                return Object.assign(this, orgVo);
            }

        }
    }

    static init(isParent: boolean) {
        const orgModel = new OrgModel();
        if (isParent) {
            orgModel.id = "70";
            orgModel.orgCode = "waixie";
            orgModel.orgName = "外协公司";
            orgModel.orgShortName = "外协公司";
            orgModel.orgType = 1;
            orgModel.parentId = "0";
            orgModel.parentName = "root";
            orgModel.level = 1;
        } else {
            orgModel.parentId = "70";
            orgModel.parentName = "外协公司";
        }
        return orgModel;
    }
}