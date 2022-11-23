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
export function empLists(data) {
  return request({
    url: `/asset/materialWithdrawal/getWithdrawalDetail`,
    method: "post",
    data
  });
}
