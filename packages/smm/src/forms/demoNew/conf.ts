// {
//     "taskTitle": "必与有红很被",
//     "taskName": "常问几入养无音",
//     "taskType": 23,
//     "taskLevel": 12,
//     "taskInfoDetailList": [
//         {
//             "detailName": "布决影识品",
//             "detailType": 79,
//             "detailDatetime": "1993-03-19 04:23:37"
//         },
//         {
//             "detailName": "布决影识品2",
//             "detailType": 79,
//             "detailDatetime": "1993-03-19 04:23:37"
//         }
//     ]
// }

// 字段描述

const FormSchema = {
    "taskTitle": {
        "type": "string",
        "description": "任务标题",
        "exampleSetFlag": true
    },
    "taskName": {
        "type": "string",
        "description": "任务名称",
        "exampleSetFlag": true
    },
    "taskType": {
        "type": "number",
        "description": "任务类型",
        "exampleSetFlag": true
    },
    "taskLevel": {
        "type": "number",
        "description": "任务级别",
        "exampleSetFlag": true
    },
    "taskInfoDetailList": {
        "name": "taskInfoDetailList",
        "type": "array",
        "description": "任务详情列表",
        "items": {
            "name": "taskInfoDetail Dto",
            "title": "任务详情 Dto",
            "type": "object",
            "properties": {
                "detailName": {
                    "name": "detailName",
                    "type": "string",
                    "description": "任务明细名称"
                },
                "detailType": {
                    "name": "detailType",
                    "type": "number",
                    "description": "任务明细类型"
                },
                "detailDatetime": {
                    "name": "detailDatetime",
                    "type": "string",
                    "description": "任务时间"
                },
            }
        }
    },
}

// 子表类型
type TaskInfoDetail = {
    detailName: string,
    detailType: number,
    detailDatetime: string | null
}

// 表单数据类型
type FormType = {
    taskTitle?: string,
    taskName?: string,
    taskType?: number,
    taskLevel?: number,
    taskInfoDetailList?: Array<TaskInfoDetail>,
    taskInfoDetailList1?: Array<TaskInfoDetail>,
    testGrid?: Array<any>,
    testGrid1?: Array<any>,
    testObject?: object,
}

export type {
    FormType,
    TaskInfoDetail
}

export {
    FormSchema
}