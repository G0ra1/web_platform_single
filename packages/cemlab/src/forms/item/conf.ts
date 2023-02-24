/**
 * @Description 字典项
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 10:40:43
 */

const FormSchema = {
    "dictId": {
        "type": "string",
        "description": "所属字典类id"
    },
    "dictCode": {
        "type": "string",
        "description": "字典编码"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "sort": {
        "type": "number",
        "description": "排序值，默认升序"
    },
    "dictItemName": {
        "type": "string",
        "description": "字典项名称"
    },
    "dictItemCode": {
        "type": "string",
        "description": "字典项编码"
    },
    "isEnable": {
        "type": "number",
        "description": "是否启用"
    },
    "version": {
        "type": "number",
        "description": "版本号"
    },
}

export {
    FormSchema
}