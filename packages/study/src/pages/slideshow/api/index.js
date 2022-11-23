// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyHomeBanner/list`,
      method: 'post',
      data: params
  })
}
export function querys (params) {
  return request({
      url: `/study/studyHomeBanner/lists`,
      method: 'post',
      data: params
  })
}

export function creat (params) {
  return request({
      url: `/study/studyHomeBanner`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyHomeBanner`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyHomeBanner/${id}`,
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


