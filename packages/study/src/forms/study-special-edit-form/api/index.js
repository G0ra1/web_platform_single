import { request } from '@platform/main'


//字典 调用
export function dictItemLists (id) {
    return request({
        url: `/main/dictItem/list?dictCode=${id}`,
        method: 'get',
    })
  }
  
  // 查询课程接口
export function querys(data) {
    return request({
      url: `/study/studyLesson/lists`,
      method: 'post',
      data
    })
  }
  
  export function paperQuerys (params) {
    return request({
        url: `/study/studyExamPaperDef/lists`,
        method: 'post',
        data: params
    })
  }
  
  export function learningQuerys (params) {
    return request({
        url: `/study/studyMarterials/lists`,
        method: 'post',
        data: params
    })
}
// 证书
export function certificates (params) {
  return request({
      url: `/study/studyCertificate/lists`,
      method: 'post',
      data: params
  })
}
// 分类列表
export function  classifys(type) {
  return request({
    url: `/main/dictTree/childList/` + type,
    method: 'get',
  })
}

export function detail(id) {
  return request({
      url: `/study/studySpecial/detailForAdj/${id}`,
      method: 'get',
  })
}
