/**
 * @Description 物资
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-23 09:32:43
 */

const FormSchema = {
    "route": {
        "type": "string",
        "description": "全路径"
    },
    "routeName": {
        "type": "string",
        "description": "全路径名称"
    },
    "itemName": {
        "type": "string",
        "description": "物资名称"
    },
    "itemCode": {
        "type": "string",
        "description": "物资编码(8位流水00000001-99999999)"
    },
    "classifyId": {
        "type": "string",
        "description": "分类id"
    },
    "classifyName": {
        "type": "string",
        "description": "分类名称"
    },
    "classifyCode": {
        "type": "string",
        "description": "分类编码"
    },
    "desclong": {
        "type": "string",
        "description": "长描述"
    },
    "descshort": {
        "type": "string",
        "description": "段描述"
    },
    "unitCode": {
        "type": "string",
        "description": "基本计量单位编码"
    },
    "unitName": {
        "type": "string",
        "description": "基本计量单位名称"
    },
    "state": {
        "type": "string",
        "description": "状态"
    },
    "specs": {
        "type": "string",
        "description": "规格"
    },
    "standard": {
        "type": "string",
        "description": "标准"
    },
    "materialQuality": {
        "type": "string",
        "description": "材质"
    },
    "puuid": {
        "type": "string",
        "description": "批数据的UUID"
    },
    "dataSourceId": {
        "type": "string",
        "description": "数据源id"
    },
    "dataSourceState": {
        "type": "string",
        "description": "数据源接入数据问题"
    },
    "isCheck": {
        "type": "number",
        "description": "是否验证完毕"
    },
    "checkExplanation": {
        "type": "string",
        "description": "验证说明"
    },
    "isAssetNumber": {
        "type": "string",
        "description": "验证修改时间"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
    "isUnit": {
        "type": "number",
        "description": "是否多计量"
    },
}

export {
    FormSchema
}