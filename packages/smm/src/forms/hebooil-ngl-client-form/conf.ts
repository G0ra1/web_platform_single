/**
 * @Description 轻烃项目客户维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-13 18:30:00
 */

const FormSchema = {
    "projectCode": {
        "type": "string",
        "description": "项目编码"
    },
    "projectName": {
        "type": "string",
        "description": "项目名称"
    },
    "explanation": {
        "type": "string",
        "description": "备注"
    },
}

export {
    FormSchema
}