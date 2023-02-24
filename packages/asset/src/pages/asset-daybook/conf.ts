/**
 * @Description 资产流水表
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-27 10:53:55
 */

const FormSchema = {
    "formUrl": {
        "type": "string",
        "description": "表单url"
    },
    "assetsId": {
        "type": "string",
        "description": "资产台账id"
    },
    "assetsDetailId": {
        "type": "string",
        "description": "资产明细表id"
    },
    "itemId": {
        "type": "string",
        "description": "物资Id"
    },
    "itemCode": {
        "type": "string",
        "description": "物资编码;物资编码"
    },
    "itemName": {
        "type": "string",
        "description": "物资名称;物资名称"
    },
    "type": {
        "type": "number",
        "description": "业务类型;验收/领用等等"
    },
}

export {
    FormSchema
}