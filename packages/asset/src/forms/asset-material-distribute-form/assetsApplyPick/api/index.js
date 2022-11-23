// api
import { request } from '@platform/main'

// 组织机构列表
// export function rightList(params) {
//   return request({
//     url: `mdm/mdmOrg/list`,
//     method: "post",
//     data: params,
//   });
// }

// export function empLists(params) {
//   return request({
//     url: `mdm/mdmUser/lists`,
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
// export function empLists(ids) {
//   return request({
//     url: `/asset/purchaseRegister/getApplyDetailByIds/${ids}`,
//     method: "get",
//   });
// }
export function empLists(data) {
  return request({
    url: `/asset/materialDistribute/getDetailByAssets`,
    method: "post",
    data
  });
}
