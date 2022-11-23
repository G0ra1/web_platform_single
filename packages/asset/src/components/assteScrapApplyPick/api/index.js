// api
import { request } from '@platform/main'

export function getDataList(data) {
  return request({
    url: `/asset/scrapApply/getScrapDetail`,
    method: "post",
    data,
  });
}
