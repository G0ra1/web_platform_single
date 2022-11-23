// api
import { request } from '@platform/main'

export function getAuthResSingle2({ system, code }) {
  return request({
    url: `/getAuthResSingle`,
    method: 'get',
    params: {
      system, code
    }
  })
}

// /mdmResource/checkResByResId/{resId} 校验当前资源
export function getAuthResSingle(resId) {
  return request({
    url: `/main/mdmResource/checkResByResId/${resId}`,
    method: 'get'
  })
}
// 获取当前权限菜单

// /mdmResource/getResByPid/{pid} -1

export function getAuthMenu(pid = -1) {
  return request({
    url: `/main/mdmResource/getResByPid/${pid}`,
    method: 'get'
  })
}

// 设置已读
export function editRead(params) {
  return request({
    url: `/main/editRead/${params}`,
    method: 'put',
    data: params
  })
}


//字典 日志管理中调用
export function dictItemLists(id) {
  return request({
    url: `/main/dictItem/list?dictCode=${id}`,
    method: 'get',
  })
}

//字典 日志管理中调用
export function getLog() {
  return request({
    url: `/portal/portalContentLogin/getLog`,
    method: 'get',
    noToken: true,
  })
}