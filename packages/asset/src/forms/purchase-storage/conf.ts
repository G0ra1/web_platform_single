/**
 * @Description 物资验收入库
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:11
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "申请编号"
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
    "sumAcceptanceNumber": {
        "type": "number",
        "description": "购置验收数量"
    },
    "acceptanceCode": {
        "type": "string",
        "description": "购置验收编号"
    },
    "acceptanceId": {
        "type": "string",
        "description": "购置验收Id"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "purchaseType": {
        "type": "number",
        "description": "物资购置类型"
    },
    "assetSource": {
        "type": "string",
        "description": "物项来源"
    },
    "assetSourceName": {
        "type": "string",
        "description": "物项来源名称"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "deployId": {
        "type": "string",
        "description": "调拨申请Id"
    },
    "type": {
        "type": "number",
        "description": "类型"
    },
    "typeName": {
        "type": "string",
        "description": "类型名称"
    },
}

export {
    FormSchema
}