import { request } from '@platform/main'
// 查询树形
export function getSuppUserContractWork(params: any) {
    return request({
        url: `/labour/labourAttendance/getSuppUserContractWork`,
        method: 'get',
        params
    })
}

//分页查询某人某月未进行审批的考勤
export function getSuppUserMonthApproveList(params: any) {
    return request({
        url: `/labour/labourAttendance/suppUserMonthApproveLists`,
        method: 'post',
        params
    })
}

