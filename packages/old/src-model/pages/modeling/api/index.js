// api
import { request } from '@platform/main'






export function dictTreeList(d) {
  return request({
    url: `/main/dictTree/childList/${d.dictCode}`,
    method: 'get',
  })
}
export function detailId(id) {
  return request({
    url: `/main/modeling/detailId/${id}`,
    method: 'get',
  })
}
//字典 日志管理中调用
export function dictItemLists(data) {
  return request({
      url: `/main/dictItem/list?dictCode=${data.code}`,
      method: 'get',
  })
}

export function modelingPage(params) {
  return request({
    url: `/main/modeling/page`,
    method: 'post',
    data: params
  })
}

export function entityPage(params) {
  return request({
    url: `/main/entity/page`,
    method: 'post',
    data: params
  })
}

export function entityTree(params, entityId) {
  return request({
    url: `/main/modeling/entityTree/${entityId}`,
    method: 'get',
    params
  })
}

export function modelingEntityFieldList(params, entityId) {
  return request({
    url: `/main/modeling/entity/field/list/${entityId}`,
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: `/main/modeling`,
    method: 'post',
    data
  })
}

// 代码下载
export function downloadCode(modelingId) {
  return request({
    url: `/main/modeling/downloadCode?modelingId=${modelingId}`,
    method: 'get',
    responseType: "arraybuffer",
  })
}










export function tableInfoPage(data, dsid) {
  return request({
    url: `/main/tableInfo/page/${dsid}`,
    method: 'post',
    data
  })
}

// 更具表名查询详情
export function columnInfoTableName(dsid, tableName) {
  return request({
    url: `/main/columnInfo/${dsid}/${tableName}`,
    method: 'post',
  })
}
// sql预览
export function getExecSql(data, dsid) {
  return request({
    url: `/main/entity/getExecSql/${dsid}`,
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: `/main/modeling`,
    method: 'put',
    data
  })
}
export function del(id) {
  return request({
    url: `/main/modeling/${id}`,
    method: 'delete',
  })
}



// 查询实例字段列表

export function fieldList(id) {
  return request({
    url: `/main/entity/field/list/${id}`,
    method: 'get',
  })
}

export function test(id,codeType) {
  return request({
    url: `/main/modeling/dynamic?modelingId=${id}`,
    method: 'get',
  })
}





