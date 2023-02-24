/*
 * @Author: zouliming 
 * @Date: 2022-11-13 11:56:03 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-13 11:56:25
 * @Description: 组织的model类
 */


export default class  LabourPlanReferral {
    //主键
    id!: string;
    //需求计划id
    planId!: string;
    //专业（字典类型为outer_discipline）
    outerDisciplineId!: string;
    //专业名称（字典类型为outer_discipline）
    outerDisciplineName!: string;
    //岗位id（字典类型为postRank）
    postRankId!: string;
    //岗位名称（字典类型为postRank）
    postRankName!: string;
    //父级名称
    parentName!: string;
    //是否工时制（0否；1是）
    isHour!: number;
    //供应商组织id
    suppOrgId!: string;
    //供应商组织code
    suppOrgCode!: string;
    //录用状态（pass 未录用；interview面试；stay_entrance待入场；）
    referralStatus!: string;
    //劳务人员id
    suppUserId!: string;
    //劳务人员名称
    suppUserName!: string;
    //面试时间
    planEntryTime!: string;
    //预计入场时间
    interviewTime!: string;
    //身份证号
    idCard!: string;
    //手机号
    phoneNum!: string;
    //性别（1男；2女）
    sex!: number;
    //班组id
    banId!: string;
    //班组名称
    banName!: string;
    
}