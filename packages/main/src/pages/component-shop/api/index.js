// api
import { request } from '@platform/main'


// 是否下架
export function updateByIdAndIsPutaway(params) {
  return request({
    url: `/portal/portalWidgetsStore/updateByIdAndIsPutaway`,
    method: 'put',
    data: params
  })
}
