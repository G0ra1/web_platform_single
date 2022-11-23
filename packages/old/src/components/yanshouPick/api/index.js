// api
import request from "/@/plugins/request";

export function contractPurchaseList(params) {
  return request({
    url: `/asset/purchaseStorage/getAcceptList`,
    method: "post",
    data: params,
  });
}
export function wuziType() {
  return request({
    url: `/main/dictItem/list?dictCode=asset_type`,
    method: "get",
  });
}
