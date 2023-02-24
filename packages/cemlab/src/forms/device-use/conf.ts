/**
 * @Description 仪器设备使用记录详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
 */

const FormSchema = {
    "deviceNames": {
        "type": "string",
        "description": "设备名称"
    },
    "useTime": {
        "type": "string",
        "description": "设备使用时间"
    },
    "isDel": {
        "type": "number",
        "description": "是否删除"
    },
}

export {
    FormSchema
}