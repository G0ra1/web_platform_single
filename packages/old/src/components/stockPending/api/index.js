// api
import request from "/@/plugins/request";
export function getDetailByAssets(data) {
  return request({
    url: `/asset/purchaseStorage/getAcceptanceList`,
    method: "post",
    data,
  });
}
export function wuziType() {
  return request({
    url: `/main/dictItem/list?dictCode=asset_type`,
    method: "get",
  });
}
