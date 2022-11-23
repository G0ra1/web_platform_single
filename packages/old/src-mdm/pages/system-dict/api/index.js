// api
import { request } from '@platform/main'
export function dictTypeList (params) {
  return request({
      url: `/main/dictType/page`,
      method: 'post',
      data: params
  })
}

export function creatDictType (params) {
  return request({
      url: `/main/dictType`,
      method: 'post',
      data: params
  })
}
export function editDictType (params) {
  return request({
      url: `/main/dictType`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/main/dictType/${id}`,
      method: 'delete',
  })
}

export function dictItemList (id) {
  return request({
      url: `/main/dictItem/list?dictId=${id}`,
      method: 'get',
  })
}
//字典 日志管理中调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}


export function creatDictItem (params) {
  return request({
      url: `/main/dictItem`,
      method: 'post',
      data: params
  })
}
export function editDictItem (params) {
  return request({
      url: `/main/dictItem`,
      method: 'put',
      data: params
  })
}

export function delDictItem (id) {
  return request({
      url: `/main/dictItem/${id}`,
      method: 'delete',
  })
}



export function dictVersionList (d) {
  return request({
      url: `/main/dictItemVersion/list?dictItemId=${d}`,
      method: 'get',
  })
}

export function settingMainVersion (d) {
  return request({
      url: `/main/dictItemVersion/settingMainVersion?id=${d}`,
      method: 'get',
  })
}
//  版本删除
export function dictDel (ids) {
return request({
    url: `/main/dictItemVersion/${ids}`,
    method: 'delete',
})
}