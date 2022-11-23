// api
import { request } from '@platform/main'
// 树形结构  1 机构   2 部门  0所有
export function treeList (params) {
    return request({
        url: `/mdm/mdmOrg/trees/${params.type}`,
        method: 'get',
    })
  }
  

// 组织机构列表
export function  rightList(params) {
  return request({
      url: `/mdm/mdmOrg/list`,
      method: 'post',
      data: params
  })
}

// 校验当前登陆人的三员角色是否在该机构下面
export async function checkOrg (params) {
  let bool = await request({
      url: `/mdm/syRole/checkOrg/${params}`,
      method: 'get',
  })
  if(!bool) return Promise.reject('无操作权限');
  return true;
}

// 出给定组织下的一级子组织
export function organList (id) {
  return request({
      url: `/mdm/mdmOrg/kids/${id}`,
      method: 'get',
  })
}


// 添加树形结构
export function creatOrg (params) {
  return request({
      url: `/mdm/mdmOrg`,
      method: 'post',
      data: params
  })
}
// 修改机构构
export function editOrg (params) {
  return request({
      url: `/mdm/mdmOrg`,
      method: 'put',
      data: params
  })
}

// 修改机构名称
export function updateOrgName (params) {
  return request({
      url: `/mdm/mdmOrg/updateOrgName`,
      method: 'put',
      data: params
  })
}

// 修改组织状态-如拆分、撤消等
export function updateStatus (params) {
  return request({
      url: `/mdm/mdmOrg/updateStatus`,
      method: 'put',
      data: params
  })
}
// 修改组织父级
export function updateParent (params) {
  return request({
      url: `/mdm/mdmOrg/updateParent`,
      method: 'put',
      data: params
  })
}


// 通过组织id查询所有岗位
export function allPostList (params) {
  return request({
      url: `/mdm/mdmPost/org/all`,
      method: 'post',
      data:params
  })
}



// 通过组织id查询所有职务
export function allDutyList (params) {
  return request({
      url: `/mdm/mdmDuty/org/all`,
      method: 'post',
      data:params
  })
}
// 同步机构岗位
export function syncGuFenOrgAndPostIncrement (params) {
  return request({
      url: `/mdm/syncGuFen/syncGuFenOrgAndPostIncrement`,
      method: 'get',
     
  })
}


// 机构排序
export function orgSort (params) {
  return request({
      url: `/mdm/mdmOrg/sort`,
      method: 'post',
      data:params
  })
}

// 恢复撤销
export function backoutOrg (id) {
  return request({
      url: `/mdm/mdmOrg/backoutOrg/${id}`,
      method: 'get',
  })
}

export function mdmDutyVersionList (d) {
  return request({
      url: `/mdm/mdmOrgVersion/list?orgId=${d}`,
      method: 'get',
  })
}

export function settingMainVersion (d) {
  return request({
      url: `/mdm/mdmOrgVersion/settingMainVersion?id=${d}`,
      method: 'get',
  })
}
//  版本删除
export function mdmDutyVersionDel (ids) {
  return request({
      url: `/mdm/mdmOrgVersion/${ids}`,
      method: 'delete',
  })
}