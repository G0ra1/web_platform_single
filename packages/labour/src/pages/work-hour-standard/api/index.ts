import { Request } from '@platform/main'

//修改启用状态
export function updateIsEnableApi(id: string): Promise<boolean> {
    return new Request<object, boolean>(
        `/labour/workHourStandard/updateIsEnable/${id}`,
        'put',
    ).send()
}
