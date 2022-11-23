// api
import { request, Cookies } from '@platform/main'

export function query (params) {
  return request({
      url: `/study/studyCertificateTemplate/pageList`,
      method: 'post',
      data: params
  })
}  
export function querys (params) {
  return request({
      url: `/study/studyCertificateTemplate/pageLists`,
      method: 'post',
      data: params
  })
}

export function creat (params) {
  return request({
      url: `/study/studyCertificateTemplate`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyCertificateTemplate`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyCertificateTemplate/${id}`,
      method: 'delete',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}

// 查出不分页分类
export function allClassifys (id) {
  return request({
      url: `main/dictTree/list?parentCode=${id}`,
      method: 'get',
  })
}

// 模板预览
export function preview (id) {
  return request({
      url: `/study/studyCertificateTemplate/preview/${id}`,
      method: 'get',
      responseType: 'blob',
  })
}

// 导出
export function exportTemplate () {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/study/studyCertificateTemplate/downloadTemplate`,
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
        a.download = '模板下载.docx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}