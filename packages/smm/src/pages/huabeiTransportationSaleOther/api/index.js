// api
import { request } from '@platform/main'

// 
export function detailForm(id) {
    return request({
        url: `/smm/smmHboilHandelswareOther/proc/view/${id}`,
        method: 'get',
    })
}
