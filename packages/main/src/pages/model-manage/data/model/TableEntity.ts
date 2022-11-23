/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:47:52 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 15:33:17
 * @Description 添加的表对象
 */
export default class TableEntity {
    id: string = "";
    appId: string = "";
    appName: string = "";
    appCode: string = "";
    dbSourceId: string = "";
    dbSource: string = "";
    createType: number = 1;
    createTypeView: string = '选择现有表';
    tableName: string = "";
    /**
     * 表中文名
     */
    tableNameCh: string = "";
    packageName: string = "";
    tablePrefix: string = "";
    moduleName: string = "";
    subModuleName: string = "";
    author: string = "";
    level: number = 0;
    parentId: string = "0";
    parentTableName: string = "";
    interfaceReleaseStatus: number = 0;
    routeId: string = "";
    ancestorId: string = "";

    constructor() {

    }

    chanageCreateType(value: number): void {
        this.createType = value;
        console.log("this.createType", value);
        if (value === 1) {
            this.createTypeView = '选择现有表';
        } else {
            this.createTypeView = '新创建表';
        }
    }
}