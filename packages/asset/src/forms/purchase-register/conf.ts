/**
 * @Description 采购信息登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:58
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
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
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "applyUserId": {
        "type": "string",
        "description": "申请人"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyUserOrgId": {
        "type": "string",
        "description": "申请人机构"
    },
    "applyUserOrgName": {
        "type": "string",
        "description": "申请人机构名称"
    },
    "applyUserDeptId": {
        "type": "string",
        "description": "申请人部门"
    },
    "applyUserDeptName": {
        "type": "string",
        "description": "申请人部门名称"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "planYear": {
        "type": "string",
        "description": "计划年度"
    },
    "applyId": {
        "type": "string",
        "description": "购置申请id;购置申请id"
    },
    "applyCode": {
        "type": "string",
        "description": "购置申请code"
    },
    "contractId": {
        "type": "string",
        "description": "采购合同id"
    },
    "contractCode": {
        "type": "string",
        "description": "采购合同code"
    },
    "contractTime": {
        "type": "string",
        "description": "采购合同签订时间"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "contractFileIds": {
        "type": "string",
        "description": "采购合同附件ids"
    },
    "supplierId": {
        "type": "string",
        "description": "供应商id"
    },
    "supplierName": {
        "type": "string",
        "description": "供应商"
    },
    "contractFileName": {
        "type": "string",
        "description": "采购合同附件名称"
    },
    "status": {
        "type": "number",
        "description": "验收状态"
    },
    "notAcceptanceAmount": {
        "type": "number",
        "description": "未验收金额"
    },
    "acceptanceNumber": {
        "type": "number",
        "description": "验收数量"
    },
    "notAcceptanceNumber": {
        "type": "number",
        "description": "未验收数量"
    },
}

export {
    FormSchema
}