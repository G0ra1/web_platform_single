// api
import { request } from '@platform/main'

export function checkPassword(params) {
  return request({
    url: `/main/mdmUser/checkPassword`,
    method: 'post',
    data: params
  })
}
export function updatePassword(params) {
  return request({
    url: `/main/mdmUser/updatePassword`,
    method: 'post',
    data: params
  })
}
export function updatePhoto(params) {
  return request({
    url: `/main/mdmUser/updatePhoto`,
    method: 'post',
    data: params
  })
}
export function updateEmail(params) {
  return request({
    url: `/main/mdmUser/updateEmail`,
    method: 'post',
    data: params
  })
}
export function updatePhoneNum(params) {
  return request({
    url: `/main/mdmUser/updatePhoneNum`,
    method: 'post',
    data: params
  })
}
export function mdmUserById(id) {
  return request({
    url: `/main/mdmUser/${id}`,
    method: 'get',
  })
}
export function fileinfo(id) {
  return request({
    url: `/main/fileinfo/${id}`,
    method: 'get',
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
// 验证码正码
export function verificationCode({ phoneNumber, code }) {
  return request({
    url: `/main/api/verificationCode?phoneNumber=${phoneNumber}&code=${code}`,
    method: "get",
    noToken: true
  });
}





