// api
import { request, Cookies } from '@platform/main'

// 人员列表
export function  empList(params) {
    return request({
        url: `mdm/mdmUser/list`,
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

//  添加人员
  export function creatEmp (params) {
    return request({
        url: `mdm/mdmUser`,
        method: 'post',
        data: params
    })
  }
  //  修改人员
  export function editEmp (params) {
    return request({
        url: `mdm/mdmUser`,
        method: 'put',
        data: params
    })
  }
   //  删除人员
  export function del (id) {
    return request({
        url: `/mdm/mdmUser/${id}`,
        method: 'delete',
    })
  }
  // 根据OrgId查询出下面所有层级的人员
  export function getUserByOrgId (params) {
    return request({
        url: `mdm/mdmUser/getUserByOrgId/${params.id}`,
        method: 'get',
    })
  }
// 调/设置 主岗
  export function setMasterPost (params) {
    return request({
        url: `mdm/mdmUser/setMasterPost`,
        method: 'post',
        data: params
    })
  }
  // 调/设置 主职
  export function setMasterDuty (params) {
    return request({
        url: `mdm/mdmUser/setMasterDuty`,
        method: 'post',
        data: params
    })
  }
    // 调/设置 兼职
    export function setAndDuty (params) {
      return request({
          url: `mdm/mdmUser/setAndDuty`,
          method: 'post',
          data: params
      })
    }
  // 调/设置 兼岗
  export function setAndPost (params) {
    return request({
        url: `mdm/mdmUser/setAndPost`,
        method: 'post',
        data: params
    })
  }

   //调动部门
   export function transferDetp (params) {
    return request({
        url: `mdm/mdmUser/transferDetp`,
        method: 'post',
        data: params
    })
  }
  
  //调动单位
  export function transferOrg (params) {
    return request({
        url: `mdm/mdmUser/transferOrg`,
        method: 'post',
        data: params
    })
  }
  
  //通用字典
  export function mdmCommDicts (params) {
    return request({
        url: `mdm/mdmCommDict/lists`,
        method: 'post',
        data: params
    })
  }
  // 同步人员信息
export function syncGuFenUserAndMasterPostIncrement (params) {
  return request({
      url: `mdm/syncGuFen/syncGuFenUserAndMasterPostIncrement`,
      method: 'get',
      
  })
}
    
// 人员排序 
export function globalEmpSort (params) {
  return request({
      url: `mdm/mdmUser/globalsort`,
      method: 'post',
      data:params
  })
}

// 当前部门人员排序 
export function empSort (params) {
  return request({
      url: `mdm/mdmUser/sort`,
      method: 'post',
      data:params
  })
}
// 导出
export function exportUser () {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/mdm/mdmUser/exportTemplate`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`
        }),
        responseType: "blob"
      }
    )
      .then(response => response.arrayBuffer())
      .then(res => {
        var a = document.createElement("a");
        a.style.display = "none";
        var url = URL.createObjectURL(
          new Blob([res], {
            type:
              "application/zip;charset=UTF-8"
          })
        );
        a.href = url;
        a.download = 'users.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}


export function mdmDutyVersionList (d) {
  return request({
      url: `mdm/mdmUserVersion/list?orgId=${d}`,
      method: 'get',
  })
}

export function settingMainVersion (d) {
  return request({
      url: `mdm/mdmUserVersion/settingMainVersion?id=${d}`,
      method: 'get',
  })
}
//  版本删除
export function mdmDutyVersionDel (ids) {
  return request({
      url: `mdm/mdmUserVersion/${ids}`,
      method: 'delete',
  })
}
// 人员多查详情
export function mdmUserIds (d) {
  return request({
      url: `mdm/mdmUser/getByIds/${d}`,
      method: 'get',
  })
}