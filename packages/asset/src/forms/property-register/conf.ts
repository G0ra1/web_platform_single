/**
 * @Description 知识产权登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2023-01-10 17:30:06
 */

const FormSchema = {
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
    "name": {
        "type": "string",
        "description": "知识产权名称"
    },
    "code": {
        "type": "string",
        "description": "知识产权编号"
    },
    "type": {
        "type": "string",
        "description": "类别"
    },
    "inventUserId": {
        "type": "string",
        "description": "发明人id"
    },
    "inventUserName": {
        "type": "string",
        "description": "发明人名称"
    },
    "propertyUserId": {
        "type": "string",
        "description": "产权人id"
    },
    "propertyUserName": {
        "type": "string",
        "description": "产权人名称"
    },
    "applyUnitId": {
        "type": "string",
        "description": "编制单位"
    },
    "applyUnitName": {
        "type": "string",
        "description": "编制单位"
    },
    "applyUserId": {
        "type": "string",
        "description": "申请人id"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyDate": {
        "type": "string",
        "description": "申请日期"
    },
    "authDate": {
        "type": "string",
        "description": "授权日期"
    },
    "validPeriod": {
        "type": "string",
        "description": "有效期"
    },
}

export {
    FormSchema
}