// api
import { request } from '@platform/main'
export function studyClassCouDefList (params) {
  return request({
      url: `/study/studyCou/list`,
      method: 'post',
      data: params
  })
}
export function studyUserLists (params) {
  return request({
      url: `/study/studyCou/lists`,
      method: 'post',
      data: params
  })
}

export function creatStudyClassCouDef (params) {
  return request({
      url: `/study/studyCou`,
      method: 'post',
      data: params
  })
}
export function editStudyClassCouDef (params) {
  return request({
      url: `/study/studyCou`,
      method: 'put',
      data: params
  })
}

export function del (id) {
  return request({
      url: `/study/studyCou/${id}`,
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

//详情接口
export function detail (id) {
  return request({
      url: `/study/studyCou/${id}`,
      method: 'get',
  })
}

// 分类列表
export function  classifys(type) {
  return request({
    url: `/main/dictTree/childList/` + type,
    method: 'get',
  })
}

// 上传服务器 获取签名
export function  stsCredentials() {
  return request({
    url: `/main/aliyunFile/stsCredentials`,
    method: 'get',
  })
}
