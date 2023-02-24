import { Request } from '@platform/main'
import AssetsDetailVo from '../../../lib/vo/AssetsDetailVo'

export function getByAssetsId(id: string): Promise<Array<AssetsDetailVo>> {
    return new Request<string, Array<AssetsDetailVo>>(
        `/asset/assetAssetsDetail/getByAssetsId/${id}`,
        'get',
    ).send()
}