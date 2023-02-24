/**
 * @Description 加班表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-01 09:19:09
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
    "overtimeDate": {
        "type": "string",
        "description": "加班日期"
    },
    "amStartH": {
        "type": "string",
        "description": "上午开始-时"
    },
    "amStartM": {
        "type": "string",
        "description": "上午开始-分"
    },
    "amEndH": {
        "type": "string",
        "description": "上午结束-时"
    },
    "amEndM": {
        "type": "string",
        "description": "上午结束分"
    },
    "pmStartH": {
        "type": "string",
        "description": "下午开始-时"
    },
    "pmStartM": {
        "type": "string",
        "description": "下午开始-分"
    },
    "pmEndH": {
        "type": "string",
        "description": "下午结束-时"
    },
    "pmEndM": {
        "type": "string",
        "description": "下午结束分"
    },
    "nightStartH": {
        "type": "string",
        "description": "晚上开始-时"
    },
    "nightStartM": {
        "type": "string",
        "description": "晚上开始-分"
    },
    "nightEndH": {
        "type": "string",
        "description": "晚上结束-时"
    },
    "nightEndM": {
        "type": "string",
        "description": "晚上结束分"
    },
    "overLength": {
        "type": "number",
        "description": "加班时长"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "overtimeState": {
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
}

export {
    FormSchema
}