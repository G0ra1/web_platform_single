import { request } from '@platform/main'

export function querys (params) {
    return request({
        url: `/study/studyCou/lists`,
        method: 'post',
        data: params
    })
}

//字典 调用
export function dictItemLists (id) {
    return request({
        url: `/main/dictItem/list?dictCode=${id}`,
        method: 'get',
    })
  }

  export function learningQuerys (params) {
    return request({
        url: `/study/studyMarterials/lists`,
        method: 'post',
        data: params
    })
}

// 课程分类
export function courseClassification (type) {
    return request({
        url: `/main/dictTree/childList/` + type,
        method: 'get',
    })
}