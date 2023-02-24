/**
 * @Description 请假表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 15:43:03
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
    "vacateType": {
        "type": "number",
        "description": "请假类型：1病假、2事假、3年假（计成本）"
    },
    "vacateApplyDate": {
        "type": "string",
        "description": "请假申请日期"
    },
    "vacateDateStart": {
        "type": "string",
        "description": "请假开始日期"
    },
    "vacateDateEnd": {
        "type": "string",
        "description": "请假结束日期"
    },
    "vacateLenth": {
        "type": "number",
        "description": "请假总时长（天）"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "vacateState": {
        "type": "number",
        "description": "状态：1未办理、2已同意、3已拒绝"
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
    "vacateApplyDateTime": {
        "type": "string",
        "description": "请假申请时间"
    },
}

export {
    FormSchema
}