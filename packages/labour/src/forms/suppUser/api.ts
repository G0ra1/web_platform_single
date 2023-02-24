import { Request } from '@platform/main'

// 获取字典
export function getDict(key: string): Promise<Array<any>> {
    return new Request<object, Array<any>>(
        `/labour/labourEosDict/dictType/${key}`,
        'get'
    ).send()
}
