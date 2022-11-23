// api
import { request } from '@platform/main'

// 组织机构列表
// export function rightList(params) {
//   return request({
//     url: `/main/mdmOrg/list`,
//     method: "post",
//     data: params,
//   });
// }

// export function empLists(params) {
//   return request({
//     url: `/main/mdmUser/lists`,
//     method: "post",
//     data: params,
//   });
// }
export function rightList(data) {
  return request({
    url: `/mdm/itemClassify/list`,
    method: "post",
    data,
  });
}
export function empLists(ids) {
  return request({
    url: `/asset/purchaseRegister/getApplyDetailByIds/${ids}`,
    method: "get",
  });
}
