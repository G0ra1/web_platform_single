// api
import { request } from '@platform/main'

export function contractPurchaseList(params) {
  return request({
    url: `/mdm/supplier/list`,
    method: "post",
    data: params,
  });
}
