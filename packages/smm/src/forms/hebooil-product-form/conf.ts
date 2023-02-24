/**
 * @Description 其它石油产品客户基础数据维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-14 11:00:33
 */

const FormSchema = {
    "productCode": {
        "type": "string",
        "description": "产品编码"
    },
    "productName": {
        "type": "string",
        "description": "产品名称"
    },
    "explanation": {
        "type": "string",
        "description": "备注"
    },
}

export {
    FormSchema
}