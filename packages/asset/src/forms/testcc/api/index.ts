import { request } from '@platform/main'
import Page from '../../../lib/page/Page'
import IDto from '../../../lib/dto/IDto'

export function getResult(requestUrl: string, params: IDto): Promise<Array<any>> {
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

export function getByAssetsId(requestUrl: string, assetsId: string): Promise<Array<any>> {
    return request({
        url: requestUrl+"/"+assetsId,
        method: 'get',
        data: assetsId
    })
}