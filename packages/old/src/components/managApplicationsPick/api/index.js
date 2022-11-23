// api
import request from "/@/plugins/request";
export function getApplyList() {
  return request({
    url: `/asset/purchaseRegister/getApplyList`,
    method: "post",
    data: {},
  });
}
