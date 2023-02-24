/**
 * @Description 虚拟订单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-22 16:32:32
 */

const FormSchema = {
    "planId": {
        "type": "string",
        "description": "需求计划id"
    },
    "virtualPurchaseName": {
        "type": "string",
        "description": "虚拟订单名称"
    },
    "virtualPurchaseCode": {
        "type": "string",
        "description": "虚拟订单code"
    },
    "contractPurchaseId": {
        "type": "string",
        "description": "关联采购合同id"
    },
    "datatype": {
        "type": "string",
        "description": "数据类型"
    },
    "datascope": {
        "type": "string",
        "description": "数据范围"
    },
    "framecode": {
        "type": "string",
        "description": "框架编号"
    },
    "contractcode": {
        "type": "string",
        "description": "合同编号"
    },
    "initamount": {
        "type": "number",
        "description": "合同初始金额"
    },
    "alreadypayamount": {
        "type": "number",
        "description": "已支付金额"
    },
    "finalamount": {
        "type": "number",
        "description": "最终金额"
    },
    "changeamout": {
        "type": "number",
        "description": "变更金额;变更金额汇总"
    },
    "contractamount": {
        "type": "number",
        "description": "合同总额;初始金额+变更金额"
    },
    "exectotalamount": {
        "type": "number",
        "description": "订单执行总额含税;子合同/子订单合计金额"
    },
    "estimateexecamount": {
        "type": "number",
        "description": "预计履约执行金额"
    },
    "actualexecamount": {
        "type": "number",
        "description": "实际履约执行金额"
    },
    "requirementunitid": {
        "type": "string",
        "description": "需求部门Id"
    },
    "requirementunit": {
        "type": "string",
        "description": "需求单位"
    },
    "partaname": {
        "type": "string",
        "description": "甲方单位"
    },
    "partbname": {
        "type": "string",
        "description": "乙方单位"
    },
    "signdate": {
        "type": "string",
        "description": "签订时间"
    },
    "purchaseunitid": {
        "type": "string",
        "description": "采购单位Id"
    },
    "purchaseunit": {
        "type": "string",
        "description": "采购单位"
    },
    "purchasemethodname": {
        "type": "string",
        "description": "采购方式"
    },
    "purchasemethod": {
        "type": "string",
        "description": "采购方式;字典编码zhjx_pcpmethod"
    },
    "purchaseformname": {
        "type": "string",
        "description": "采购形式"
    },
    "purchaseform": {
        "type": "string",
        "description": "采购形式;字典编码zhjx_pcpform"
    },
    "contractstatusname": {
        "type": "string",
        "description": "合同状态"
    },
    "contractstatus": {
        "type": "string",
        "description": "合同状态;字典编码zhjx_contractstatus"
    },
    "projecttypename": {
        "type": "string",
        "description": "项目类型"
    },
    "projecttype": {
        "type": "string",
        "description": "项目类型;字典编码zhjx_pctype"
    },
    "contractname": {
        "type": "string",
        "description": "合同名称"
    },
    "closedate": {
        "type": "string",
        "description": "合同关闭时间"
    },
    "projectname": {
        "type": "string",
        "description": "项目名称;字典编码zhjx_purchasename"
    },
    "workcontractid": {
        "type": "string",
        "description": "关联承包合同id"
    },
    "workcontractname": {
        "type": "string",
        "description": "关联承包合同Name"
    },
    "workcontractcode": {
        "type": "string",
        "description": "承包合同编号"
    },
    "datasource": {
        "type": "string",
        "description": "数据来源;1线上2线下"
    },
    "agreenebtcide": {
        "type": "string",
        "description": "agreenebtcide"
    },
    "organ": {
        "type": "string",
        "description": "单位"
    },
    "organname": {
        "type": "string",
        "description": "机构名称"
    },
    "childorgan": {
        "type": "string",
        "description": "部门Id"
    },
    "childorganname": {
        "type": "string",
        "description": "部门名称"
    },
    "ledgerid": {
        "type": "string",
        "description": "台账Id"
    },
    "purchasetype": {
        "type": "string",
        "description": "采购类型;1物资2工程3服务"
    },
    "purchasesubtype": {
        "type": "string",
        "description": "采购子类型;1框架合同2常规合同3项下订单"
    },
    "remark": {
        "type": "string",
        "description": "备注"
    },
    "attachmentid1": {
        "type": "string",
        "description": "attachmentid1"
    },
    "isvalidate": {
        "type": "string",
        "description": "删除标记"
    },
    "ableedit": {
        "type": "string",
        "description": "数据是否允许编辑;0不允许编辑"
    },
    "targetcost": {
        "type": "number",
        "description": "目标成本"
    },
    "qualityscore": {
        "type": "string",
        "description": "质量得分"
    },
    "organizescore": {
        "type": "string",
        "description": "供应/施工/组织得分"
    },
    "supportscore": {
        "type": "string",
        "description": "支持配合得分"
    },
    "sumscore": {
        "type": "string",
        "description": "合计得分"
    },
    "contractid": {
        "type": "string",
        "description": "框架合同id"
    },
    "attachmentid2": {
        "type": "string",
        "description": "attachmentid2"
    },
    "needtypename": {
        "type": "string",
        "description": "需求类型"
    },
    "needtype": {
        "type": "string",
        "description": "需求类型;字典编码zhjx_needtype"
    },
    "needsubtypename": {
        "type": "string",
        "description": "需求子类型"
    },
    "needsubtype": {
        "type": "string",
        "description": "需求子类型;字典编码zhjx_needsubtype"
    },
    "agreementcode": {
        "type": "string",
        "description": "协议编码"
    },
    "transittime": {
        "type": "string",
        "description": "审批通过时间"
    },
    "centralbuying": {
        "type": "string",
        "description": "centralbuying"
    },
    "iscontract": {
        "type": "string",
        "description": "iscontract"
    },
    "paycontracttype": {
        "type": "string",
        "description": "付款合同合同类型"
    },
    "paycontractunit": {
        "type": "string",
        "description": "付款合同实施单位"
    },
    "validdate": {
        "type": "string",
        "description": "合同有效时间"
    },
}

export {
    FormSchema
}