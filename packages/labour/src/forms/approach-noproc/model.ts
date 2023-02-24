import RuleConfig from "../../lib/rule/RuleConfig";

class Model {
  id?: string;
  //需求计划ID
  planId!: string;
  //需求名称
  planName!: string;
  //需求类别
  planType!: number;
  //需求单位名称
  planOrgName!: string;
  //大修轮次
  overhaulCode!: string;
  //大修计划名称
  overhaulName!: string;
  //子表ID集合
  //？表示这个属性有可能不存在 !表示一定存在
  approachPersonList?: Array<ApproachPerson>;
}

class ApproachPerson {
  id?: string;
  //人员进场Id
  approachId?: string;
  //需求计划推荐人员详情ID
  planReferralId?: string;
  //班组ID
  banId?: string;
  //班组名称
  banName?: string;
  //供应商名称
  suppOrgId?: string;
  //供应商名称
  suppOrgCode?: string;
  //供应商名称
  suppOrgName?: string;
  //人员姓名
  suppUserId?: string;
  //人员姓名
  suppUserName?: string;
  //性别
  sex?: number;
  //身份证号码
  idCard?: string;
  //人员专业ID
  outerDisciplineId?: string;
  //人员专业
  outerDisciplineName?: number;
  //人员岗位ID
  postRankId?: string;
  //人员岗位
  postRankName?: string;
  //项目描述
  projectName?: string;
  //是否工时制
  isHour?: number;
  //面试时间
  interviewTime?: Date;
  //面试时间
  planEntryTime?: Date;
  //面试时间
  virtualPurchaseId?: Date;
  //进场时间
  approachTime?: string
}


class Rule {
}

export { Model, Rule, ApproachPerson }