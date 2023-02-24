/**
 * @Description 虚拟订单-结算单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-12-08 09:49:08
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
    "contractPurchaseName": {
        "type": "string",
        "description": "关联采购合同名称"
    },
    "contractPurchaseCode": {
        "type": "string",
        "description": "关联采购合同code"
    },
    "contractPurchaseId": {
        "type": "string",
        "description": "关联采购合同id"
    },
    "virtualPurchaseId": {
        "type": "string",
        "description": "虚拟采购订单Id"
    },
    "finalType": {
        "type": "string",
        "description": "stage阶段性结算;final最终结算;"
    },
    "cutOffTime": {
        "type": "string",
        "description": "结算截止时间"
    },
    "settleCode": {
        "type": "string",
        "description": "结算书编号"
    },
    "amountNowSettle": {
        "type": "number",
        "description": "本次结算金额"
    },
    "amountNowSettleUpper": {
        "type": "string",
        "description": "本次结算金额(大写)"
    },
    "amountSettle": {
        "type": "number",
        "description": "已结算金额"
    },
    "amountSettleUpper": {
        "type": "string",
        "description": "已结算金额(大写)"
    },
    "purchaseFrameId": {
        "type": "string",
        "description": "关联采购 框架合同名称"
    },
    "purchaseFrameCode": {
        "type": "string",
        "description": "关联采购 框架合同code"
    },
    "purchaseFrameName": {
        "type": "string",
        "description": "关联采购 框架合同id"
    },
}

export {
    FormSchema
}