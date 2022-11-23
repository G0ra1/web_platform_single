// api
import { request } from '@platform/main'

export function creatEmp (params) {
  return request({
      url: `/study/studyUserApply`,
      method: 'post',
      data: params
  })
}


// 组织机构列表
export function  rightList(params) {
  return request({
      url: `/main/mdmOrg/listForStudy`,
      method: 'post',
      data: params
  })
}

// 获取验证码
export function sendSMSCode(phoneNumber) {
  return request({
    url: `/main/api/sendSMSCode?phoneNumber=${phoneNumber}`,
    method: "get",
    noToken: true
  });
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}

