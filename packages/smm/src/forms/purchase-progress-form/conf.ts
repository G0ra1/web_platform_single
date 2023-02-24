/**
 * @Description 二级物资集中采购项目进度情况表
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
 */

const FormSchema = {
    "itemTime": {
        "type": "string",
        "description": "年份"
    },
    "materialsTypeName": {
        "type": "string",
        "description": "大类名称"
    },
    "materialsTypeCode": {
        "type": "string",
        "description": "大类编码"
    },
    "projectName": {
        "type": "string",
        "description": "项目名称"
    },
    "finishTime": {
        "type": "string",
        "description": "要求完成时间"
    },
    "unitName": {
        "type": "string",
        "description": "组长单位名称"
    },
    "unitId": {
        "type": "string",
        "description": "组长单位id"
    },
    "floatRange": {
        "type": "number",
        "description": "浮动范围"
    },
    "pricingMechanism": {
        "type": "string",
        "description": "调价机制"
    },
    "resultPublic": {
        "type": "string",
        "description": "结果公告"
    },
    "priceAdjustment": {
        "type": "string",
        "description": "价格调整公示"
    },
    "postponePublic": {
        "type": "string",
        "description": "延期公告"
    },
    "others": {
        "type": "string",
        "description": "其他事项"
    },
    "explanation": {
        "type": "string",
        "description": "备注"
    },
    "procurementMethodName": {
        "type": "string",
        "description": "采购方式"
    },
    "procurementMethodCode": {
        "type": "string",
        "description": "采购方式编码"
    },
    "taskInstId": {
        "type": "string",
        "description": "任务实例id"
    },
    "taskNodeId": {
        "type": "string",
        "description": "任务节点id"
    },
    "permissionStatus": {
        "type": "number",
        "description": "权限状态"
    },
}

export {
    FormSchema
}