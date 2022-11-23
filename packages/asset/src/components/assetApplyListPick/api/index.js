// api
import { createApp } from '@platform/main'
export function getApplyList(data) {
  return request({
    url: `/asset/scrapRegister/getApplyList`,
    method: "post",
    data,
  });
}
