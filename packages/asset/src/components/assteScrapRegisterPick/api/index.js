// api
import { createApp } from '@platform/main'
export function getDataList(params) {
  return request({
    url: `/asset/scrapRegister/getApplyDetailByIds/${params.applyIds.toString()}`,
    method: "get",
  });
}
