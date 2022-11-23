// api
import { request } from '@platform/main'

export function myWorkhour(params) {
  return request({
    url: `/manhour/workHour/statistics/my/workhour`,
    method: 'get',
    params
  })
}
export function myWorkhourlog(params) {
  return request({
    url: `/manhour/workHourLog/statistics/my/workhourlog`,
    method: 'get',
    params
  })
}
export function workHourLogById(id) {
  return request({
    url: `/manhour/workHourLog/${id}`,
    method: 'get',
  })
}
export function queryTodokNumByCondition(camundaProcdefKey) {
  return request({
    url: `/wf/wftodotask/queryTodokNumByCondition/${camundaProcdefKey}`,
    method: 'get',
  })
}
export function msgPage(data) {
  return request({
    url: `/msg/msgPage`,
    method: 'post',
    data
  })
}
export function editRead (params) {
    return request({
        url: `/msg/editRead/${params}`,
        method: 'put',
        data: params
    })
  }


