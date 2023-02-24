/**
 * @Description 考勤批量审批
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2023-2-2 
 */

const FormSchema = {
    "attendanceApplyDate": {
        "type": "string",
        "description": "申请时间"
    },
    "attendanceDate": {
        "type": "string",
        "description": "考勤日期"
    },
    "attendanceInfo": {
        "type": "number",
        "description": "出勤情况：1全天、2上午、3下午"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "late": {
        "type": "string",
        "description": "迟到"
    },
    "leaveEarly": {
        "type": "string",
        "description": "早退"
    },
    "monitorRemark": {
        "type": "string",
        "description": "班长备注"
    },
    "applyTime": {
        "type": "string",
        "description": "申请日期"
    },
}

export {
    FormSchema
}