import { Request, request } from '@platform/main'



//获取设备表的设备名称
export async function getDeviceNameList(data: any) {
    return request({
        url: `/cemlab/cemlabDevice/list`,
        method: 'post',
        data
    })
}
