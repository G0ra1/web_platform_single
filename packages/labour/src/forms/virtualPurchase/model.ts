/**
 * @Description 虚拟订单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-22 16:32:32
 */

export default class LabourVirtualPurchase {
    //主键
    id!: string;
    //需求计划id
    planId!: string;
    //虚拟订单名称
    virtualPurchaseName!: string;
    //虚拟订单code
    virtualPurchaseCode!: string;
    //关联采购合同id
    contractPurchaseId!: string;
    //数据类型
    datatype!: string;
    //数据范围
    datascope!: string;
    //框架编号
    framecode!: string;
    //合同编号
    contractcode!: string;
    //合同初始金额
    initamount!: number;
    //已支付金额
    alreadypayamount!: number;
    //最终金额
    finalamount!: number;
    //变更金额;变更金额汇总
    changeamout!: number;
    //合同总额;初始金额+变更金额
    contractamount!: number;
    //订单执行总额含税;子合同/子订单合计金额
    exectotalamount!: number;
    //预计履约执行金额
    estimateexecamount!: number;
    //实际履约执行金额
    actualexecamount!: number;
    //需求部门Id
    requirementunitid!: string;
    //需求单位
    requirementunit!: string;
    //甲方单位
    partaname!: string;
    //乙方单位
    partbname!: string;
    //签订时间
    signdate!: string;
    //采购单位Id
    purchaseunitid!: string;
    //采购单位
    purchaseunit!: string;
    //采购方式
    purchasemethodname!: string;
    //采购方式;字典编码zhjx_pcpmethod
    purchasemethod!: string;
    //采购形式
    purchaseformname!: string;
    //采购形式;字典编码zhjx_pcpform
    purchaseform!: string;
    //合同状态
    contractstatusname!: string;
    //合同状态;字典编码zhjx_contractstatus
    contractstatus!: string;
    //项目类型
    projecttypename!: string;
    //项目类型;字典编码zhjx_pctype
    projecttype!: string;
    //合同名称
    contractname!: string;
    //合同关闭时间
    closedate!: string;
    //项目名称;字典编码zhjx_purchasename
    projectname!: string;
    //关联承包合同id
    workcontractid!: string;
    //关联承包合同Name
    workcontractname!: string;
    //承包合同编号
    workcontractcode!: string;
    //数据来源;1线上2线下
    datasource!: string;
    //agreenebtcide
    agreenebtcide!: string;
    //单位
    organ!: string;
    //机构名称
    organname!: string;
    //部门Id
    childorgan!: string;
    //部门名称
    childorganname!: string;
    //台账Id
    ledgerid!: string;
    //采购类型;1物资2工程3服务
    purchasetype!: string;
    //采购子类型;1框架合同2常规合同3项下订单
    purchasesubtype!: string;
    //备注
    remark!: string;
    //attachmentid1
    attachmentid1!: string;
    //删除标记
    isvalidate!: string;
    //数据是否允许编辑;0不允许编辑
    ableedit!: string;
    //目标成本
    targetcost!: number;
    //质量得分
    qualityscore!: string;
    //供应/施工/组织得分
    organizescore!: string;
    //支持配合得分
    supportscore!: string;
    //合计得分
    sumscore!: string;
    //框架合同id
    contractid!: string;
    //attachmentid2
    attachmentid2!: string;
    //需求类型
    needtypename!: string;
    //需求类型;字典编码zhjx_needtype
    needtype!: string;
    //需求子类型
    needsubtypename!: string;
    //需求子类型;字典编码zhjx_needsubtype
    needsubtype!: string;
    //协议编码
    agreementcode!: string;
    //审批通过时间
    transittime!: string;
    //centralbuying
    centralbuying!: string;
    //iscontract
    iscontract!: string;
    //付款合同合同类型
    paycontracttype!: string;
    //付款合同实施单位
    paycontractunit!: string;
    //合同有效时间
    validdate!: string;
}