// api
import { request } from '@platform/main'

// 岗位列表
export function  postList(params) {
    return request({
        url: `/main/mdmPost/list`,
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

//  添加岗位
  export function creatPost (params) {
    return request({
        url: `/main/mdmPost/save`,
        method: 'post',
        data: params
    })
  }
  //  修改岗位
  export function editPost (params) {
    return request({
        url: `/main/mdmPost`,
        method: 'put',
        data: params
    })
  }
  //  删除岗位
  export function del (id) {
    return request({
        url: `/main/mdmPost/${id}`,
        method: 'delete',
    })
  }

 // 岗位序列字典
export function  mdmPostSequDictList(params) {
    return request({
        url: `/main/mdmPostSequDict/list`,
        method: 'post',
        data: params
    })
  }
  
   // 岗位职等字典
export function  mdmPostGradeDictList(params) {
  return request({
      url: `/main/mdmPostGradeDict/list`,
      method: 'post',
      data: params
  })
}

   // 岗位标识字典
   export function  mdmPostTagDictList(params) {
    return request({
        url: `/main/mdmPostTagDict/list`,
        method: 'post',
        data: params
    })
  }
  // 通过部门id查询已启用的岗位
  export function orgPost (params) {
    return request({
        url: `/main/mdmPost/org/${params.id}`,
        method: 'get',
    })
  }
    // 根据OrgId查询出下面所有层级的岗位
    export function getMdmPostByOrgId (params) {
      return request({
          url: `/main/mdmPost/org/${params.id}`,
          method: 'get',
      })
    }
   // 根据岗位id 查询用户信息
   export function getUserByUserId (params) {
    return request({
        url: `/main/mdmPostUser/user/getUserByPostId/${params.id}`,
        method: 'get',
    })
  }
     // 根据用户id 查询用户岗位信息
    export function getPostByUserId (params) {
      return request({
          url: `/main/mdmPostUser/post/getPostByUserId/${params.id}`,
          method: 'get',
      })
    }

// 当前部门岗位排序 
export function postSort (params) {
  return request({
      url: `/main/mdmPost/sort`,
      method: 'post',
      data:params
  })
}

export function mdmDutyVersionList (d) {
  return request({
      url: `/main/mdmPostVersion/list?postId=${d}`,
      method: 'get',
  })
}

export function settingMainVersion (d) {
  return request({
      url: `/main/mdmPostVersion/settingMainVersion?id=${d}`,
      method: 'get',
  })
}
//  版本删除
export function mdmDutyVersionDel (ids) {
  return request({
      url: `/main/mdmPostVersion/${ids}`,
      method: 'delete',
  })
}