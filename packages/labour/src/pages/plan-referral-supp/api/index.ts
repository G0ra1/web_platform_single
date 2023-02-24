/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:52:28 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-12 12:38:40
 * @Description 请求后台的接口
 */

import { Request,request } from '@platform/main'
import OrgVo from '../data/vo/OrgVo';
import LabourPlanReferral from '../data/model/LabourPlanReferral';
import {LabourPlanVo, LabourPlanPersonVo} from '../data/vo/LabourPlanVo';

//根据需求计划和供应商信息 查询出 所有已推荐的人员信息
export function getByPlanIdAndSuppId(key: string): Promise<Array<LabourPlanReferral>> {
    return new Request<object, Array<LabourPlanReferral>>(
        `/labour/labourPlanReferral/getByPlanIdAndSuppId/${key}`,
        'get'
    ).send()
}

//保存人员推荐信息
export function savePlanReferralList(labourPlanReferrals: Array<LabourPlanReferral>): Promise<boolean> {
    return new Request<object, boolean>(
        `/labour/labourPlanReferral/saveList`,
        'post',
        labourPlanReferrals
    ).send()
}

//根据需求计划id 查询订单详情
export function getPlanByPlanId(key: string): Promise<LabourPlanVo> {
    return new Request<object, LabourPlanVo>(
        `/labour/labourPlan/${key}`,
        'get'
    ).send()
}

//根据需求计划id 查询专业信息 以及推荐人数
export function getPersionByPlan(data : any): Promise<LabourPlanPersonVo> {
    return new Request<object, LabourPlanPersonVo>(
        `/labour/labourPlanPerson/getPersionByPlan`,
        'post',
        data
    ).send()
}




//根据需求计划id 查询专业信息 以及推荐人数
export function getPositionInfo(date:any): Promise<LabourPlanPersonVo> {
    return new Request(
         `/labour/labourPlanPerson/getPositionInfo`,
        'post',
        date
    ).send()
}