import { request } from '@platform/main'
// 查询树形
export function getSuppUserContractWork(params: any) {
    return request({
        url: `/labour/labourAttendance/getSuppUserContractWork`,
        method: 'get',
        params
    })
}
export function listByBanId(data: any) {
    return request({
        url: `labour/labourAttendance/listByBanId`,
        method: 'post',
        data
    })
}
