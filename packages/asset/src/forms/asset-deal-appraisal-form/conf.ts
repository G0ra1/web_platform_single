/**
 * @Description 鉴定申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-30 22:08:38
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
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "sumAppraisalTotal": {
        "type": "number",
        "description": "鉴定数量"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "status": {
        "type": "number",
        "description": "鉴定状态"
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
        "description": "附件名字"
    },
}

export {
    FormSchema
}