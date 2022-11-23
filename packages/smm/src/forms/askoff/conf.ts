// 字段描述
const FormSchema = {
    "applyUserId": {
        "type": "string",
        "description": "申请人id",
        "exampleSetFlag": true
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人姓名",
        "exampleSetFlag": true
    },
    "applyType": {
        "type": "number",
        "description": "请假类型",
        "exampleSetFlag": true
    },
    "applyDay": {
        "type": "number",
        "description": "请假天数",
        "exampleSetFlag": true
    },
    "applyReason": {
        "type": "string",
        "description": "请假原因",
        "exampleSetFlag": true
    },
    "applyStartDate": {
        "type": "string",
        "description": "请假开始日期",
        "exampleSetFlag": true
    },
    "applyEndDate": {
        "type": "string",
        "description": "请假结束日期",
        "exampleSetFlag": true
    },
}

export {
    FormSchema
}