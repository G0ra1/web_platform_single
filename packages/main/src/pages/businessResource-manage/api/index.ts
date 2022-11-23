import { RequestPaging, Request } from '@platform/main'
import type { FormModel } from '../model.d'
// 一般
export function query (current: number, size: number, search?: object) {
    return new RequestPaging(
        '/businessResource/pageByBusiness',
        'post',
        {
            ...search,
            page: {
                current,
                size
            }
        }
    ).send()
}

// 新建

export function add (data: FormModel) {
    return new Request(
        '/permission/businessResource',
        'post',
        data
    ).send()
}

// 编辑

export function edit (data: FormModel) {
    return new Request(
        '/permission/businessResource',
        'put',
        data
    ).send()
}

// 删除
export function del (id: string) {
    return new Request(
        `/permission/businessResource/${id}`,
        'delete'
    ).send()
}

// 详情
export function detail (id: string) {
    return new Request(
        `/permission/businessResource/${id}`,
        'get'
    ).send()
}