/**
 * @Description 原油项目客户维护详情
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-08 13:45:28
 */

const FormSchema = {
    "clientId": {
        "type": "string",
        "description": "关联id"
    },
    "clientCode": {
        "type": "string",
        "description": "客户编码"
    },
    "clientName": {
        "type": "string",
        "description": "客户名称"
    },
}

export {
    FormSchema
}