import { Request, request } from '@platform/main'

//查询试验单信息
export async function getExperimentProcess(id: String) {
    return request({
        url: `/cemlab/cemlabExperimentProcess/${id}`,
        method: 'get',
    })

}