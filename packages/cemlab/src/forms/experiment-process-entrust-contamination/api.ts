import { Request, request } from '@platform/main'

//获取检测项目
export async function getExperimentItems(data: any) {
    return request({
        url: `/cemlab/cemlabExperimentItems/list`,
        method: 'post',
        data
    })
}
//获取任务样品信息
export async function getExperimentSpecimenList(data: any) {
    return request({
        url: `/cemlab/cemlabExperimentSpecimen/list`,
        method: 'post',
        data
    })
}
