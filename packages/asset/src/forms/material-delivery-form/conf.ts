/**
 * @Description 资产出库管理
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-06 13:43:55
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "申请编号"
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
    "type": {
        "type": "number",
        "description": "类型"
    },
    "typeName": {
        "type": "string",
        "description": "类型名称"
    },
    "withdrawalNumber": {
        "type": "number",
        "description": "退库数量"
    },
    "notWithdrawalNumber": {
        "type": "number",
        "description": "未退库数量"
    },
    "withdrawalAmount": {
        "type": "number",
        "description": "退库金额"
    },
    "notWithdrawalAmount": {
        "type": "number",
        "description": "未退库金额"
    },
    "deployCode": {
        "type": "string",
        "description": "调拨申请编号"
    },
    "deployId": {
        "type": "string",
        "description": "调拨申请Id"
    },
}

export {
    FormSchema
}