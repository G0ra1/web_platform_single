// api
import { request } from '@platform/main'
export function getApplyList() {
  return request({
    url: `/asset/purchaseRegister/getApplyList`,
    method: "post",
    data: {},
  });
}
