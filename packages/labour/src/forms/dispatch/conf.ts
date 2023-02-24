/**
 * @Description 派遣单
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */

const FormSchema = {
    "dispatchCategory": {
        "type": "string",
        "description": ""
    },
    "daxiuid": {
        "type": "string",
        "description": "大修id"
    },
    "daxiuname": {
        "type": "string",
        "description": "大修名称"
    },
    "workcontractid": {
        "type": "string",
        "description": "承包合同id"
    },
    "workcontractname": {
        "type": "string",
        "description": "承包合同名称"
    },
    "applyName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyId": {
        "type": "string",
        "description": "申请人id"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "dispatchDate": {
        "type": "string",
        "description": "派遣日期"
    },
    "dispatchTypeName": {
        "type": "string",
        "description": "派遣类别"
    },
    "dispatchType": {
        "type": "number",
        "description": "派遣类别标识 1-大修 2-日常 3-专项"
    },
    "daxiucode": {
        "type": "string",
        "description": "大修编码"
    },
    "workcontractcode": {
        "type": "string",
        "description": "承包合同编码"
    },
}

export {
    FormSchema
}