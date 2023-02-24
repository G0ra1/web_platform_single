/**
 * @Description 设备保养记录详情表单
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 16:25:43
 */

const FormSchema = {
    "deviceId": {
        "type": "string",
        "description": "设备ID"
    },
    "deviceName": {
        "type": "string",
        "description": "设备名称"
    },
    "deviceCode": {
        "type": "string",
        "description": "设备编号"
    },
    "specifications": {
        "type": "string",
        "description": "规格型号"
    },
    "manufacturer": {
        "type": "string",
        "description": "生产厂家"
    },
    "factoryNumber": {
        "type": "string",
        "description": "出厂编号"
    },
    "productionTime": {
        "type": "string",
        "description": "投产时间"
    },
    "orgId": {
        "type": "string",
        "description": "所属单位"
    },
    "orgName": {
        "type": "string",
        "description": "所属单位"
    },
    "approvalTime": {
        "type": "string",
        "description": "校准日期"
    },
    "maintainTime": {
        "type": "string",
        "description": "保养日期"
    },
    "deviceStatus": {
        "type": "number",
        "description": "设备状态;1在用2停用3报废"
    },
    "maintainRules": {
        "type": "number",
        "description": "保养规则;1月保养2年保养"
    },
    "maintainDetails": {
        "type": "string",
        "description": "保养详情"
    },
    "maintainType": {
        "type": "number",
        "description": "保养类型;1保养2校准"
    },
    "remarks": {
        "type": "string",
        "description": "备注"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}