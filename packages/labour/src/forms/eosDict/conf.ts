/**
 * @Description 字典
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2022-11-24 10:44:32
 */

const FormSchema = {
    "source": {
        "type": "string",
        "description": "默认自建"
    },
    "dicttypeid": {
        "type": "string",
        "description": "字典类型id"
    },
    "dictid": {
        "type": "string",
        "description": "字典对应的值"
    },
    "dictname": {
        "type": "string",
        "description": "字典对应的显示名称"
    },
    "status": {
        "type": "number",
        "description": "状态"
    },
    "sortno": {
        "type": "number",
        "description": "排序序号"
    },
    "ranks": {
        "type": "number",
        "description": "排序"
    },
    "parentid": {
        "type": "string",
        "description": "字典父id"
    },
    "seqno": {
        "type": "string",
        "description": "排序层级编码"
    },
    "filter1": {
        "type": "string",
        "description": ""
    },
    "filter2": {
        "type": "string",
        "description": ""
    },
    "synctime": {
        "type": "string",
        "description": "同步时间"
    },
}

export {
    FormSchema
}