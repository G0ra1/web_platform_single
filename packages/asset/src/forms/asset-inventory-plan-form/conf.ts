/**
 * @Description 物资盘点
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-28 18:34:31
 */

const FormSchema = {
    "code": {
        "type": "string",
        "description": "编号"
    },
    "auditSuccessTiem": {
        "type": "string",
        "description": "审批通过时间"
    },
    "camundaTaskId": {
        "type": "string",
        "description": "camunda流程任务ID"
    },
    "inventoryYear": {
        "type": "string",
        "description": "盘点年度"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
    "sumTotalNumber": {
        "type": "number",
        "description": "计划总数量"
    },
    "finishNumber": {
        "type": "number",
        "description": "完成数量"
    },
    "notFinishNumber": {
        "type": "number",
        "description": "未完成数量"
    },
    "createUserName": {
        "type": "string",
        "description": "申请人姓名"
    },
}

export {
    FormSchema
}