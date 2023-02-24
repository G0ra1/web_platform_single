import { Request } from '@platform/main'
import AssetsDaybook from '../model'



function getByAssetsDetailId(id: string): Promise<Array<AssetsDaybook>> {
    return new Request<string, Array<AssetsDaybook>>(
        `/asset/daybook/getByAssets/${id}`,
        'get',
    ).send()
}

export {
    getByAssetsDetailId
}