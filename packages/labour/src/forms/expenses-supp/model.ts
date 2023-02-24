import RuleConfig from "../../lib/rule/RuleConfig";
import { UploadFileInfo } from 'naive-ui';

class ExpensesSupp {
  //主键
  id!: string;
  //需求计划
  planId!: string;
  //需求计划编号
  planCode!: string;
  //需求计划名称
  planName!: string;
  //需求类别;大修、日常、专项
  planType!: number;
  //需求单位ID
  planOrgId!: string;
  //需求单位
  planOrgName!: string;
  //大修计划
  overhaulId!: string;
  //大修计划编号
  overhaulCode!: string;
  //大修计划名称
  overhaulName!: string;
  //供应商组织id
  suppOrgId!: string;
  //供应商组织code
  suppOrgCode!: string;
  //供应商名称
  suppOrgName!: string;
  //承包合同id
  contractWorkId!: string;
  //承包合同编号
  contractWorkCode!: string;
  //承包合同名称
  contractWorkName!: string;
  //虚拟订单id
  virtualPurchaseId!: string;
  //虚拟订单编号
  virtualPurchaseCode!: string;
  //虚拟订单名称
  virtualPurchaseName!: string;
  //采购合同ID
  contractPurchaseId!: string;
  //采购合同编号
  contractPurchaseCode!: string;
  //采购合同名称
  contractPurchaseName!: string;
  //税率
  taxrateName!: string;
  //税率
  taxrate!: string;
  //发票类型
  invoiceTypeName!: string;
  //发票类型
  invoiceType!: string;
  //填报时间
  fillDateTime!: string;
  //申请日期
  applyTime!: string;
  //体检费
  examinationList?: Array<ExpensesSuppExamination>;
  //核酸检测费
  nucleicacidList?: Array<ExpensesSuppNucleicAcid>;
  //差旅费
  travelList?: Array<ExpensesSuppTravel>;
}
//体检费
class ExpensesSuppExamination {
  //主键
  id!: string;
  //供应商费用填报ID
  expensesSuppId!: string;
  //人力动员ID
  personMobilizationId!: string;
  //填报时间
  fillDateTime!: string;
  //班组ID
  banId!: string;
  //班组名称
  banName!: string;
  //供应商组织id
  suppOrgId!: string;
  //供应商组织code
  suppOrgCode!: string;
  //供应商名称
  suppOrgName!: string;
  //人员ID
  suppUserId!: string;
  //人员姓名
  suppUserName!: string;
  //性别;1男2女
  sex!: number;
  //身份证号码
  idCard!: string;
  //体检费用
  examinationCost!: number;
  //备注
  remark!: string;
  //附件信息
  attachmentids!: string;
  //附件信息
  attachment!: string;
  //预计成本金额
  estimateSettlementAmount!: number;
  //实际成本金额
  actualSettlementAmount!: number;
  //预计履约金额
  estimateExecAmount!: number;
  //实际履约金额
  actualExecAmount!: number;
  //结算单ID
  statementId!: string;
  //结算状态;1未结算-2阶段性结算-3已结算
  settlementState!: number;
  //结算时间
  settlementDateTime!: string;
  //附件信息
  //attachmentList = new Array<UploadFileInfo>();
  attachmentList = new Array<any>();
}
//核酸检测费
class ExpensesSuppNucleicAcid {
  //主键
  id!: string;
  //供应商费用填报ID
  expensesSuppId!: string;
  //人力动员ID
  personMobilizationId!: string;
  //填报时间
  fillDateTime!: string;
  //班组ID
  banId!: string;
  //班组名称
  banName!: string;
  //供应商组织id
  suppOrgId!: string;
  //供应商组织code
  suppOrgCode!: string;
  //供应商名称
  suppOrgName!: string;
  //人员ID
  suppUserId!: string;
  //人员姓名
  suppUserName!: string;
  //性别;1男2女
  sex!: number;
  //身份证号码
  idCard!: string;
  //到场核酸检测费
  nucleicAcidReachCost!: number;
  //返程核酸检测费
  nucleicAcidBackCost!: number;
  //合计核酸检测费
  nucleicAcidTotalCost!: number;
  //备注
  remark!: string;
  //附件信息
  attachmentids!: string;
  //附件信息
  attachment!: string;
  //预计成本金额
  estimateSettlementAmount!: number;
  //实际成本金额
  actualSettlementAmount!: number;
  //预计履约金额
  estimateExecAmount!: number;
  //实际履约金额
  actualExecAmount!: number;
  //结算单ID
  statementId!: string;
  //结算状态;1未结算-2阶段性结算-3已结算
  settlementState!: number;
  //结算时间
  settlementDateTime!: string;
}
//差旅费
class ExpensesSuppTravel {
  //主键
  id!: string;
  //供应商费用填报ID
  expensesSuppId!: string;
  //人力动员ID
  personMobilizationId!: string;
  //填报时间
  fillDateTime!: string;
  //班组ID
  banId!: string;
  //班组名称
  banName!: string;
  //供应商组织id
  suppOrgId!: string;
  //供应商组织code
  suppOrgCode!: string;
  //供应商名称
  suppOrgName!: string;
  //人员ID
  suppUserId!: string;
  //人员姓名
  suppUserName!: string;
  //性别;1男2女
  sex!: number;
  //身份证号码
  idCard!: string;
  //出发地点
  startingCity!: string;
  //到达地点
  arriveCity!: string;
  //出发时间
  startingDate!: string;
  //到达时间
  arriveDate!: string;
  //交通工具
  vehicle!: string;
  //票据金额
  ticketAmount!: number;
  //住宿费
  accommodationAmount!: number;
  //合计金额
  totalAmount!: number;
  //备注
  remark!: string;
  //附件信息
  attachmentids!: string;
  //附件信息
  attachment!: string;
  //预计成本金额
  estimateSettlementAmount!: number;
  //实际成本金额
  actualSettlementAmount!: number;
  //预计履约金额
  estimateExecAmount!: number;
  //实际履约金额
  actualExecAmount!: number;
  //结算单ID
  statementId!: string;
  //结算状态;1未结算-2阶段性结算-3已结算
  settlementState!: number;
  //结算时间
  settlementDateTime!: string;
}

class Rule {
  //contractWorkName: RuleConfig = new RuleConfig('承包合同');
}

export { ExpensesSupp, Rule, ExpensesSuppExamination }