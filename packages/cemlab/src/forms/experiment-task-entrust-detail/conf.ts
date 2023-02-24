/**
 * @Description 委托合同任务详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
 */

const FormSchema = {
    "experimentReceiptsId": {
        "type": "string",
        "description": "实验单ID"
    },
    "experimentConditionId": {
        "type": "string",
        "description": "实验条件ID"
    },
    "experimentSlurryDemandId": {
        "type": "string",
        "description": "实验水泥浆性能要求ID"
    },
    "experimentSpecimenId": {
        "type": "string",
        "description": "实验样品ID"
    },
    "type": {
        "type": "number",
        "description": "实验单据类型;1内部通知单2委托合同单"
    },
    "taskName": {
        "type": "string",
        "description": "任务名称"
    },
    "experimentUserid": {
        "type": "string",
        "description": "实验人员"
    },
    "experimentUserName": {
        "type": "string",
        "description": "实验人员"
    },
    "status": {
        "type": "number",
        "description": "数据状态;1未完成2已完成"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}