import { request } from '@platform/main'

//字典
export function getDict(key: string) {
  return request({
    url: `/labour/labourEosDict/dictType/${key}`,
    method: 'get',
  })
}
