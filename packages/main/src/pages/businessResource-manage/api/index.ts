import { RequestPaging, Request } from '@platform/main'
import type { FormModel } from '../model.d'
// 一般
export function query(current: number, size: number, search?: object) {
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

export function add(data: FormModel) {
    return new Request(
        '/permission/businessResource',
        'post',
        data
    ).send()
}

// 编辑

export function edit(data: FormModel) {
    return new Request(
        '/permission/businessResource',
        'put',
        data
    ).send()
}

// 删除
export function del(id: string) {
    return new Request(
        `/permission/businessResource/${id}`,
        'delete'
    ).send()
}

// 详情
export function detail(id: string) {
    return new Request(
        `/permission/businessResource/${id}`,
        'get'
    ).send()
}

export function getInterfacesDetailByMthPath(mthMethod: string, mthPath: string) {
    return new Request(
        `main/interfaces/getInterfacesDetailByMthPath?mthMethod=${mthMethod}&mthPath=${mthPath}`,
        'get'
    ).send()
}

export function queryOrg(data: any) {
    return new Request(
        `/main/mdmOrg/list`,
        'post',
        data
    )
}
export function queryUsers(data: any) {
    return new Request(
        `/main/mdmUser/list`,
        'post',
        data
    )
}
export function dictType() {
    return new Request(
        `main/dictType/page`,
        'post'
    ).send()
}
export function dictItemLists(code: string) {
    return new Request(
        `/dict/dictItem/list?dictCode=${code}`,
        'get',
    ).send()
}

export function dictTree() {
    return new Request(
        `main/dictTree/page`,
        'post'
    ).send()
}

export function dictTreeList(d: any) {
    return new Request(
        `dict/dictTree/childList/${d.dictCode}`,
        'get',
    ).send()
}




