/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
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
    "deliveryNumber": {
        "type": "number",
        "description": "出库数量"
    },
    "notDeliveryNumber": {
        "type": "number",
        "description": "未出库数量"
    },
    "intoNumber": {
        "type": "number",
        "description": "入库数量"
    },
    "notIntoNumber": {
        "type": "number",
        "description": "未入库数量"
    },
    "borrowOrgId": {
        "type": "string",
        "description": "借出单位id"
    },
    "borrowOrgName": {
        "type": "string",
        "description": "借出单位"
    },
    "borrowDeptId": {
        "type": "string",
        "description": "借出部门id"
    },
    "borrowDeptName": {
        "type": "string",
        "description": "借出部门"
    },
    "borrowUserId": {
        "type": "string",
        "description": "借出负责人id"
    },
    "borrowUserName": {
        "type": "string",
        "description": "借出负责人"
    },
    "needDeptId": {
        "type": "string",
        "description": "需用部门id"
    },
    "needDeptName": {
        "type": "string",
        "description": "需用部门"
    },
    "borrowState": {
        "type": "number",
        "description": "借用状态"
    },
}

export {
    FormSchema
}