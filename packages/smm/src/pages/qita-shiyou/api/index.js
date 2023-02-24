// api
import { request } from '@platform/main'

// 
export function detailForm(id) {
    return request({
        url: `/smm/smmHebooilOther/proc/view/${id}`,
        method: 'get',
    })
}
