// api
import { request } from '@platform/main'

export function fileinfo(ids) {
  return request({
    url: `/main/fileinfo/getByIds?ids=${ids}`,
    method: "get",
  });
}
