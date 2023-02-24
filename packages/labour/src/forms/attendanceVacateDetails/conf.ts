/**
 * @Description 请假子表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 15:43:03
 */

const FormSchema = {
    "vacateId": {
        "type": "string",
        "description": "请假表id"
    },
    "vacateDate": {
        "type": "string",
        "description": "请假日期"
    },
    "vacateLenth": {
        "type": "number",
        "description": "请假时长：1全天、2上午、3下午"
    },
}

export {
    FormSchema
}