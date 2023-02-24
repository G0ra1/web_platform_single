// api
import { request } from '@platform/main'
// 组织机构列表
export function  rightList(params) {
  return request({
      url: `/main/mdmOrg/list`,
      method: 'post',
      data: params
  })
}
  // 人员列表
  export function  empLists(params) {
    return request({
        url: `/main/mdmUser/lists`,
        method: 'post',
        data: params
    })
  }
// 人员多查详情
export function mdmUserIds (d) {
  return request({
      url: `/main/mdmUser/getByIds/?ids=${d}`,
      method: 'get',
  })
}
export function  query (params) {
  return request({
      url: `cts/ctsLinkman/queryUserListForCts`,
      method: 'post',
      data: params
  })
}

// 出给定组织下的一级子组织
export function organList (id) {
  return request({
      url: `/main/mdmOrg/kids/${id}`,
      method: 'get',
  })
}
// 全部联系人收藏
export function  collectMan (params) {
  return request({
      url: `cts/ctsLinkman`,
      method: 'post',
      data: params
  })
}

// 全部联系人取消收藏
export function  cancelCollectMan (id) {
  return request({
      url: `cts/ctsLinkman/${id}`,
      method: 'delete',
     
  })
}

// 即时通消息发送
export function  sendMessage (params) {
  return request({
      url: `sms/qywechat/sendMsgForCts`,
      method: 'post',
      data: params
  })
}

// 短信发送
export function  sendMsgForCts (params) {
  return request({
      url: `sms/sms/sendMsgForCts`,
      method: 'post',
      data: params
  })
}

// 邮件发送
export function  sendmailForCts (params) {
  return request({
      url: `sms/api/sendSmsForUnify`,
      method: 'post',
      data: params
  })
}



// 群发消息
export function  ctsFsend (params) {
  return request({
      url: `cts/ctsFsend`,
      method: 'post',
      data: params
  })
} 
// 模板台账
export function  tempList (params) {
  return request({
      url: `cts/ctsTemp/list`,
      method: 'post',
      data: params
  })
}

// 模板新增
export function  tempAdd (params) {
  return request({
      url: `cts/ctsTemp`,
      method: 'post',
      data: params
  })
}
// 模板修改
export function  tempEdit (params) {
  return request({
      url: `cts/ctsTemp`,
      method: 'put',
      data: params
  })
}
// 模板删除
export function  tempDel (params) {
  return request({
      url: `cts/ctsTemp/${id}`,
      method: 'delete',
  })
}