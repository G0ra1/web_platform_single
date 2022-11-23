// api
import request from "/@/plugins/request";

export function contractPurchaseList(params) {
  return request({
    url: `/asset/warehouse/shelf/list`,
    method: "post",
    data: params,
  });
}
