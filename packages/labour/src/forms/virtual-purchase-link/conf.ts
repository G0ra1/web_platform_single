/**
 * @Description 虚拟订单
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

const FormSchema = {
    "planId": {
        "type": "string",
        "description": "需求计划id"
    },
    "planName": {
        "type": "string",
        "description": "需求计划名称"
    },
    "virtualPurchaseName": {
        "type": "string",
        "description": "虚拟订单名称"
    },
    "virtualPurchaseCode": {
        "type": "string",
        "description": "虚拟订单code"
    },
    "virtualPurchaseId": {
        "type": "string",
        "description": "虚拟订单id"
    },
    "contractPurchaseId": {
        "type": "string",
        "description": "关联采购合同id"
    },
    "contractPurchaseCode": {
        "type": "string",
        "description": "采购合同code"
    },
    "contractPurchaseName": {
        "type": "string",
        "description": "采购合同name"
    },
}

export {
    FormSchema
}