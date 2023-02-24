/**
 * @Description 储油站基础数据维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-09 15:57:40
 */

const FormSchema = {
    "dictitemCode": {
        "type": "string",
        "description": "销售方编码"
    },
    "dictitemName": {
        "type": "string",
        "description": "销售方名称"
    },
    "explanation": {
        "type": "string",
        "description": "备注"
    },
}

export {
    FormSchema
}