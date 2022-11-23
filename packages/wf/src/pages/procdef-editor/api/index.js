// import { request } from '@platform/main'
import { request } from '@platform/main'
import { baseName } from '/setting'

export function queryDefXml () {
    // return request({
    //     url: `/bpmn/create.bpmn`,
    //     method: 'get',
    // })
    return fetch(
        `/${baseName}/bpmn/create.bpmn`,
        // `/${baseName}/bpmn/test.bpmn`,
        {
        method: "get"
        }
    ).then(async res => res.text())
}
// 获取事件
export function queryEvents (data = {}) {
    return request({
        url: `/wf/wfevent/list`,
        method: 'post',
        data
    });
}
export function queryAllEvents (data = {}) {
    return request({
        url: `/wf/wfevent/lists`,
        method: 'post',
        data
    });
}

// 获取表达式

export function detailExpress(id) {
    return request({
        url: `/wf/wfexpre/${id}`,
        method: 'get'
    });
}

export function queryExpress (data = {}) {
    return request({
        url: `/wf/wfexpre/list`,
        method: 'post',
        data
    });
  }

//
export function detailForm (id) {
    return request({
      url: `/main/form/detail/${id}`,
      method: 'get'
    })
  }
  
// 查询流程
// 查询流程版本

export function queryProcess (data) {
    return request({
      url: `/wf/wfprocdef/list`,
      method: 'post',
      data
    })
}

export const queryProcessVersionList = (id) => {
    return request({
        url: `/wf/wfprocdef/queryVerListByCamundaProcdefKey?camundaProcdefKey=${id}`,
        method: 'post'
    })
}

// 获取字典表

export function queryDictItemLists(data) {
    return request({
        url: `/main/dictItem/list?dictCode=${data.code}`,
        method: 'get',
    })
}

export function queryExp (id) {
    return request({
    url: `/main/expression/list?groupName=user-expression-controller`,
    method: 'get'
    })
}

// 获取表单
export function queryForms (id) {
//   return request({
//     url: `/main/form/${id}`,
//     method: 'delete'
//   })
    return new Promise((resolve) => {
        resolve([])
    })
}

// 获取表单信息
export function queryFormById (id) {
    return request({
        url: `/main/page/${id}`,
        method: 'get'
    })
}

// 根据serviceid 获取tag
export function queryTags (type, serviceId) {
    // getConditionTagByServiceId getTaskTagByServiceId
    return request({
        // url: `/wf/procTag/${type === 'ExecutionListener' ? 'getConditionTagByServiceId' : 'getTaskTagByServiceId'}`,
        url: `/wf/procTag/${type === 'ExecutionListener' ? 'getExeTagByServiceId' : 'getTaskTagByServiceId'}`,
        method: 'get',
        params: {
            serviceId
        }
    })
}
// 条件表达式Tag 用在表达式参数中
export function queryConditionTags (serviceId) {
    return request({
        url: `/wf/procTag/getConditionTagByServiceId`,
        method: 'get',
        params: {
            serviceId
        }
    })
}


// 获取流程分类
export function queryProcdeftype () {
    return request({
    url: `/wf/wfprocdeftype/list`,
    method: 'get'
    })
}

// 创建流程定义
export function createProcdef (data) {
    return request({
        url: `/wf/wfprocdef/deployment`,
        method: 'post',
        data
    })
}
// 流程详情
export function detailProcdef (id) {
    return request({
        url: `/wf/wfprocdef/getXmlByCamundaId?camundaDefId=${id}`,
        method: 'get'
    }, false)
}
// 查询表达式

// -----------mdm Org

export function queryOrg (data) {
    return request({
        url: `/main/mdmOrg/list`,
        method: 'post',
        data
    })
}
export function queryUsers (data) {
    return request({
        url: `/main/mdmUser/list`,
        method: 'post',
        data
    })
}
// 创建新版本 
export const queryXmlByCamundaProcdefId = (id) => {
  return request({
    url: `/wf/wfprocdef/createNewVersionByCamundaProcdefId?camundaProcdefId=${id}`,
    method: 'post'
  })
}

// 回写功能
export const bindCpt = (cptId, camundaProcdefKey) => {
    return request({
        url: `/main/mdmCpts/updateProcKey/${cptId}/${camundaProcdefKey}`,
        method: 'put'
    })
}