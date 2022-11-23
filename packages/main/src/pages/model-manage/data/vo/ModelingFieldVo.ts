/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:50:32 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-20 14:32:11
 * @Description 数据建模字段vo
 */

export default interface ModelingFieldVo {
    id: string;
    entityId: string;
    fieldName: string;
    fieldNameCh: string;
    javaName: string;
    dbType: string;
    length: number;
    precision: number;
    isNotNull: number;
    isKey: number;
    isUnique: number;
    defaultValue: string;
    fkTableId: string;
    fkTableName: string;
    fkFieldId: string;
    fkFieldName: string;
    sort: number;
}