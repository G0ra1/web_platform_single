/**
 * @Description 购置申请
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:52
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
    "sumTotalNumber": {
        "type": "number",
        "description": "合计申请数量"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "itemType": {
        "type": "string",
        "description": "申请类型"
    },
    "itemTypeName": {
        "type": "string",
        "description": "申请类型名称"
    },
    "status": {
        "type": "string",
        "description": "采购状态"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "planYear": {
        "type": "string",
        "description": "计划年度"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "notRegisterAmount": {
        "type": "number",
        "description": "未采购金额"
    },
    "registerNumber": {
        "type": "number",
        "description": "采购登记数量"
    },
    "notRegisterNumber": {
        "type": "number",
        "description": "未采购登记数量"
    },
}

export {
    FormSchema
}