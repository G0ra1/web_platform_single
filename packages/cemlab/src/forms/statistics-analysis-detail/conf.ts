/**
 * @Description 统计分析详情
 * @author 云数网讯 wangzehua@netwisd.com@netwisd.com
 * @date 2023-02-16 12:04:05
 */

const FormSchema = {
    "experimentUserid": {
        "type": "string",
        "description": "实验人员"
    },
    "experimentUserName": {
        "type": "string",
        "description": "实验人员"
    },
    "experimentDate": {
        "type": "string",
        "description": "实验时间"
    },
    "resultItem": {
        "type": "string",
        "description": "实验过程结果项"
    },
    "resultItemDict": {
        "type": "string",
        "description": "实验过程结果项字典值"
    },
    "resultItemVal": {
        "type": "string",
        "description": "实验过程结果项值"
    },
    "experimentReceiptsCode": {
        "type": "string",
        "description": "任务单号"
    },
    "experimentReceiptsOrgId": {
        "type": "string",
        "description": "所属单位ID"
    },
    "experimentReceiptsOrgName": {
        "type": "string",
        "description": "所属单位名称"
    },
}

export {
    FormSchema
}