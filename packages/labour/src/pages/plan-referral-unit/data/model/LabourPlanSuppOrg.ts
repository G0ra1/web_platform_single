/*
 * @Author: zouliming 
 * @Date: 2022-11-13 11:56:03 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-13 11:56:25
 * @Description: 组织的model类
 */

import LabourPlanSuppOrgVo from "../vo/LabourPlanSuppOrgVo";

//供应商信息
export default  class LabourPlanSuppOrg {
    //主键
    id!: string;
    //需求计划id
    planId!: string;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //供应商组织code
    suppOrgName!: string;
    //虚拟父级
    parentId!:string;
    parentName!:string;
    //供应商组织简称
    suppOrgShortName!: string;
    


    constructor();

    constructor(labourPlanSuppOrgVo: LabourPlanSuppOrgVo, isParent: boolean);

    /**
     * 构建器重载
     * @param option 
     * @returns 
     */
    constructor(labourPlanSuppOrgVo?: LabourPlanSuppOrgVo, isParent?: boolean) {
        if (labourPlanSuppOrgVo !== undefined) {
            if (isParent) {
                this.parentId = labourPlanSuppOrgVo.id;
                this.suppOrgName = labourPlanSuppOrgVo.suppOrgName;
                return this;
            } else {
                return Object.assign(this, labourPlanSuppOrgVo);
            }

        }
    }

    static init(isParent: boolean) {
        const orgModel = new LabourPlanSuppOrg();
        if (isParent) {
            orgModel.id = "70";
            orgModel.suppOrgCode = "waixie";
            orgModel.suppOrgName = "外协公司";
            //orgModel.orgShortName = "外协公司";
            //orgModel.orgType = 1;
            orgModel.parentId = "0";
           //orgModel.parentName = "root";
            //orgModel.level = 1;
        } else {
            orgModel.parentId = "70";
            orgModel.parentName = "外协公司";
        }
        return orgModel;
    }
}