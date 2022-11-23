// api
import request from "/@/plugins/request";

export function fileinfo(ids) {
  return request({
    url: `/main/fileinfo/getByIds?ids=${ids}`,
    method: "get",
  });
}

export function fileStream(id) {
  return request({
    url: `/main/fileinfo/stream?id=${id}`,
    method: "get",
  });
}


