/**
 * @Description 资产派发
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:22
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
    "type": {
        "type": "string",
        "description": "业务类型"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "distributeType": {
        "type": "number",
        "description": "派发类型"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
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
    "sourceId": {
        "type": "string",
        "description": "来源id"
    },
    "sourceCode": {
        "type": "string",
        "description": "来源code"
    },
    "sumTotalNumber": {
        "type": "number",
        "description": "合计申请数量"
    },
    "notSignNumber": {
        "type": "number",
        "description": "未签收数量"
    },
    "status": {
        "type": "number",
        "description": "状态"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
}

export {
    FormSchema
}