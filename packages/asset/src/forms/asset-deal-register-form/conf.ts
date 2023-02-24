/**
 * @Description 处置登记申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-13 18:02:08
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "dealApplyId": {
        "type": "string",
        "description": "处置申请id"
    },
    "registerNumber": {
        "type": "number",
        "description": "登记数量"
    },
    "auditSuccessTime": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "status": {
        "type": "string",
        "description": "登记状态"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "planYear": {
        "type": "string",
        "description": "计划年度"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "fileNames": {
        "type": "string",
        "description": "附件names"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
}

export {
    FormSchema
}