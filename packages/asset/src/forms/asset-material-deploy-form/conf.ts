/**
 * @Description 资产调配
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-11-24 16:30:16
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "lendUnitId": {
        "type": "string",
        "description": "借出单位id"
    },
    "needDeptId": {
        "type": "string",
        "description": "需用部门id"
    },
    "needDept": {
        "type": "string",
        "description": "需用部门"
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
    "type": {
        "type": "number",
        "description": "类型"
    },
    "typeName": {
        "type": "string",
        "description": "类型名称"
    },
    "deliveryNumber": {
        "type": "number",
        "description": "出库数量"
    },
    "notDeliveryNumber": {
        "type": "number",
        "description": "未出库数量"
    },
    "deliveryAmount": {
        "type": "number",
        "description": "出库金额"
    },
    "notDeliveryAmount": {
        "type": "number",
        "description": "未出库金额"
    },
    "deployUnit": {
        "type": "string",
        "description": "调出单位"
    },
    "deployUserId": {
        "type": "string",
        "description": "调拨负责人id"
    },
    "deployUser": {
        "type": "string",
        "description": "调拨负责人"
    },
    "deployState": {
        "type": "string",
        "description": "调拨状态"
    },
}

export {
    FormSchema
}