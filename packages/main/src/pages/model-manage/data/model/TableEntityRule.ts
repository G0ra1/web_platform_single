/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:47:52 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-15 13:56:45
 * @Description 添加的表对象
 */
import TableEntityRuleDetail from "./TableEntityRuleDetail";
export default class TableEntity {
    dbSource: TableEntityRuleDetail = new TableEntityRuleDetail('数据源');
    tableName: TableEntityRuleDetail = new TableEntityRuleDetail('表名');
    tableNameCh: TableEntityRuleDetail = new TableEntityRuleDetail('表中文名称');
    packageName: TableEntityRuleDetail = new TableEntityRuleDetail('包名');
    tablePrefix: TableEntityRuleDetail = new TableEntityRuleDetail('前缀');
    moduleName: TableEntityRuleDetail = new TableEntityRuleDetail('模块名');
    author: TableEntityRuleDetail = new TableEntityRuleDetail('作者');
}