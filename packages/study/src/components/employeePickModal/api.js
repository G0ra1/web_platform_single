import { request } from '@platform/main'

// 组织机构列表
export function  rightList(params) {
    return request({
        url: `mdm/mdmOrg/list`,
        method: 'post',
        data: params
    })
  }
  
    // 人员列表
export function  empLists(params) {
    return request({
        url: `mdm/mdmUser/lists`,
        method: 'post',
        data: params
    })
  }
  
  // 人员多查详情
export function mdmUserIds (d) {
    return request({
        url: `main/mdmUser/getByIds?ids=${d}`,
        method: 'get',
    })
  }