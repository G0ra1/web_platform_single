/**
 * @Description 物资购置验收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:04
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "acceptanceType": {
        "type": "number",
        "description": "验收类型"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
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
    "registerCode": {
        "type": "string",
        "description": "采购登记编号"
    },
    "registerId": {
        "type": "string",
        "description": "采购登记Id"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "purchaseType": {
        "type": "number",
        "description": "物资购置类型"
    },
    "assetSource": {
        "type": "number",
        "description": "物资来源"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "applyUserId": {
        "type": "string",
        "description": "申请人ID"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyUserOrgId": {
        "type": "string",
        "description": "申请人机构ID"
    },
    "applyUserOrgName": {
        "type": "string",
        "description": "申请人机构名称"
    },
    "applyUserDeptId": {
        "type": "string",
        "description": "申请人部门ID"
    },
    "applyUserDeptName": {
        "type": "string",
        "description": "申请人部门名称"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
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
    "contractFileIds": {
        "type": "string",
        "description": "采购合同附件ids"
    },
    "status": {
        "type": "number",
        "description": "验收状态"
    },
    "storageNumber": {
        "type": "number",
        "description": "入库数量"
    },
    "notStorageNumber": {
        "type": "number",
        "description": "未入库数量"
    },
    "notStorageAmount": {
        "type": "number",
        "description": "未入库金额"
    },
    "applyId": {
        "type": "string",
        "description": "购置申请id"
    },
}

export {
    FormSchema
}