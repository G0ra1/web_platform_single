// api
import { request } from '@platform/main'
export function getApplyList(data) {
  return request({
    url: `/asset/materialDistribute/getOrders`,
    method: "post",
    data: data,
  });
}
