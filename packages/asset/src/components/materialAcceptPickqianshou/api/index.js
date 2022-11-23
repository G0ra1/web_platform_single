// api
import { request } from '@platform/main'
export function getApplyList(data) {
  return request({
    url: `/asset/materialSign/getOrders`,
    method: "post",
    data: data,
  });
}
