import { Request, request } from '@platform/main'

//获取班组的机构信息
export async function getBandOrg(data: any) {
    return request({
        url: `/main/mdmOrg/list`,
        method: 'post',
        data
    })
}
