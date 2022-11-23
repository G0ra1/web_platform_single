/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:50:02 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-21 09:18:19
 * @Description 数据建模实体vo
 */

import ModelingFieldVo from "./ModelingFieldVo";
export default interface ModelingEntityVo {
    id: string;
    appId: string;
    appName: string;
    appCode: string;
    dbSourceId: string;
    dbSource: string;
    createType: number;
    tableName: string;
    /**
     * 表中文名
     */
    tableNameCh: string;
    packageName: string;
    tablePrefix: string;
    moduleName: string;
    subModuleName: string;
    author: string;
    level: number;
    parentId: string;
    parentTableName: string;
    interfaceReleaseStatus: number;
    routeId: string;
    ancestorId: string;
    fieldList: Array<ModelingFieldVo>;
    kids: Array<ModelingEntityVo>;
}