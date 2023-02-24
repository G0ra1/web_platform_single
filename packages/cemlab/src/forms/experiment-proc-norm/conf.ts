/**
 * @Description 实验流程规范
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 09:49:36
 */

const FormSchema = {
    "title": {
        "type": "string",
        "description": "标题"
    },
    "type": {
        "type": "number",
        "description": "类型;1仪器操作保养规范2实验操作规范3成果资料管理"
    },
    "remarks": {
        "type": "string",
        "description": "备注"
    },
    "isFlashview": {
        "type": "number",
        "description": "是否设为首页轮播"
    },
    "filesId": {
        "type": "string",
        "description": "附件ID"
    },
    "filesName": {
        "type": "string",
        "description": "附件名称"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}