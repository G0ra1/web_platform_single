// api
import { request } from '@platform/main'

export function getApplyList(data) {
  return request({
    url: `/asset/purchaseAccept/getRegisterList`,
    method: "post",
    data: data,
  });
}
