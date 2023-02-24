//流程状态
const auditStatusArray = ["草稿", "运行中", "审批通过", "挂起", "终止"];
const auditStatusTypeArray = ["default", "info", "success", "error", "warning"];
//error 叉号  fill 对号，mark（挂起） 问号  waring（终止） 叹号
const nwIconArray = ["icon-n-n-error", "icon-n-n-check_fill", "icon-n-n-check_fill", "icon-n-n-mark", "icon-n-n-warning"];
//仓库类型
const houseType = ["", "仓库", "虚拟仓", "位置信息"];
enum Direction {
  asset_wzly = "物资来源",
  ASSETS_TAX_RATE = "字典名称",
  asset_type = "物资类型",
  asset_warehouse = "字典名称",
  zb_grades = "字典名称",
}
export { auditStatusArray, auditStatusTypeArray, houseType, nwIconArray, Direction }