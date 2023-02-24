// api
import { request, Cookies } from '@platform/main'


export function studyUserList (params) {
  return request({
      url: `/main/mdmUserForStudy/findByPage`,
      method: 'post',
      data: params
  })
}

export function studyUserDetail (id) {
  return request({
      url: `/main/mdmUserForStudy/get/${id}`,
      method: 'get',
  })
}
export function studyUserLists (params) {
  return request({
      url: `/main/mdmUserForStudy/findByList`,
      method: 'post',
      data: params
  })
}

export function creatEmp (params) {
  return request({
      url: `/main/mdmUserForStudy/saveStudyUserBatch`,
      method: 'post',
      data: params
  })
}
export function editEmp (params) {
  return request({
      url: `/main/mdmUserForStudy/updateStudyUser`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/main/mdmUserForStudy/deleteStudyUser?ids=${id}&userType=2`,
      method: 'delete',
  })
}


export function getEmpDetail (id) {
  return request({
    url: `main/mdmUser/getByIds?ids=${id}`,
    method: 'get',
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

  // 人员列表
  export function  empLists(params) {
    return request({
        url: `/main/mdmUser/lists`,
        method: 'post',
        data: params
    })
  }

  // 导出模板下载
// export function exportTemplate(data = {}) {
//   return request({
//     // url: `/sys/login?username=${data.username}&password=${data.password}`,
//     url: `/main/mdmUserForStudy/exportTemplate`,
//     method: "get",
//   });
// }

// 导出
export function exportTemplate () {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/mdm/mdmUserForStudy/exportTemplate`,
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
        a.download = '人员模板下载.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}
