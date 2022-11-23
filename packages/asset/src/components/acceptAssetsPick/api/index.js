// api
import { request } from '@platform/main'
export function getDetailByAssets() {
  return request({
    url: `/asset/materialAccept/getDetailByAssets`,
    method: "post",
    data: {},
  });
}
export function wuziType() {
  return request({
    url: `/main/dictItem/list?dictCode=asset_type`,
    method: "get",
  });
}
