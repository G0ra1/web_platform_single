/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:49:04 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-17 17:33:22
 * @Description 后台返回的数据源vo
 */
import TableEntity from "../model/TableEntity"

export default interface DbVo {
    id: string;
    sysCode: string;
    sysName: string;
    poolName: string;
    type: string;
    username: string;
    password: string;
    url: string;
    isEnable: number;
    isDefault: number;
    description: string;
    tableEntityList: Array<TableEntity>;
}