// api
import request from "/@/plugins/request";

export function contractPurchaseList(params) {
  return request({
    url: `/mdm/contractPurchase/getList`,
    method: "post",
    data: params,
  });
}
