/*
 * @Author: zouliming 
 * @Date: 2022-10-18 09:25:39 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-20 14:32:46
 * @Description 字段实体
 */

import ModelingFieldVo from "../vo/ModelingFieldVo";

export default class FieldEntity implements ModelingFieldVo {
    id: string = "";
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
    constructor(fieldName: string, javaName: string, fieldNameCh: string, dbType: string, length: number, precision: number,
        isNotNull: number, isKey: number, isUnique: number, fkTableName: string, fkFieldName: string, sort: number,
        entityId: string, defaultValue: string, fkTableId: string, fkFieldId: string) {
        this.entityId = entityId;
        this.fieldName = fieldName;
        this.javaName = javaName;
        this.fieldNameCh = fieldNameCh;
        this.dbType = dbType;
        this.length = length;
        this.precision = precision;
        this.isNotNull = isNotNull;
        this.isKey = isKey;
        this.isUnique = isUnique;
        this.fkTableName = fkTableName;
        this.fkFieldName = fkFieldName;
        this.sort = sort;
        this.defaultValue = defaultValue;
        this.fkTableId = fkTableId;
        this.fkFieldId = fkFieldId;
    }
}