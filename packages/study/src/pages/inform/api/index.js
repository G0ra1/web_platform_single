// api
import { request } from '@platform/main'
export function studyNewsList (params) {
  return request({
      url: `/study/studyNews/list`,
      method: 'post',
      data: params
  })
}
export function studyNewsLists (params) {
  return request({
      url: `/study/studyNews/lists`,
      method: 'post',
      data: params
  })
}

export function creat (params) {
  return request({
      url: `/study/studyNews`,
      method: 'post',
      data: params
  })
}
export function edit (params) {
  return request({
      url: `/study/studyNews`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyNews/${id}`,
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


