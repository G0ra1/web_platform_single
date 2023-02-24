import { Request,request } from '@platform/main'

// 获取字典
// export function getDict(key: string): Promise<Array<any>> {
//     return new Request<object, Array<any>>(
//         `/labour/eosDict/dictType/${key}`,
//         'get'
//     ).send()
// }


//字典 调用
export function getDict (key: string) {
    return request({
        url: `/labour/labourEosDict/dictType/${key}`,
        method: 'get',
    })
  }
