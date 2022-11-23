export default {
    "sumBudgetExecuteAmount": {
        "name": "sumBudgetExecuteAmount",
        "type": "number",
        "description": "预算执行金额",
        "example": "",
        "exampleSetFlag": true
    },
    "sumDeductionTaxAmount": {
        "name": "sumDeductionTaxAmount",
        "type": "number",
        "description": "抵扣进项税",
        "example": "",
        "exampleSetFlag": true
    },
    "sumDeductionAmount": {
        "name": "sumDeductionAmount",
        "type": "number",
        "description": "扣减金额",
        "example": "",
        "exampleSetFlag": true
    },
    "testprocBudgetinfoList": {
        "name": "testprocBudgetinfoList",
        "type": "array",
        "description": "testprocBudgetinfoList",
        "items": {
            "name": "报销预算信息 Dto",
            "title": "报销预算信息 Dto",
            "type": "object",
            "properties": {
                "expenseName": {
                    "name": "expenseName",
                    "type": "string",
                    "description": "报销名称"
                },
                "expenseBizKey": {
                    "name": "expenseBizKey",
                    "type": "string",
                    "description": "报销名称"
                },
                "budgetAmount": {
                    "name": "budgetAmount",
                    "type": "number",
                    "description": "预算数"
                }
            }
        }
    }
}