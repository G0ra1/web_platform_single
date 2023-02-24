import { request } from '@platform/main'
import Page from '../../../lib/page/Page'
import IDto from '../../../lib/dto/IDto'

export function getResult(requestUrl: string, params: IDto): Promise<Page<any>> {
    return request({
        url: requestUrl,
        method: 'post',
        data: params
    })
}

export function getByIds(requestUrl: string, ids: Array<string>): Promise<Array<any>> {
    return request({
        url: requestUrl,
        method: 'post',
        data: ids
    })
}