// api
import { request } from '@platform/main'

// 职务列表
export function  dutyList(params) {
    return request({
        url: `/main/mdmDuty/list`,
        method: 'post',
        data: params
    })
  }
  
  // 职务列表
export function  postLists(params) {
  return request({
      url: `/main/mdmDuty/lists`,
      method: 'post',
      data: params
  })
}

//  添加职务
  export function creatPost (params) {
    return request({
        url: `/main/mdmDuty/save`,
        method: 'post',
        data: params
    })
  }
  //  修改职务
  export function editPost (params) {
    return request({
        url: `/main/mdmDuty`,
        method: 'put',
        data: params
    })
  }
  //  删除职务
  export function del (id) {
    return request({
        url: `/main/mdmDuty/${id}`,
        method: 'delete',
    })
  }

 // 职务序列字典
export function  mdmPostSequDictList(params) {
    return request({
        url: `/main/mdmDutySequDict/list`,
        method: 'post',
        data: params
    })
  }
  
   // 职务职等字典
export function  mdmPostGradeDictList(params) {
  return request({
      url: `/main/mdmDutyGradeDict/list`,
      method: 'post',
      data: params
  })
}

   // 职务标识字典
   export function  mdmPostTagDictList(params) {
    return request({
        url: `/main/mdmDutyTagDict/list`,
        method: 'post',
        data: params
    })
  }
  // 通过部门id查询已启用的职务
  export function orgPost (params) {
    return request({
        url: `/main/mdmPost/org/${params.id}`,
        method: 'get',
    })
  }
    // 根据OrgId查询出下面所有层级的职务
    export function getMdmPostByOrgId (params) {
      return request({
          url: `/main/mdmPost/org/${params.id}`,
          method: 'get',
      })
    }
   // 根据职务id 查询用户信息
   export function getUserByUserId (params) {
    return request({
        url: `/main/mdmDutyUser/user/getUserByDutyId/${params.id}`,
        method: 'get',
    })
  }
     // 根据用户id 查询用户职务信息
    export function getDutyByUserId (params) {
      return request({
          url: `/main/mdmDutyUser/duty/getDutyByUserId/${params.id}`,
          method: 'get',
      })
    }

    // 当前部门职位排序 
export function postSort (params) {
  return request({
      url: `/main/mdmDuty/sort`,
      method: 'post',
      data:params
  })
}

export function mdmDutyVersionList (d) {
  return request({
      url: `/main/mdmDutyVersion/list?orgId=${d}`,
      method: 'get',
  })
}

export function settingMainVersion (d) {
  return request({
      url: `/main/mdmDutyVersion/settingMainVersion?id=${d}`,
      method: 'get',
  })
}
//  版本删除
export function mdmDutyVersionDel (ids) {
  return request({
      url: `/main/mdmDutyVersion/${ids}`,
      method: 'delete',
  })
}