// api
import { request } from '@platform/main'

export function getTreeTask(level) {
  return request({
    url: `/manhour/task/getTreeTask/${level}`,
    method: 'get',
  })
}
// 查询接口
export function queryTask(data) {
  return request({
    url: `/manhour/task/list`,
    method: 'post',
    data
  })
}

