// import { request } from '@platform/main'
import { request, Request } from '@platform/main'

export function dictTree(data: any) {
    return request({
        url: `main/dictTree/page`,
        method: 'post',
        data: data
    })
}
export function dictTreeList(data: any) {
    return request({
        url: `dict/dictTree/childList/${data.dictCode}`,
        method: 'get',
    })
}

