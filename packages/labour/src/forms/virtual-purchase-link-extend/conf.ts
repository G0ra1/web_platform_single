/**
 * @Description 采购合同扩展信息
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

const FormSchema = {
    "purchaseLinkId": {
        "type": "string",
        "description": "关联虚拟订单id"
    },
    "taxrateName": {
        "type": "string",
        "description": "税率"
    },
    "taxrate": {
        "type": "string",
        "description": "税率"
    },
    "invoiceTypeName": {
        "type": "string",
        "description": "发票类型"
    },
    "invoiceType": {
        "type": "string",
        "description": "发票类型"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
    "workHourAmount": {
        "type": "number",
        "description": "工时时薪"
    },
    "overtimeHourAmount": {
        "type": "number",
        "description": "加班时薪"
    },
    "workdayOvertimeCoefficient": {
        "type": "number",
        "description": "工作日加班倍数"
    },
    "dayOffOvertimeCoefficient": {
        "type": "number",
        "description": "休息日加班倍数"
    },
    "legalDayOffOvertimeCoefficient": {
        "type": "number",
        "description": "法定休假日加班倍数"
    },
    "contractname": {
        "type": "string",
        "description": "合同名称"
    },
    "contractcode": {
        "type": "string",
        "description": "合同code"
    },
    "partaname": {
        "type": "string",
        "description": "甲方单位"
    },
    "planId": {
        "type": "string",
        "description": "需求计划id"
    },
}

export {
    FormSchema
}