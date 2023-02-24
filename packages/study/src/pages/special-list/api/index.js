import { request } from '@platform/main'

export function query(params) {
  return request({
    url: `/study/studySpecial/pageList`,
      method: 'post',
      data: params
  })
}


export function detail(id) {
  return request({
      url: `/study/studySpecial/detailForAdj/${id}`,
      method: 'get',
  })
}



//  查看详情
export function studySpecialDetail(id) {
  return request({
      url: `study/studySpecial/${id}`,
      method: 'get',
  })
}

//  查看历史版本
export function hisListFor(id) {
  return request({
    
      url: `/study/studySpecialHis/hisListFor/${id}`,
      method: 'get',
  })
}

//  查看调整情况
export function adjListFor(id) {
  return request({
      url: `/study/studySpecialAdj/adjListFor/${id}`,
      method: 'get',
  })
}

// 热门展示接口
export function showIndex(id) {
  return request({
      url: `/study/studySpecial/showIndex/${id}`,
      method: 'put',
  })
}

// 启用停用接口
export function isEnable(id) {
  return request({
      url: `/study/studySpecial/isEnable/${id}`,
      method: 'put',
  })
}
// 调整详情
export function studySpecialAdjDetail(id) {
  return request({
      url: `/study/studySpecialAdj/${id}`,
      method: 'get',
  })
}

// 历史详情
export function studySpecialHisDetail(id) {
  return request({
      url: `/study/studySpecialHis/${id}`,
      method: 'get',
  })
}

export function  classifys(type) {
  return request({
    url: `/main/dictTree/childList/` + type,
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

//台账删除
export function del (id) {
  return request({
      url: `/study/studySpecial/delete/${id}`,
      method: 'delete',
  })
}

//调整记录删除
export function adjDel (id) {
  return request({
      url: `/study/studySpecialAdj/delete/${id}`,
      method: 'delete',
  })
}

 