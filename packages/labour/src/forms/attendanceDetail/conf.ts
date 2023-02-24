/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-05 15:14:28
 */

const FormSchema = {
    "suppUserId": {
        "type": "string",
        "description": "劳务人员id"
    },
    "suppUserName": {
        "type": "string",
        "description": "劳务人员名称"
    },
    "banId": {
        "type": "string",
        "description": "所在班组id"
    },
    "banName": {
        "type": "string",
        "description": "所在班组名称"
    },
    "labourCompanyId": {
        "type": "string",
        "description": "所在劳务公司id"
    },
    "labourCompanyName": {
        "type": "string",
        "description": "所在劳务公司名称"
    },
    "attendanceType": {
        "type": "number",
        "description": "考勤类型：1出勤、2培训"
    },
    "attendanceDate": {
        "type": "string",
        "description": "考勤日期"
    },
    "attendanceInfo": {
        "type": "number",
        "description": "出勤情况：1全天、2上午、3下午"
    },
    "attendanceRatio": {
        "type": "number",
        "description": "出勤时长比例：1/0.5"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "attendanceState": {
        "type": "number",
        "description": "状态：1未办理、2已同意、3已拒绝"
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
    "contractWorkId": {
        "type": "string",
        "description": "承包合同id"
    },
    "contractWorkCode": {
        "type": "string",
        "description": "承包合同编号"
    },
    "contractWorkName": {
        "type": "string",
        "description": "承包合同名称"
    },
    "estimatesettlementamount": {
        "type": "number",
        "description": "承包合同预计成本"
    },
    "estimateinitamountnotax": {
        "type": "number",
        "description": "承包合同实际成本"
    },
    "virtualPurchaseId": {
        "type": "string",
        "description": "虚拟订单id"
    },
    "virtualPurchaseCode": {
        "type": "string",
        "description": "虚拟订单编号"
    },
    "virtualPurchaseName": {
        "type": "string",
        "description": "虚拟订单名称"
    },
    "estimateexecamount": {
        "type": "number",
        "description": "采购合同预计履约金额"
    },
    "actualexecamount": {
        "type": "number",
        "description": "采购合同实际履约金额"
    },
    "settlementState": {
        "type": "number",
        "description": "结算状态-1未结算-2结算中-3已结算"
    },
    "settlementDate": {
        "type": "string",
        "description": "结算时间"
    },
    "statementId": {
        "type": "string",
        "description": "结算单id"
    },
    "statementName": {
        "type": "string",
        "description": "结算单名称"
    },
    "attendanceApplyDate": {
        "type": "string",
        "description": "考勤申请时间"
    },
    "attendanceYearMonth": {
        "type": "string",
        "description": "年-月"
    },
}

export {
    FormSchema
}