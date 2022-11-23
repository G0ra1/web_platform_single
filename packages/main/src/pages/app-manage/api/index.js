// api
import { request } from '@platform/main'


// 应用分类
export function appClassify(data) {
  return request({
    url: `/main/mdmAppType/list`,
    method: 'post',
    data
  })
}
// 新建分类
export function creatClassify (params) {
    return request({
        url: `/main/mdmAppType`,
        method: 'post',
        data: params
    })
  }
  // 修改分类
export function editClassify (params) {
    return request({
        url: `/main/mdmAppType`,
        method: 'put',
        data: params
    })
  }
// 删除分类
export function del(id) {
    return request({
      url: `/main/mdmAppType/${id}`,
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
  // 应用系统
export function query(data) {
    return request({
      url: `/main/mdmApp/page`,
      method: 'post',
      data
    })
  }

  // 新建应用系统
export function creatApp (params) {
    return request({
        url: `/main/mdmApp`,
        method: 'post',
        data: params
    })
  }
  // 修改应用系统
export function editApp (params) {
    return request({
        url: `/main/mdmApp`,
        method: 'put',
        data: params
    })
  }
// 删除应用系统
export function delApp(id) {
    return request({
      url: `/main/mdmApp/${id}`,
      method: 'delete',
  })
  }

  export function resourceList(params) {
    return request({
      url: `/main/dbds/list?isEnable=${params}`,
      method: "get",
    });
  }
