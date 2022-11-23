// api
import request from "/@/plugins/request";
export function getApplyList(data) {
  return request({
    url: `/asset/materialDistribute/getOrders`,
    method: "post",
    data: data,
  });
}
