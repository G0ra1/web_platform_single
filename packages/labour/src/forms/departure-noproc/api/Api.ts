import { request } from '@platform/main'


//人员离场数据
export function departureUseList(params: object) {
  return request({
    url: `/labour/personMobilization/departureUseList`,
    method: 'POST',
    data: params
  })
}