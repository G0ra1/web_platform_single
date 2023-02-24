import { request } from '@platform/main'

export function contractPurchaseList(params) {
    return request({
    url: `/asset/warehouse/list`,
    method: "post",
    data: params,
  });
}
