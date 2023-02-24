import { Request, request } from '@platform/main'

// 获取字典
// export function getDict(key: string): Promise<Array<any>> {
//     return new Request<object, Array<any>>(
//         `/labour/eosDict/dictType/${key}`,
//         'get'
//     ).send()
// }


//获取设备表的设备名称
export async function getDeviceNameList(data: any) {
    return request({
        url: `/cemlab/cemlabDevice/list`,
        method: 'post',
        data
    })
}

//获取检测项目
export async function getExperimentItems(data: any) {
    return request({
        url: `/cemlab/cemlabExperimentItems/list`,
        method: 'post',
        data
    })
}
