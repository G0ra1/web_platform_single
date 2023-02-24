/**
 * @Description 请假申请单
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-14 23:31:14
 */

const FormSchema = {
    "applyUserId": {
        "type": "string",
        "description": "申请人id"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyType": {
        "type": "number",
        "description": "请假类型"
    },
    "applyDay": {
        "type": "number",
        "description": "请假天数"
    },
    "applyReason": {
        "type": "string",
        "description": "请假原因"
    },
    "applyStartDate": {
        "type": "string",
        "description": "请假开始时间"
    },
    "applyEndDate": {
        "type": "string",
        "description": "请假结束时间"
    },
}

export {
    FormSchema
}