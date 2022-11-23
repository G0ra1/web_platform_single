// api
import { request, Cookies } from '@platform/main'

// 题库列表
export function studyExamDatabaseDefLists (params) {
  return request({
      url: `/study/studyExamDatabaseDef/lists`,
      method: 'post',
      data: params
  })
}
export function creatStudyExamDatabaseDef (params) {
  return request({
      url: `/study/studyExamDatabaseDef`,
      method: 'post',
      data: params
  })
}
export function editStudyExamDatabaseDef (params) {
  return request({
      url: `/study/studyExamDatabaseDef`,
      method: 'put',
      data: params
  })
}
export function delStudyExamDatabaseDef (id) {
  return request({
      url: `/study/studyExamDatabaseDef/${id}`,
      method: 'delete',
  })
}
//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}


// 题目列表
export function query (params) {
  return request({
      url: `/study/studyExamQuestionDef/list`,
      method: 'post',
      data: params
  })
}
// shiti新建接口
export function create(params) {
  return request({
    url: `/study/studyExamQuestionDef`,
    method: 'post',
    data: params
})
}
// 删除接口
export function del(id) {
  return request({
    url: `/study/studyExamQuestionDef/${id}`,
    method: 'delete',
})
}
// 编辑接口
export function edit(params) {
  return request({
    url: `/study/studyExamQuestionDef`,
    method: 'put',
    data: params
  })
}
// 批量导题
export function creatBatchAddQuestion (params) {
  return request({
      url: `/study/studyExamQuestionDef/batchAddQuestion`,
      method: 'post',
      data: params
  })
}

// 导出
export function exportTemplate () {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/study/studyExamQuestionDef/downloadTemplate`,
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
        a.download = '模板下载.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}