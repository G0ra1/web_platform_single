// api
import request from "/@/plugins/request";

export function contractPurchaseList(params) {
  return request({
    url: `/mdm/supplier/list`,
    method: "post",
    data: params,
  });
}
