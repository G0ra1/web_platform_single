// api
import request from "/@/plugins/request";
export function getApplyList(data) {
  return request({
    url: `/asset/materialSign/getOrders`,
    method: "post",
    data: data,
  });
}
