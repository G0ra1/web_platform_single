// api
import { request } from '@platform/main'
export function studyUserList (params) {
  return request({
      url: `/study/studyUser/getPlan`,
      method: 'post',
      data: params
  })
}

export function creatPlanDef (params) {
  return request({
      url: `/study/studyPlanDef`,
      method: 'post',
      data: params
  })
}
export function editPlanDef (params) {
  return request({
      url: `/study/studyPlanDef`,
      method: 'put',
      data: params
  })
}

//详情接口
export function studyPlanDefId (id) {
  return request({
      url: `/study/studyPlanDef/${id}`,
      method: 'get',
  })
}
export function del (id) {
  return request({
      url: `/study/studyPlanDef/${id}`,
      method: 'delete',
  })
}

// 培训计划id课程试卷详情
export function studyPlanLessonPaperId (id) {
  return request({
      url: `/study/studyPlanLesson/lesson/${id}`,
      method: 'get',
  })
}

//字典 调用
export function dictItemLists (id) {
  return request({
      url: `/dict/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}

// 课程表
export function studyClassLessonDefList (params) {
  return request({
      url: `/study/studyClassLessonDef/lists`,
      method: 'post',
      data: params
  })
}
// 培训计划关联课程
export function creatStudyPlanLesson (params) {
  return request({
      url: `/study/studyPlanLesson`,
      method: 'post',
      data: params
  })
}
export function editStudyPlanLesson (params) {
  return request({
      url: `/study/studyPlanLesson`,
      method: 'put',
      data: params
  })
}

// 学员端通过课程id查询考试试卷
export function getExaminationPaperByLessonIdStudentId (id) {
  return request({
      url: `/study/studyExamPaperDef/getExaminationPaperByLessonIdStudent/${id}`,
      method: 'get',
  })
}

// 人员答考试题-学员
export function studyUserAnswer (params) {
  return request({
      url: `/study/studyUser/answer/exam`,
      method: 'post',
      data: params
  })
}