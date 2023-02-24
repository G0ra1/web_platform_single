import RuleConfig from "../../lib/rule/RuleConfig";
import { format, addDays } from "date-fns";

class Model {
  date: string = format(addDays(new Date(), -1), "yyyy-MM-dd")
}

class SyncRule {
  date: RuleConfig = new RuleConfig('操作日期');
}

export { Model, SyncRule }