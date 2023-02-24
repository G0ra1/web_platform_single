import RuleConfig from "../../lib/rule/RuleConfig";

class Model {
  contractCode: string = '';
}

class Rule {
  contractCode: RuleConfig = new RuleConfig('合同编号');
}

export { Model, Rule }