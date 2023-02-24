// api
import { request } from '@platform/main'

// -------初始化相关
// 根据流程定义Key 获取流程定义信息
export function createFormByCamundaDefKey (camundaProcdefKey: string ) {
    return request({
        url: `/wf/wfprocdef/createFormByCamundaDefKey?camundaProcdefKey=${camundaProcdefKey}`,
        method: 'get'
    });
}

// 获取流程实例数据
export function getFormInfo (taskType: string, id: string) {
  return request({
    url: `/wf/wfEngine/getFormInfo?taskType=${taskType}&id=${id}`,
    method: 'get'
  });

}

// 保存
export function save (data: any) {
    return request({
      url: `/wf/wfEngine/save`,
      method: 'post',
      data
    });
}

// ------流程操作相关-------
// 办理
export function handle (data: any) {
    return request({
      url: `/wf/wfEngine/handle`,
      method: 'post',
      data
    });
  }
  
  // 知会提交
export function notifySubmit (id: string, op: string) {
  return request({
    url: `/wf/wfEngine/handleNotifyOp/${id}/${op}`,
    method: 'put'
  });
}

// 办理提交
export function submit (data: any) {
  
  return request({
    url: `/wf/wfEngine/submit`,
    method: 'post',
    data
  });
}
// 签收数据
export function claim (camundaTaskId: string) {
  return request({
    url: `/wf/wfEngine/claim/${camundaTaskId}`,
    method: 'put'
  });
}

// 日志/getRejectAllToList/{camundaProcinsId}

export function queryLog (camundaProcinsId: string) {
  // 没有去重的
  return request({
    url: `/wf/wfEngine/getAllProcessLog/${camundaProcinsId}`,
    method: 'get'
  });
}

export function queryRejectNode (camundaProcinsId: string) {
  // 没有去重的
  return request({
    url: `/wf/wfprocesslog/getRejectAllToList/${camundaProcinsId}`,
    method: 'get'
  });
}

// 驳回
export function reject (data: any) {
  return request({
    url: `/wf/wfEngine/reject`,
    method: 'put',
    data
  });
}



// 流程挂起
export function suspendProcess (
  camundaProcinsId: string,
  camundaProcdefId: string,
  camundaTaskId: string
) {
  return request({
    url: `/wf/wfEngine/suspendProcess`,
    method: 'put',
    data: {
      camundaProcinsId,
      camundaProcdefId,
      camundaTaskId
    }
  });
}
// 流程激活
export function activateProcess (
  camundaProcinsId: string,
  camundaProcdefId: string,
  camundaTaskId: string
) {
  return request({
    url: `/wf/wfEngine/activateProcess`,
    method: 'put',
    data: {
      camundaProcinsId,
      camundaProcdefId,
      camundaTaskId
    }
  });
}

// 流程终止
export function endProcess (
  camundaProcinsId: string,
  camundaProcdefId: string,
  camundaTaskId: string
) {
  return request({
    url: `/wf/wfEngine/endProcess`,
    method: 'put',
    data: {
      camundaProcinsId,
      camundaProcdefId,
      camundaTaskId
    }
  });
}
// 流程删除
export function deleteProcess (
  camundaProcinsId: string,
  camundaProcdefId: string,
  camundaTaskId: string
) {
  return request({
    url: `/wf/wfEngine/deleteProcess`,
    method: 'post',
    data: {
      camundaProcinsId,
      camundaProcdefId,
      camundaTaskId
    }
  });
}