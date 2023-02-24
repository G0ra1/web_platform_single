/**
 * @Description 盘点任务
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-06 17:59:32
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "inventoryPlanId": {
        "type": "string",
        "description": "盘点计划id"
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
    "sumTotalNumber": {
        "type": "number",
        "description": "合计数量"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
}

export {
    FormSchema
}