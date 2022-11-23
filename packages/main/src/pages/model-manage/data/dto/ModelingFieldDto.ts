/*
 * @Author: zouliming 
 * @Date: 2022-10-24 13:23:53 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-10-24 13:23:53 
 * @Description 请求后台的字段dto
 */

import FieldEntity from "../model/FieldEntity"
export default class ModelingFieldDto extends FieldEntity {

    constructor() {
        super('', '', '', '', 0, 0, 0, 0, 0, '', '', 0, '', '', '', '')
    }
}