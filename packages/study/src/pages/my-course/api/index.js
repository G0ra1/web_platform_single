// api
import { request } from '@platform/main'
export function query (params) {
  return request({
      url: `/study/studyUser/getLesson`,
      method: 'post',
      data: params
  })
}

// 根据课程id查询详情
export function detail (id) {
  return request({
      url: `/study/studyClassLessonDef/${id}`,
      method: 'get',
  })
}
// 课程选择课件或练习试卷
export function lessonChooseCouOrPracticePaper (params) {
  return request({
      url: `/study/studyClassLessonDef/lessonChooseCouOrPracticePaper`,
      method: 'put',
      data: params
  })
}
//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}