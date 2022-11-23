// api
import { request } from '@platform/main'
export function qurey(params) {
  return request({
    url: `/main/encondRule/list`,
    method: 'post',
    data: params
  })
}

export function creatCodeRule(params) {
  return request({
    url: `/main/encondRule`,
    method: 'post',
    data: params
  })
}
// export function editDictType (params) {
//   return request({
//       url: `/dict/dictType`,
//       method: 'put',
//       data: params
//   })
// }

export function del(id) {
  return request({
    url: `/main/encondRule/${id}`,
    method: 'delete',
  })
}

// 查询
export function query(data) {
  return request({
    url: `/model/form/page`,
    method: 'post',
    data
  })
}

// detail

export function detail(id) {
  return request({
    url: `/model/form/detail/${id}`,
    method: 'get'
  })
}

//  codeRule
export function codeRuleDetail(id) {
  return request({
    url: `/main/encondRule/${id}`,
    method: 'get'
  })
}


//  codeRule
export function getProcDefInfoBy(camundaProcdefId) {
  return request({
    url: `/wf/wfprocdef/getProcDefInfoByCamundaProcdefId?camundaProcdefId=${camundaProcdefId}&nodeKey=firstNode`,
    method: 'get',
  })
}


export function queryProcess(data) {
  return request({
    url: `/wf/wfprocdef/list`,
    method: 'post',
    data
  })
}

export const queryProcessVersionList = (id) => {
  return request({
    url: `/wf/wfprocdef/queryVerListByCamundaProcdefKey?camundaProcdefKey=${id}`,
    method: 'post'
  })
}
