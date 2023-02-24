/**
 * @Description 处置申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-28 23:25:32
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "sumTotalNumber": {
        "type": "number",
        "description": "合计申请数量"
    },
    "itemType": {
        "type": "string",
        "description": "申请类型"
    },
    "totalRegisterNum": {
        "type": "number",
        "description": "已登记数量"
    },
    "notRegisterNum": {
        "type": "number",
        "description": "未登记数量"
    },
    "totalAppraisalNum": {
        "type": "number",
        "description": "已鉴定数量"
    },
    "notAppraisalNum": {
        "type": "number",
        "description": "未鉴定数量"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "itemTypeName": {
        "type": "string",
        "description": "申请类型名称"
    },
    "status": {
        "type": "string",
        "description": "处置状态"
    },
    "explanation": {
        "type": "string",
        "description": "说明"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "fileIds": {
        "type": "string",
        "description": "附件ids"
    },
    "fileNames": {
        "type": "string",
        "description": "附件names"
    },
    "dealNum": {
        "type": "int",
        "description": "处置数量"
    },

}

export {
    FormSchema
}