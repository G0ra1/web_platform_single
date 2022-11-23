/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:52:28 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-12 12:38:40
 * @Description 请求后台的接口
 */

import { Request } from '@platform/main'
import OrgVo from '../data/vo/OrgVo';
import OrgModel from '../data/model/OrgModel';
// 获取供应商组织
export function getOrgTree(): Promise<Array<OrgVo>> {
    return new Request<object, Array<OrgVo>>(
        `/labour/labourSuppOrg/list`,
        'post',
        { "id": "70" }
    ).send()
}

// 新建供应商组织
export function saveOrgTree(orgModel: OrgModel): Promise<boolean> {
    return new Request<object, boolean>(
        `/labour/labourSuppOrg`,
        'post',
        orgModel
    ).send()
}

// 修改供应商组织
export function updateOrgTree(orgModel: OrgModel): Promise<boolean> {
    return new Request<object, boolean>(
        `/labour/labourSuppOrg`,
        'put',
        orgModel
    ).send()
}

// 修改供应商组织
export function delOrgTree(id: string): Promise<boolean> {
    return new Request<string, boolean>(
        `/labour/labourSuppOrg/${id}`,
        'delete'
    ).send()
}

// 同步供应商组织
export function syncOrgTree(): Promise<boolean> {
    return new Request<object, boolean>(
        `/syndata/zhjxOrg/getAll`,
        'get'
    ).send()
}