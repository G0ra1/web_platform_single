/**
 * @Description 采购合同单价管理
 * @author 云数网讯 dongshuangyin@netwisd.com
 * @date 2023-01-30 11:00:34
 */

const FormSchema = {
    "purchaseLinkId": {
        "type": "string",
        "description": "虚拟订单id"
    },
    "contractName": {
        "type": "string",
        "description": "合同名称"
    },
    "contractCode": {
        "type": "string",
        "description": "合同code"
    },
    "outerDisciplineId": {
        "type": "string",
        "description": "专业(规格型号);字典编码outer_discipline"
    },
    "outerDisciplineName": {
        "type": "string",
        "description": "专业名称(规格型号)"
    },
    "restMode": {
        "type": "string",
        "description": "休息方式;1单休2双休3不休"
    },
    "unit": {
        "type": "number",
        "description": "单位;1人/天2人/月"
    },
    "number": {
        "type": "number",
        "description": "数量"
    },
    "price": {
        "type": "number",
        "description": "价格"
    },
    "priceNotax": {
        "type": "number",
        "description": "价格不含税"
    },
    "totalAmount": {
        "type": "number",
        "description": "总价含税"
    },
    "totalAmountNotax": {
        "type": "number",
        "description": "总价不含税"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
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