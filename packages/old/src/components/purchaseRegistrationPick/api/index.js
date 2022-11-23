// api
import request from "/@/plugins/request";
export function getApplyList(data) {
  return request({
    url: `/asset/purchaseAccept/getRegisterList`,
    method: "post",
    data: data,
  });
}
