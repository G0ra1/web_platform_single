// api
import { request } from '@platform/main'



// 分类列表
export function  classifys(params) {
  return request({
      url: `main/dictTree/page`,
      method: 'post',
      data: params
  })
}


// 查出不分页分类
export function allClassifys (id) {
  return request({
      url: `main/dictTree/list?parentCode=${id}`,
      method: 'get',
  })
}


// 添加树形
export function creatDictTree (params) {
  return request({
      url: `main/dictTree`,
      method: 'post',
      data: params
  })
}
// 修改
export function editDictTree (params) {
  return request({
      url: `main/dictTree`,
      method: 'put',
      data: params
  })
}

  //  删除
  export function del (ids) {
    return request({
        url: `/main/dictTree/${ids}`,
        method: 'delete',
    })
  }

  export function dictTreeList (d) {
    return request({
        url: `main/dictTree/childList/${d.dictCode}`,
        method: 'get',
    })
  }

  export function dictTreeVersionList (d) {
    return request({
        url: `main/dictTreeVersion/list?dictTreeId=${d}`,
        method: 'get',
    })
  }

  export function settingMainVersion (d) {
    return request({
        url: `main/dictTreeVersion/settingMainVersion?id=${d}`,
        method: 'get',
    })
  }
//  版本删除
export function dictTreeDel (ids) {
  return request({
      url: `/main/dictTreeVersion/${ids}`,
      method: 'delete',
  })
}