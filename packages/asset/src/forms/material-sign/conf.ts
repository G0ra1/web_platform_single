/**
 * @Description 资产签收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:27
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "signType": {
        "type": "number",
        "description": "签收类型;派发签收、"
    },
    "taskId": {
        "type": "string",
        "description": "任务id"
    },
    "businessId": {
        "type": "string",
        "description": "对应业务id;派发id、或其他业务id"
    },
    "signUserId": {
        "type": "string",
        "description": "签收人id"
    },
    "signUserName": {
        "type": "string",
        "description": "签收人姓名"
    },
    "signUserParentOrgId": {
        "type": "string",
        "description": "签收人父级机构id"
    },
    "signUserParentOrgName": {
        "type": "string",
        "description": "签收人父级机构名称"
    },
    "signUserParentDeptId": {
        "type": "string",
        "description": "签收人父级部门id"
    },
    "signUserParentDeptName": {
        "type": "string",
        "description": "签收人父级部门名称"
    },
    "signUserOrgFullId": {
        "type": "string",
        "description": "签收人父级组织全路径id"
    },
    "signTime": {
        "type": "string",
        "description": "签收时间"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
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
    "distributeType": {
        "type": "number",
        "description": "派发类型"
    },
    "sourceId": {
        "type": "string",
        "description": "来源id；领用id"
    },
    "sourceCode": {
        "type": "string",
        "description": "来源code"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "sumTotalNumber": {
        "type": "number",
        "description": "合计数量"
    },
}

export {
    FormSchema
}