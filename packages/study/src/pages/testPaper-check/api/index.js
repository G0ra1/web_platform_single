// api
import { request } from '@platform/main'
export function studyExamPaperDefList (params) {
  return request({
      url: `/study/studyExamPaperDef/notApprovedList`,
      method: 'post',
      data: params
  })
}

export function studyExamPaperDef (params) {
  return request({
      url: `/study/studyExamPaperDef/paperExamine`,
      method: 'put',
      data: params
  })
}


export function checkDetail (id) {
  return request({
      url: `/study/studyClassLessonDef/${id}`,
      method: 'get',
  })
}
