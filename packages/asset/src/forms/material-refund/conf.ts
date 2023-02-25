/**
 * @Description 资产退还
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-28 15:39:16
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "borrowId": {
        "type": "string",
        "description": "借用id"
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
}

export {
    FormSchema
}