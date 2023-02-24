import RuleConfig from "../../lib/rule/RuleConfig";

class Model {
  //主键
  id!: string;
  //工时结算时薪10.5
  hourSalary!: number;
  //每日工作时长8
  workHour!: number;
  //加班系数2
  coefficient!: number;
  //说明
  remark!: string;
}

class Rule {
  //hourSalary: RuleConfig = new RuleConfig('工时结算时薪');
  //workHour: RuleConfig = new RuleConfig('每日工作时长');
  //coefficient: RuleConfig = new RuleConfig('加班系数');
}

export { Model, Rule }