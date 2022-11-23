/*
 * @Author: zouliming 
 * @Date: 2022-10-24 13:23:22 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 14:39:34
 * @Description 请求后台的实体dto
 */

import TableEntity from "../model/TableEntity"
import ModelingFieldDto from "./ModelingFieldDto"
export default class ModelingEntityDto extends TableEntity {
    fieldList: Array<ModelingFieldDto> = [];
    constructor() {
        super();
    }
}