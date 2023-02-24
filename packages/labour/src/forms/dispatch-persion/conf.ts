/**
 * @Description 派遣单人员
 * @author 云数网讯 baiyulan@netwisd.com
 * @date 2023-02-08 16:52:09
 */

const FormSchema = {
    "dispatchid": {
        "type": "string",
        "description": "派遣单id"
    },
    "suppUserId": {
        "type": "string",
        "description": "人员ID"
    },
    "suppUserName": {
        "type": "string",
        "description": "人员姓名"
    },
    "idCard": {
        "type": "string",
        "description": "身份证号码"
    },
    "outerDisciplineId": {
        "type": "string",
        "description": "岗位id（字典类型为outer_discipline）"
    },
    "outerDisciplineName": {
        "type": "string",
        "description": "岗位名称（字典类型为outer_discipline_name）"
    },
    "postRankId": {
        "type": "string",
        "description": "专业id（字典类型为post_rank_id）"
    },
    "postRankName": {
        "type": "string",
        "description": "人员岗位"
    },
    "isHour": {
        "type": "number",
        "description": "是否工时制;是否工时制（0否；1是）"
    },
    "suppUserPhone": {
        "type": "string",
        "description": "人员手机号"
    },
}

export {
    FormSchema
}