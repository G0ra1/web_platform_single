/*
 * @Author: zouliming 
 * @Date: 2022-11-12 11:53:21 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-12 22:38:29
 * @Description: 供应商组织vo
 */

export default interface LabourPlanSuppOrgVo {
    //主键
    id: string;
    //需求计划id
    planId: string;
    //供应商组织id
    suppOrgId: string;
    //供应商组织code
    suppOrgCode: string;
    //供应商组织code
    suppOrgName: string;
    //虚拟的父级别
    parentId: 70;
    //供应商组织简称
    suppOrgShortName: string;
    //子节点
    kids: Array<LabourPlanSuppOrgVo>;
}
