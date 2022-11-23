// api
import { request } from '@platform/main'

export function contractPurchaseList(params) {
  return request({
    url: `/asset/warehouse/shelf/list`,
    method: "post",
    data: params,
  });
}
