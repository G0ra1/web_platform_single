/**
 * @Description 资产领用
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:16
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "applyUserId": {
        "type": "string",
        "description": "申请人"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人"
    },
    "applyUserOrgId": {
        "type": "string",
        "description": "申请人机构"
    },
    "applyUserOrgName": {
        "type": "string",
        "description": "申请人机构"
    },
    "applyUserDeptId": {
        "type": "string",
        "description": "申请人部门"
    },
    "applyUserDeptName": {
        "type": "string",
        "description": "申请人部门"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "sumTotalAmount": {
        "type": "number",
        "description": "合计金额"
    },
    "sumTotalUntaxedAmount": {
        "type": "number",
        "description": "合计金额-未税"
    },
    "sumTotalTaxAmount": {
        "type": "number",
        "description": "合计金额-税额"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "taskInstId": {
        "type": "string",
        "description": "任务实例Id"
    },
    "parentTaskNodeId": {
        "type": "string",
        "description": "父任务节点Id"
    },
    "taskId": {
        "type": "string",
        "description": "当前节点Id"
    },
    "signNumber": {
        "type": "number",
        "description": "签收数量"
    },
    "notSignNumber": {
        "type": "number",
        "description": "未签收数量"
    },
    "distributeNumber": {
        "type": "number",
        "description": "派发数量"
    },
    "notDistributeNumber": {
        "type": "number",
        "description": "未派发数量"
    },
    "sumTotalNumber": {
        "type": "number",
        "description": "合计申请数量"
    },
    "assetUserId": {
        "type": "string",
        "description": "使用人"
    },
    "assetUserName": {
        "type": "string",
        "description": "使用人"
    },
    "assetDeptId": {
        "type": "string",
        "description": "使用人部门"
    },
    "assetDeptName": {
        "type": "string",
        "description": "使用人部门"
    },
    "assetOrgId": {
        "type": "string",
        "description": "使用人单位"
    },
    "assetOrgName": {
        "type": "string",
        "description": "使用人单位"
    },
}

export {
    FormSchema
}