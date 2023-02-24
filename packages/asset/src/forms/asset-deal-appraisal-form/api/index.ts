import { Request } from '@platform/main'
import Asset from "../../asset-deal-form/model"
/**
 * 请求台账明细获取台 账id
 * @param id 
 * @returns 
 */
export function getById(id: string): Promise<Asset> {
    return new Request<string, Asset>(
        `/asset/assetDeal/${id}`,
        'get',
    ).send()
}