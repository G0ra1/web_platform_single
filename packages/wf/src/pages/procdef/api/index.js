// import { request } from '@platform/main'
import { request } from '@platform/main'

export function del (id) {
  return request({
    url: `/wf/wfprocdef/${id}`,
    method: 'delete'
  })
}

export function delVersion (id) {
  return request({
    url: `/wf/wfprocdef/delVerByCamundaProcdefId/${id}`,
    method: 'delete'
  })
}

// wf/wfprocdef/setCurrentVerByCamundaProcdefId?camundaProcdefId=budget_adj_speproj_apply:2:86f9628b-7dd1-11ec-a77a-0242ac130007

export function enableVersion (id) {
  return request({
    url: `/wf/wfprocdef/setCurrentVerByCamundaProcdefId?camundaProcdefId=${id}`,
    method: 'post'
  })
}

// 版本列表
export const queryVersionList = (id) => {
  return request({
    url: `/wf/wfprocdef/queryVerListByCamundaProcdefKey?camundaProcdefKey=${id}`,
    method: 'post'
  })
}