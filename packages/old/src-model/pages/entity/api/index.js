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
    url: `/main/entity/detailId/${id}`,
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

export function entityPage(params) {
  return request({
    url: `/main/entity/page`,
    method: 'post',
    data: params
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
export function create(data) {
  return request({
    url: `/main/entity`,
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: `/main/entity`,
    method: 'put',
    data
  })
}
export function del(id) {
  return request({
    url: `/main/entity/${id}`,
    method: 'delete',
  })
}

//执行SQL
export function execSql(data, dsid) {
  return request({
    url: `/main/entity/execSql/${dsid}`,
    method: 'post',
    data
  })
}

// 查询实例字段列表

export function fieldList(id) {
  return request({
    url: `/main/entity/field/list/${id}`,
    method: 'get',
  })
}




