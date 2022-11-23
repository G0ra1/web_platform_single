// api
import { request } from '@platform/main'




//字典 调用
export function dictItemLists (id) {
    return request({
        url: `/main/dictItem/list?dictCode=${id}`,
        method: 'get',
    })
  }
  export function mdmRoleList (params) {
    return request({
        url: `/main/mdmRole/list`,
        method: 'post',
        data: params
    })
  }
  export function creatMdmRole (params) {
    return request({
        url: `/main/mdmRole`,
        method: 'post',
        data: params
    })
  }
  export function editMdmRole (params) {
    return request({
        url: `/main/mdmRole`,
        method: 'put',
        data: params
    })
  }
  
  export function del (id) {
    return request({
        url: `/main/mdmRole/${id}`,
        method: 'delete',
    })
  }
  
  export function mdmSysLists (params) {
    return request({
        url: `/main/mdmSys/lists`,
        method: 'post',
        data: params
    })
  }

   // 根据角色id 查询关联的资源信息
 export function getMdmPostByOrgId (params) {
  return request({
      url: `/main/mdmRoleResource/getByRoleId?roleId=${params.id}`,
      method: 'get',
  })
}

// 资源列表
export function sourceList(params) {
  return request({
      url: `/main/mdmMenu/treeList`,
      method: 'post',
      data: params
  })
}

//资源与角色关系
export function mdmRoleResource (params) {
  return request({
      url: `/main/mdmRoleResource`,
      method: 'post',
      data: params
  })
}

// 查询树形
export function queryApp(data) {
  return request({
      url: `/main/mdmApp/tree`,
      method: 'post',
      data
  })
}

// 组织机构列表
export function  rightList(params) {
  return request({
      url: `/main/mdmOrg/list`,
      method: 'post',
      data: params
  })
}

// 通过组织id查询所有岗位
export function allPostList (params) {
  return request({
      url: `/main/mdmPost/org/all`,
      method: 'post',
      data:params
  })
}
  // 人员列表
  export function  empLists(params) {
    return request({
        url: `/main/mdmUser/lists`,
        method: 'post',
        data: params
    })
  }

    // 岗位列表
export function  postLists(params) {
  return request({
      url: `/main/mdmPost/lists`,
      method: 'post',
      data: params
  })
}

//设置角色和岗位角色和人员的关系
export function setRolePostUserRel (params) {
  return request({
      url: `/main/mdmRole/setRolePostUserRel`,
      method: 'post',
      data: params
  })
}
 // 根据角色id 获取角色岗位角色和人员的关系
 export function getRolePostUserRel (params) {
  return request({
      url: `/main/mdmRole/getRolePostUserRel?roleId=${params.id}`,
      method: 'get',
  })
}