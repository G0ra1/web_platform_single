// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyMarterials/list`,
      method: 'post',
      data: params
  })
}
export function querys (params) {
  return request({
      url: `/study/studyMarterials/lists`,
      method: 'post',
      data: params
  })
}

export function creat (params) {
  return request({
      url: `/study/studyMarterials`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyMarterials`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyMarterials/${id}`,
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


