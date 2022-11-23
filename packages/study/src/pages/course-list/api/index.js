import { request } from '@platform/main'

export function query(params) {
  return request({
      url: `/study/studyLesson/list`,
      method: 'post',
      data: params
  })
}
// 调整详情
export function detail(id) {
  return request({
      url: `/study/studyLesson/detailForAdj/${id}`,
      method: 'get',
  })
  // /study/studyLesson/procDetail
}

//  查看详情
export function studyLessonDetail(id) {
  return request({
      url: `/study/studyLesson/${id}`,
      method: 'get',
  })
}

//  查看历史版本
export function hisListFor(id) {
  return request({
      url: `/study/studyLessonHis/hisListFor/${id}`,
      method: 'get',
  })
}

//  查看调整情况
export function adjListFor(id) {
  return request({
      url: `/study/studyLessonAdj/adjListFor/${id}`,
      method: 'get',
  })
}

// 热门展示接口
export function showIndex(id) {
  return request({
      url: `/study/studyLesson/updateIsIndex/${id}`,
      method: 'put',
  })
}

// 启用停用接口
export function isEnable(id) {
  return request({
      url: `/study/studyLesson/updateIsEnable/${id}`,
      method: 'put',
  })
}

// 调整详情
export function studyLessonAdjDetail(id) {
  return request({
      url: `/study/studyLessonAdj/${id}`,
      method: 'get',
  })
}

// 历史详情
export function studyLessonHisDetail(id) {
  return request({
      url: `/study/studyLessonHis/${id}`,
      method: 'get',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}


// 课程分类
export function courseClassification (type) {
  return request({
      url: `/main/dictTree/childList/` + type,
      method: 'get',
  })
}

//台账删除
export function del (id) {
  return request({
      url: `/study/studyLesson/delete/${id}`,
      method: 'delete',
  })
}

//调整记录删除
export function adjDel (id) {
  return request({
      url: `/study/studyLessonAdj/delete/${id}`,
      method: 'delete',
  })
}

 