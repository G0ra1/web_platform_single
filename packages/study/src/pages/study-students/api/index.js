// api
import { request, Cookies } from '@platform/main'

// 点击率
export function upHits (id) {
  return request({
      url: `/study/studyNews/upHits?id=${id}`,
      method: 'get',
  })
}

// 轮播图
export function slideshowList (params) {
  return request({
      url: `/study/xueyuan/index/getHomeBanners`,
      method: 'post',
      data: params
  })
}


// 公告
export function studyNewsList (params) {
  return request({
      url: `/study/xueyuan/index/getNews`,
      method: 'post',
      data: params
  })
}

// 课程
export function getLessons () {
  return request({
      url: `/study/xueyuan/index/getLessons`,
      method: 'get',
  })
}

// 专题
export function getSpecials () {
  return request({
      url: `/study/xueyuan/index/getSpecials`,
      method: 'get',
  })
}

//  首页学时排行榜

export function getStudyTimeRanking (type) {
  return request({
      url: `/study/xueyuan/index/getStudyTimeRanking?size=${type}`,
      method: 'get',
  })
}


//  首页课程排行榜

export function getLessonRanking (type) {
  return request({
      url: `/study/xueyuan/index/getLessonRanking?size=${type}`,
      method: 'get',
  })
}

//  首页专题排行榜

export function getSpecialRanking (type) {
  return request({
      url: `/study/xueyuan/index/getSpecialRanking?size=${type}`,
      method: 'get',
  })
}

// 课程、专题分类
export function courseClassification (type) {
  return request({
      url: `/main/dictTree/childList/` + type,
      method: 'get',
  })
}
// 课程列表
export function lessonList (params) {
  return request({
      url: `/study/xueyuan/lesson/pageForIndex`,
      method: 'post',
      data: params
  })
}
// 课程详情
export function courseDetail (id) {
  return request({
      url: `/study/xueyuan/lesson/getLessonDetail/${id}`,
      method: 'get',
  })
}
//标签字典 调用
export function dictItemLists (id) {
  return request({
      url: `/main/dictItem/list?dictCode=${id}`,
      method: 'get',
  })
}

// 专题列表
export function specialList (params) {
  return request({
      url: `/study/xueyuan/special/pageList`,
      method: 'post',
      data: params
  })
}

// 专题详情接口
export function specialDetail (id) {
  return request({
      url: `/study/xueyuan/special/detail/${id}`,
      method: 'get',
  })
}
// 专题申请接口
export function learnApply (params) {
  return request({
      url: `/study/xueyuan/special/learnApply`,
      method: 'post',
      data: params
  })
}

// 收藏
export function saveCollection (params) {
  return request({
      url: `/study/xueyuan/center/saveCollection`,
      method: 'post',
      data: params
  })
}

// 课程评论
export function lessonComments (params) {
  return request({
      url: `/study/lessonComments`,
      method: 'post',
      data: params
  })
}

// 获得课程评论
export function getCommentsByLessonId (id) {
  return request({
      url: `/study/xueyuan/lesson/getCommentsByLessonId/${id}`,
      method: 'get',
  })
}

// 评论提交
export function submitComments (params) {
  return request({
      url: `/study/studyLessonComments`,
      method: 'post',
      data: params
  })
}

// 专题课程详情
export function specialcourseDetail (data) {
  return request({
      url: `/study/xueyuan/special/detail/getLessonMsg?specialId=${data.specialId}&lessonId=${data.lessonId}`,
      method: 'get',
  })
}

// 课件申请接口
export function lessonLearnApply (params) {
  return request({
      url: `/study/xueyuan/lesson/learnApply`,
      method: 'post',
      data: params
  })
}

//课程学习记录
export function saveLessonRecord (params) {
  return request({
      url: `/study/studyUserStudyRecords/saveLessonRecord`,
      method: 'post',
      data: params
  })
}

//专题课程学习记录
export function saveSpecialRecord (params) {
  return request({
      url: `/study/studyUserStudyRecords/saveSpecialRecord`,
      method: 'post',
      data: params
  })
}
//获取专题考试是否可以考试
export function isCanExam (id) {
  return request({
      url: `/study/xueyuan/special/isCanExam/${id}`,
      method: 'get',
  })
}

//生成试卷
export function generatePaper (id) {
  return request({
      url: `/study/xueyuan/exam/generatePaper/${id}`,
      method: 'get',
  })
}
// 保存试卷
export function studentAnswer (params) {
  return request({ 
      url: `/study/xueyuan/exam/studentAnswer`,
      method: 'post',
      data: params
  })
}

//提交试卷
export function submittedPapers (id) {
  return request({
      url: `/study/xueyuan/exam/submittedPapers/${id}`,
      method: 'put',
  })
}

// 我的考试
export function getUserExamPage (params) {
  return request({
      url: `/study/xueyuan/center/getUserExamPage`,
      method: 'post',
      data: params
  })
}

// 我的考试 - 查看详情
export function getUserExamDetail (id) {
  return request({
      url: `/study/xueyuan/center/getUserExamDetail/${id}`,
      method: 'get',
  })
}

// 我的收藏 - 专题
export function getSpecialPage (params) {
  return request({
      url: `/study/xueyuan/center/getSpecialPage`,
      method: 'post',
      data: params
  })
}

// 我的收藏 - 课程
export function getLessonPage (params) {
  return request({
      url: `/study/xueyuan/center/getLessonPage`,
      method: 'post',
      data: params
  })
}


// 我的申请
export function getLearnApply (params) {
  return request({
      url: `/study/xueyuan/center/learnApply/pageList`,
      method: 'post',
      data: params
  })
}
// 我的证书
export function certificate (params) {
  return request({
      url: `/study/xueyuan/center/certificate/pageList`,
      method: 'post',
      data: params
  })
}

// 我的浏览记录 - 专题
export function getBrowseSpecials (params) {
  return request({
      url: `/study/xueyuan/center/browse/getSpecials`,
      method: 'post',
      data: params
  })
}

// 我的浏览记录 - 课程
export function getBrowseLessons (params) {
  return request({
      url: `/study/xueyuan/center/browse/getLessons`,
      method: 'post',
      data: params
  })
}

// 我的
export function getUserRecords (params) {
  return request({
      url: `/study/xueyuan/center/getUserRecords`,
      method: 'post',
      data: params
  })
}

// 评分
export function studyLessonScore (params) {
  return request({
      url: `/study/studyLessonScore`,
      method: 'post',
      data: params
  })
}

// 我的专题
export function mySpecial (params) {
  return request({
      url: `/study/xueyuan/mySpecial/list`,
      method: 'post',
      data: params
  })
}

// 个人中心个人信息
export function getUserMsg (params) {
  return request({
      url: `/study/xueyuan/center/getUserMsg`,
      method: 'post',
      data: params
  })
}
  // 证书下载
export function exportTemplate (row) {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/study/xueyuan/center/certificate/stream/${row.id}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`
        }),
        responseType: "blob"
      }
    )
      .then(response => response.arrayBuffer())
      .then(res => {
        var a = document.createElement("a");
        a.style.display = "none";
        var url = URL.createObjectURL(
          new Blob([res], {
            type:
              "application/zip;charset=UTF-8"
          })
        );
        a.href = url;
        a.download = row.certificateName + '.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}
