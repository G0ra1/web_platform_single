import RuleConfig from "../../lib/rule/RuleConfig";

class Model {
  //合同id
  contractid!: string;
  //合同名称
  contractname!: string;
  //合同编号
  contractcode!: string;
  partaname !:string;
  //合同总金额
  contractamount!: number;
  //？表示这个属性有可能不存在 !表示一定存在
  priceList?: Array<PurchasePrice>;
}

class PurchasePrice{
  //专业(规格型号)
  outerDisciplineId!: string;
   //专业名称(规格型号)
  outerDisciplineName!: string;
   //休息方式;1单休2双休3不休
  restMode!: string;
   //单位;1人/天2人/月
  unit!: number;
   //价格
  price!: number;
}


class Rule {
}

export { Model, Rule, PurchasePrice}